import mongoose from "mongoose";
import dotenv from "dotenv";
import productModel from "../models/product.model.js";

dotenv.config();

const ADMIN_ID = "6acf768506a58d0ad6893971"; // harsh@gmail.com

// Curated high-fashion photography pools by category (each entry has 3-4 multi-angle editorial shots)
const FASHION_IMAGE_SETS = {
  "Blazers & Suits": [
    [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=900&auto=format&fit=crop&q=80"
    ],
    [
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?w=900&auto=format&fit=crop&q=80"
    ],
    [
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&auto=format&fit=crop&q=80"
    ]
  ],
  "Coats & Outerwear": [
    [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&auto=format&fit=crop&q=80"
    ],
    [
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=900&auto=format&fit=crop&q=80"
    ],
    [
      "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=900&auto=format&fit=crop&q=80"
    ]
  ],
  "Silk & Designer Shirts": [
    [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1620012253295-c15c429fccf8?w=900&auto=format&fit=crop&q=80"
    ],
    [
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1602810316693-3667c854239a?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=900&auto=format&fit=crop&q=80"
    ]
  ],
  "Leather & Jackets": [
    [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&auto=format&fit=crop&q=80"
    ],
    [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=900&auto=format&fit=crop&q=80"
    ]
  ],
  "Knitwear & Cashmere": [
    [
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=900&auto=format&fit=crop&q=80"
    ],
    [
      "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=900&auto=format&fit=crop&q=80"
    ]
  ],
  "Designer Streetwear": [
    [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&auto=format&fit=crop&q=80"
    ],
    [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&auto=format&fit=crop&q=80"
    ]
  ],
  "Tailored Trousers": [
    [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=900&auto=format&fit=crop&q=80"
    ],
    [
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=900&auto=format&fit=crop&q=80"
    ]
  ],
  "Evening Dresses": [
    [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&auto=format&fit=crop&q=80"
    ],
    [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=900&auto=format&fit=crop&q=80"
    ]
  ],
  "Footwear & Loafers": [
    [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=900&auto=format&fit=crop&q=80"
    ],
    [
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=900&auto=format&fit=crop&q=80"
    ]
  ],
  "Handbags & Accessories": [
    [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&auto=format&fit=crop&q=80"
    ],
    [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=900&auto=format&fit=crop&q=80"
    ]
  ]
};

// Luxury titles vocabulary
const ADJECTIVES = [
  "Heritage", "Monogram", "Italian Silk", "Tailored", "Oversized", "Embroidered",
  "Velvet", "Cashmere Blend", "Double-Breasted", "Jacquard", "Structured", "Satin-Finish",
  "Vintage Washed", "Baroque", "Minimalist", "Quilted Down", "Pleated", "Hand-Stitched",
  "Wool Mohair", "Corduroy", "Cropped", "Runway Edition"
];

const LUXURY_TEMPLATES = {
  "Blazers & Suits": ["Peak Lapel Blazer", "Tuxedo Jacket", "Two-Piece Wool Suit", "Notch Collar Sportcoat", "Single-Breasted Jacket"],
  "Coats & Outerwear": ["Belted Trench Coat", "Overcoat with Storm Flap", "Wool Overcoat", "Duffle Coat", "Cashmere Wrap Coat"],
  "Silk & Designer Shirts": ["Cuban Collar Shirt", "Silk Bowling Shirt", "Band-Collar Poplin Shirt", "Evening Dress Shirt", "Relaxed Camp Shirt"],
  "Leather & Jackets": ["Biker Jacket", "Shearling Aviator", "Varsity Leather Bomber", "Racer Jacket", "Suede Trucker Jacket"],
  "Knitwear & Cashmere": ["Rollneck Sweater", "Cable Knit Cardigan", "Crewneck Pullover", "Zip-Up Knit", "V-Neck Cashmere Jumper"],
  "Designer Streetwear": ["Graphic Fleece Hoodie", "Heavyweight Boxy Tee", "Streetwear Zip Hoodie", "Oversized Sweatshirt"],
  "Tailored Trousers": ["Wide-Leg Pleated Trousers", "Cuffed Dress Pants", "Straight Wool Slacks", "Cropped Chino Trousers"],
  "Evening Dresses": ["Silk Slip Gown", "Draped Cocktail Dress", "One-Shoulder Maxi Dress", "Satin Midi Dress"],
  "Footwear & Loafers": ["Horsebit Leather Loafers", "Suede Chelsea Boots", "Derby Dress Shoes", "Monk Strap Loafers"],
  "Handbags & Accessories": ["Leather Crossbody Bag", "Monogram Tote Bag", "Duffle Travel Bag", "Embossed Leather Belt"]
};

const FABRIC_DESCRIPTIONS = [
  "Masterfully crafted in Florence using 100% sustainably sourced raw fibers.",
  "Tailored with a refined contemporary silhouette, horn buttons, and silk lining.",
  "Features intricate artisanal embroidery, custom branded hardware, and hand-finished seams.",
  "Spun from ultra-fine Mongolian cashmere and virgin wool for an exceptionally soft hand-feel.",
  "Designed for effortless layering across seasons, highlighting clean lines and understated luxury."
];

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomPrice(min, max) {
  // Round to nearest 99 or 499 for realistic retail pricing
  const raw = Math.floor(Math.random() * (max - min) + min);
  return Math.floor(raw / 100) * 100 + 99;
}

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/E-commerce");
    console.log("Connected successfully!");

    const categories = Object.keys(FASHION_IMAGE_SETS);
    const productsToInsert = [];

    console.log("Generating 500 luxury fashion products with multi-angle photos...");

    for (let i = 1; i <= 500; i++) {
      const category = getRandomElement(categories);
      const adj = getRandomElement(ADJECTIVES);
      const template = getRandomElement(LUXURY_TEMPLATES[category]);
      const name = `${adj} ${template} No. ${i}`;
      
      const desc1 = getRandomElement(FABRIC_DESCRIPTIONS);
      const desc2 = `The ${name} represents our pinnacle of craftsmanship in the ${category} line.`;
      const description = `${desc2} ${desc1} Dry clean only. Made in Italy.`;

      // Select random multi-angle image set from the category
      const imageSets = FASHION_IMAGE_SETS[category];
      const selectedImageSet = getRandomElement(imageSets);

      // Sizes
      const sizes = category.includes("Handbags") || category.includes("Accessories")
        ? ["S", "M", "L"]
        : ["XS", "S", "M", "L", "XL", "XXL"];

      productsToInsert.push({
        name,
        description,
        price: getRandomPrice(2499, 49999),
        stock: Math.floor(Math.random() * 35) + 5,
        category,
        sizes,
        images: selectedImageSet, // Array of 3-4 multi-angle editorial images
        createdBy: ADMIN_ID,
      });
    }

    console.log(`Inserting ${productsToInsert.length} luxury products into database...`);
    await productModel.insertMany(productsToInsert);

    const totalCount = await productModel.countDocuments();
    console.log(`🎉 SUCCESS! Seeded 500 luxury products!`);
    console.log(`Total products currently in MongoDB: ${totalCount}`);

    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seed();
