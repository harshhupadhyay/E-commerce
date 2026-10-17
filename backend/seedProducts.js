import { connectDb } from "./src/configs/db.js";
import productModel from "./src/models/product.model.js";
import userModel from "./src/models/user.model.js";

const sampleProducts = [
  {
    name: "Classic Slim Fit Cotton Shirt",
    description: "Premium 100% breathable cotton button-down shirt suitable for casual and formal wear.",
    price: 1499,
    stock: 25,
    category: "Shirts",
    sizes: ["S", "M", "L", "XL"],
    images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600"]
  },
  {
    name: "Relaxed Fit Denim Jacket",
    description: "Vintage washed denim trucker jacket with button cuffs and chest flap pockets.",
    price: 2999,
    stock: 15,
    category: "Jackets",
    sizes: ["M", "L", "XL"],
    images: ["https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600"]
  },
  {
    name: "Oversized Streetwear Hoodie",
    description: "Heavyweight cotton fleece hoodie featuring drop shoulders and a spacious kangaroo pocket.",
    price: 2199,
    stock: 30,
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: ["https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600"]
  },
  {
    name: "Tapered Stretch Chino Trousers",
    description: "Versatile smart-casual slim fit chinos crafted with durable and comfortable stretch fabric.",
    price: 1799,
    stock: 20,
    category: "Trousers",
    sizes: ["S", "M", "L", "XL"],
    images: ["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600"]
  },
  {
    name: "Minimalist Linen Summer Shirt",
    description: "Airy pure linen long-sleeve shirt tailored for warm-weather ease and effortless elegance.",
    price: 1699,
    stock: 18,
    category: "Shirts",
    sizes: ["M", "L", "XL"],
    images: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600"]
  },
  {
    name: "Distressed Straight Fit Jeans",
    description: "Classic five-pocket straight leg blue denim jeans with subtle authentic distressing details.",
    price: 2499,
    stock: 22,
    category: "Jeans",
    sizes: ["S", "M", "L", "XL"],
    images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600"]
  },
  {
    name: "Crewneck Heavyweight Cotton Tee",
    description: "Everyday essential crewneck tee crafted from combed ring-spun cotton for ultra softness.",
    price: 799,
    stock: 50,
    category: "T-Shirts",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: ["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600"]
  },
  {
    name: "Wool Blend Tailored Blazer",
    description: "Modern tailored wool-blend blazer featuring classic notch lapels and structured shoulder line.",
    price: 4999,
    stock: 10,
    category: "Blazers",
    sizes: ["M", "L", "XL"],
    images: ["https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600"]
  },
  {
    name: "Cargo Utility Pocket Joggers",
    description: "Urban streetwear joggers equipped with multiple functional cargo pockets and cuffed ankles.",
    price: 1899,
    stock: 25,
    category: "Joggers",
    sizes: ["S", "M", "L", "XL"],
    images: ["https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600"]
  },
  {
    name: "Quilted Puffer Winter Vest",
    description: "Insulated quilted down vest designed for lightweight warmth, wind resistance, and easy layering.",
    price: 2799,
    stock: 12,
    category: "Jackets",
    sizes: ["S", "M", "L", "XL"],
    images: ["https://images.unsplash.com/photo-1544441893-675973e31985?w=600"]
  }
];

const seed = async () => {
  await connectDb();

  const user = await userModel.findOne({ role: "admin" }) || await userModel.findOne({});
  if (!user) {
    console.error("No user found in database to attach products to.");
    process.exit(1);
  }

  const productsToInsert = sampleProducts.map((item) => ({
    ...item,
    createdBy: user._id
  }));

  const result = await productModel.insertMany(productsToInsert);
  console.log(`Successfully created ${result.length} products!`);
  process.exit(0);
};

seed().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});
