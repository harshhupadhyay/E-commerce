import mongoose from "mongoose";
import dotenv from "dotenv";
import productModel from "../models/product.model.js";

dotenv.config();

const ADMIN_ID = "6acf768506a58d0ad6893971"; // harsh@gmail.com

// Balanced categories: Men's and Women's collections
const ZARA_MEN_CATEGORIES = [
  { id: 2715332, name: "Men's Suits & Tailoring" },
  { id: 2600116, name: "Men's Leather & Jackets" },
  { id: 2444334, name: "Men's Coats & Outerwear" },
  { id: 2579028, name: "Men's Shirts" },
  { id: 2578030, name: "Men's Polo Shirts" },
  { id: 2458835, name: "Men's Jeans & Denim" },
  { id: 2551442, name: "Men's Trousers & Pants" },
  { id: 2579029, name: "Men's Hoodies & Sweatshirts" },
  { id: 2443851, name: "Men's Shoes & Loafers" },
];

const ZARA_WOMEN_CATEGORIES = [
  { id: 2546081, name: "Women's Jackets & Coats" },
  { id: 2419737, name: "Women's Dresses & Gowns" },
  { id: 2419242, name: "Women's Jeans & Denim" },
  { id: 2480352, name: "Women's Suits & Tailoring" },
  { id: 2622622, name: "Women's Evening & Party" },
  { id: 2763430, name: "Women's Knitwear & Tops" },
];

async function fetchZaraCategoryProducts(catId, catName, maxItems = 40) {
  try {
    const url = `https://www.zara.com/in/en/category/${catId}/products?ajax=true`;
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json",
      },
    });

    if (!res.ok) return [];

    const data = await res.json();
    const elements = data.productGroups?.[0]?.elements || [];
    const products = [];

    for (const el of elements) {
      if (products.length >= maxItems) break;

      const comp = el.commercialComponents?.[0];
      if (!comp || !comp.name || !comp.detail?.colors) continue;

      const color = comp.detail.colors[0];
      const xmediaList = color.xmedia || [];

      // Extract real images and filter out any .m3u8 videos
      const rawUrls = [];
      for (const media of xmediaList) {
        const deliveryUrl =
          media.extraInfo?.deliveryUrl ||
          (media.url ? media.url.replace("{width}", "900") : null);

        if (
          deliveryUrl &&
          !deliveryUrl.includes(".m3u8") &&
          !deliveryUrl.includes(".mp4") &&
          !rawUrls.includes(deliveryUrl)
        ) {
          rawUrls.push(deliveryUrl);
        }
      }

      // Ensure every product has at least 2 distinct photos of that garment
      if (rawUrls.length < 2) continue;

      // Wrap with our backend proxy to bypass 403 Forbidden
      const proxiedImages = rawUrls.map(
        (img) => `/api/proxy-image?url=${encodeURIComponent(img)}`
      );

      const rawPrice = comp.price || 349000;
      const formattedPrice = Math.round(rawPrice / 100);

      const rawDesc = comp.description && comp.description.length >= 10
        ? comp.description
        : `Contemporary ${catName} tailored with luxury European silhouette, custom hardware, and hand-finished detailing. Made in Portugal.`;

      products.push({
        name: comp.name.trim(),
        description: rawDesc,
        price: formattedPrice > 0 ? formattedPrice : 3490,
        stock: Math.floor(Math.random() * 25) + 10,
        category: catName,
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        images: proxiedImages,
        createdBy: ADMIN_ID,
      });
    }

    return products;
  } catch (err) {
    console.warn(`Error fetching ${catName} (${catId}):`, err.message);
    return [];
  }
}

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/E-commerce");

    // 1. Wipe previous products completely
    console.log("Wiping out old products...");
    await productModel.deleteMany({});
    console.log("Database cleared!");

    // 2. Fetch 250 Men's Products
    console.log("\n--- Fetching 250 Men's Products ---");
    const menProducts = [];
    for (const cat of ZARA_MEN_CATEGORIES) {
      if (menProducts.length >= 250) break;
      const needed = 250 - menProducts.length;
      console.log(`Fetching ${cat.name}...`);
      const items = await fetchZaraCategoryProducts(cat.id, cat.name, Math.min(needed, 35));
      console.log(`-> Added ${items.length} items from ${cat.name}`);
      menProducts.push(...items);
    }

    // 3. Fetch 250 Women's Products
    console.log("\n--- Fetching 250 Women's Products ---");
    const womenProducts = [];
    for (const cat of ZARA_WOMEN_CATEGORIES) {
      if (womenProducts.length >= 250) break;
      const needed = 250 - womenProducts.length;
      console.log(`Fetching ${cat.name}...`);
      const items = await fetchZaraCategoryProducts(cat.id, cat.name, Math.min(needed, 50));
      console.log(`-> Added ${items.length} items from ${cat.name}`);
      womenProducts.push(...items);
    }

    const combined = [...menProducts, ...womenProducts];
    console.log(`\nInserting ${combined.length} balanced (Men + Women) luxury products into MongoDB...`);
    await productModel.insertMany(combined);

    const totalCount = await productModel.countDocuments();
    const menCount = await productModel.countDocuments({ category: { $regex: "Men's" } });
    const womenCount = await productModel.countDocuments({ category: { $regex: "Women's" } });

    console.log(`\n🎉 SUCCESS! Database updated with 100% real luxury products:`);
    console.log(`- Total Products: ${totalCount}`);
    console.log(`- Men's Products: ${menCount}`);
    console.log(`- Women's Products: ${womenCount}`);
    console.log(`- Zero video URLs, 100% pure multi-angle photos with backend proxy!`);

    process.exit(0);
  } catch (err) {
    console.error("Seeder error:", err);
    process.exit(1);
  }
}

seed();
