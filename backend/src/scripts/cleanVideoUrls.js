import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function clean() {
  await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/E-commerce");
  const collection = mongoose.connection.db.collection("products");
  const products = await collection.find({}).toArray();

  let cleaned = 0;
  for (const p of products) {
    const validImages = (p.images || []).filter(
      (img) => !img.includes(".m3u8") && !img.includes(".mp4")
    );
    if (validImages.length !== p.images.length) {
      await collection.updateOne(
        { _id: p._id },
        { $set: { images: validImages } }
      );
      cleaned++;
    }
  }

  // Remove any items that have fewer than 2 images
  const deleted = await collection.deleteMany({
    $or: [{ images: { $size: 0 } }, { images: { $size: 1 } }],
  });

  const remaining = await collection.countDocuments();
  console.log(`Cleaned video URLs from ${cleaned} products`);
  console.log(`Removed ${deleted.deletedCount} products with insufficient images`);
  console.log(`Total 100% pure multi-image luxury products remaining: ${remaining}`);

  process.exit(0);
}

clean();
