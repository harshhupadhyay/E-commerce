import mongoose from 'mongoose'
import { configs } from './config.js'

export const connectDb = async () => {

  try {
    await mongoose.connect(configs.MONGO_URI)
    console.log(" MongoDB connected successfully");


  } catch (error) {
     console.log("MongoDB connection failed:", error.message);
     process.exit(1)

  }

}
