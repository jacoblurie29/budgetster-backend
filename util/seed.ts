/* eslint-disable @typescript-eslint/no-explicit-any */
import { monetaryItemSeedData } from "./seedData";
import monetaryItem from "../models/monetaryItem.model";
import connectToMongoDB from "../config/mongodb.config";
import mongoose from "mongoose";

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectToMongoDB();

    console.log("🌱 [MONGODB]: Seeding database...");

    // Clear database before seeding
    await monetaryItem.deleteMany({});

    // Create new monetary items and insert them into the database
    for (const item of monetaryItemSeedData) {
      const newMonetaryItem = {
        _id: new mongoose.Types.ObjectId(),
        name: item.name,
        value: item.value,
        date: item.date,
        repeat: item.repeat,
        repeatPeriod: item.repeatPeriod,
        repeatEndDate: item.repeatEndDate,
        type: item.type,
      };
      await monetaryItem.insertMany(newMonetaryItem);
    }

    console.log("✅ [MONGODB]: Database seeded successfully!");
  } catch (error: any) {
    console.log("❌ [MONGODB]: Error seeding database! ", error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seedDatabase();
