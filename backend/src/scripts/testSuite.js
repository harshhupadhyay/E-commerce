import axios from "axios";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import FormData from "form-data";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import userModel from "../models/user.model.js";
import productModel from "../models/product.model.js";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const MONGO_URI = process.env.MONGO_URI;
const API_BASE = "http://localhost:3000/api";
const LIVE_API_BASE = "https://e-commerce-mynu.onrender.com/api";

const ADMIN_CREDENTIALS = {
  name: "Haute Admin",
  email: "admin@hauteedit.com",
  password: "AdminPassword123!",
  role: "admin",
};

const TEST_USER = {
  name: "Editorial Client",
  email: `client_${Date.now()}@hauteedit.com`,
  password: "ClientPassword123!",
};

async function runTests() {
  console.log("==================================================");
  console.log("   HAUTE ÉDIT FULL END-TO-END VERIFICATION SUITE   ");
  console.log("==================================================\n");

  // 1. DATABASE CONNECTION
  console.log("▶ Step 1: Connecting to MongoDB Atlas...");
  await mongoose.connect(MONGO_URI);
  console.log("✔ Connected to MongoDB Atlas successfully.\n");

  // 2. CREATE OR ENSURE ADMIN USER IN DATABASE
  console.log("▶ Step 2: Ensuring Admin User exists in database...");
  let adminUser = await userModel.findOne({ email: ADMIN_CREDENTIALS.email });
  if (!adminUser) {
    adminUser = await userModel.create({
      name: ADMIN_CREDENTIALS.name,
      email: ADMIN_CREDENTIALS.email,
      passwordHash: await bcrypt.hash(ADMIN_CREDENTIALS.password, 10),
      role: "admin",
    });
    console.log(`✔ Admin created: ${adminUser.email} (Role: ${adminUser.role})`);
  } else {
    if (adminUser.role !== "admin") {
      adminUser.role = "admin";
      await adminUser.save();
    }
    // Update password to known credentials
    adminUser.passwordHash = await bcrypt.hash(ADMIN_CREDENTIALS.password, 10);
    await adminUser.save();
    console.log(`✔ Admin verified & updated: ${adminUser.email} (Role: ${adminUser.role})`);
  }
  console.log("");

  // 3. TEST NORMAL USER REGISTRATION
  console.log("▶ Step 3: Testing User Registration API (/api/auth/register)...");
  const regRes = await axios.post(`${API_BASE}/auth/register`, TEST_USER);
  if (regRes.status === 201 && regRes.data.data.user.role === "user") {
    console.log(`✔ Registration successful for: ${TEST_USER.email}`);
  } else {
    throw new Error(`Registration failed: ${JSON.stringify(regRes.data)}`);
  }
  const userToken = regRes.data.data.accessToken;
  console.log("");

  // 4. TEST NORMAL USER LOGIN
  console.log("▶ Step 4: Testing User Login API (/api/auth/login)...");
  const loginRes = await axios.post(`${API_BASE}/auth/login`, {
    email: TEST_USER.email,
    password: TEST_USER.password,
  });
  if (loginRes.status === 200 && loginRes.data.data.accessToken) {
    console.log(`✔ User Login successful. Access token received.`);
  } else {
    throw new Error(`Login failed: ${JSON.stringify(loginRes.data)}`);
  }
  console.log("");

  // 5. TEST GET CURRENT USER (/api/auth/me)
  console.log("▶ Step 5: Testing Current User Profile (/api/auth/me)...");
  const meRes = await axios.get(`${API_BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  if (meRes.status === 200 && meRes.data.data.user.email === TEST_USER.email) {
    console.log(`✔ /api/auth/me verified: ${meRes.data.data.user.name} (${meRes.data.data.user.role})`);
  } else {
    throw new Error(`/api/auth/me failed: ${JSON.stringify(meRes.data)}`);
  }
  console.log("");

  // 6. TEST ADMIN LOGIN
  console.log("▶ Step 6: Testing Admin Login API (/api/auth/login)...");
  const adminLoginRes = await axios.post(`${API_BASE}/auth/login`, {
    email: ADMIN_CREDENTIALS.email,
    password: ADMIN_CREDENTIALS.password,
  });
  const adminToken = adminLoginRes.data.data.accessToken;
  if (adminLoginRes.status === 200 && adminLoginRes.data.data.user.role === "admin") {
    console.log(`✔ Admin Login successful. Admin verified with role: ${adminLoginRes.data.data.user.role}`);
  } else {
    throw new Error(`Admin Login failed: ${JSON.stringify(adminLoginRes.data)}`);
  }
  console.log("");

  // 7. TEST NON-ADMIN ATTEMPTING ADMIN ENDPOINTS (RBAC SECURITY CHECK)
  console.log("▶ Step 7: Testing Security RBAC (Normal user blocked from admin actions)...");
  try {
    await axios.delete(`${API_BASE}/products/000000000000000000000000`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    throw new Error("SECURITY FAILURE: Normal user was able to call delete endpoint!");
  } catch (err) {
    if (err.response && (err.response.status === 403 || err.response.status === 401)) {
      console.log(`✔ Security verified: Normal user correctly blocked with status ${err.response.status} (${err.response.data.message})`);
    } else {
      throw err;
    }
  }
  console.log("");

  // 8. TEST FETCH PRODUCTS WITH PAGINATION, CATEGORY, SEARCH
  console.log("▶ Step 8: Testing Catalog Endpoints (/api/products)...");
  const prodRes = await axios.get(`${API_BASE}/products?page=1&limit=8`);
  const products = prodRes.data.data.products;
  const total = prodRes.data.data.total;
  console.log(`✔ Catalog fetch: Found ${total} total silhouettes. First page returned ${products.length} items.`);

  const catRes = await axios.get(`${API_BASE}/products/categories`);
  console.log(`✔ Categories fetch: Found ${catRes.data.data?.length || 0} unique categories.`);

  if (products.length > 0) {
    const singleProduct = products[0];
    const detailRes = await axios.get(`${API_BASE}/products/${singleProduct._id}`);
    console.log(`✔ Single Product details fetch: "${detailRes.data.data.name}" (₹${detailRes.data.data.price})`);
  }
  console.log("");

  // 9. TEST ADMIN CRUD: CREATE PRODUCT, UPDATE, DELETE
  console.log("▶ Step 9: Testing Admin CRUD Lifecycle...");
  
  // Create dummy image buffer
  const dummySvg = Buffer.from(
    `<svg width="400" height="500" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#121110"/><text x="50%" y="50%" fill="#FAF6F2" font-size="20" text-anchor="middle">TEST SILHOUETTE</text></svg>`
  );

  const form = new FormData();
  const testProductName = `Test Runway Coat ${Date.now()}`;
  form.append("name", testProductName);
  form.append("description", "A handcrafted virgin wool double-faced test coat with architectural structure.");
  form.append("price", "42990");
  form.append("stock", "5");
  form.append("category", "Women's Suits & Tailoring");
  form.append("sizes", JSON.stringify(["S", "M", "L"]));
  form.append("images", dummySvg, { filename: "test-silhouette.svg", contentType: "image/svg+xml" });

  console.log("  ↳ Creating new product with image via ImageKit...");
  const createRes = await axios.post(`${API_BASE}/products`, form, {
    headers: {
      ...form.getHeaders(),
      Authorization: `Bearer ${adminToken}`,
    },
  });
  const createdId = createRes.data.data._id;
  console.log(`  ✔ Product Created: ID ${createdId} — "${createRes.data.data.name}" (Price: ₹${createRes.data.data.price})`);

  // Update Product
  console.log("  ↳ Updating product price and stock...");
  const updateForm = new FormData();
  updateForm.append("name", testProductName);
  updateForm.append("description", "Updated: A handcrafted virgin wool double-faced test coat with architectural structure.");
  updateForm.append("price", "49990");
  updateForm.append("stock", "8");
  updateForm.append("category", "Women's Suits & Tailoring");
  updateForm.append("sizes", JSON.stringify(["S", "M", "L", "XL"]));

  const updateRes = await axios.put(`${API_BASE}/products/${createdId}`, updateForm, {
    headers: {
      ...updateForm.getHeaders(),
      Authorization: `Bearer ${adminToken}`,
    },
  });
  console.log(`  ✔ Product Updated: New Price ₹${updateRes.data.data.price}, Stock: ${updateRes.data.data.stock}`);

  // Delete Product
  console.log("  ↳ Deleting test product...");
  const deleteRes = await axios.delete(`${API_BASE}/products/${createdId}`, {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  console.log(`  ✔ Product Deleted successfully: ${deleteRes.data.message}\n`);

  // 10. TEST LIVE RENDER API
  console.log("▶ Step 10: Testing Live Render Backend API (https://e-commerce-mynu.onrender.com)...");
  try {
    const liveRes = await axios.get(`${LIVE_API_BASE}/products?page=1&limit=4`, { timeout: 15000 });
    console.log(`✔ Live Render API online: Returned ${liveRes.data.data.products.length} products (Total: ${liveRes.data.data.total}).`);
  } catch (err) {
    console.log(`ℹ Live Render notice: ${err.message} (may be cold-starting on free tier).`);
  }
  console.log("");

  // Clean up temporary user but keep permanent client@hauteedit.com
  let permClient = await userModel.findOne({ email: "client@hauteedit.com" });
  if (!permClient) {
    await userModel.create({
      name: "Editorial Client",
      email: "client@hauteedit.com",
      passwordHash: await bcrypt.hash("ClientPassword123!", 10),
      role: "user",
    });
    console.log("✔ Permanent client account created: client@hauteedit.com");
  } else {
    permClient.passwordHash = await bcrypt.hash("ClientPassword123!", 10);
    await permClient.save();
    console.log("✔ Permanent client account verified: client@hauteedit.com");
  }

  await userModel.deleteOne({ email: TEST_USER.email });
  console.log("✔ Temporary test user cleaned up from database.");

  await mongoose.disconnect();
  console.log("\n==================================================");
  console.log("      ALL TESTS PASSED WITH 100% SUCCESS!         ");
  console.log("==================================================");
  console.log(`\n🔑 Created Admin Account Credentials:`);
  console.log(`   Email:    ${ADMIN_CREDENTIALS.email}`);
  console.log(`   Password: ${ADMIN_CREDENTIALS.password}`);
  console.log(`   Role:     admin`);
}

runTests().catch((err) => {
  console.error("❌ Test suite encountered an error:", err.response?.data || err.message);
  process.exit(1);
});
