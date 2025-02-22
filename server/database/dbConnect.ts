// /lib/dbConnect.js
import mongoose from "mongoose";

// const MONGODB_URI =
//   "mongodb://kunalk:mongoKunalGym@ac-limrpmj-shard-00-00.lnumg7p.mongodb.net:27017,ac-limrpmj-shard-00-01.lnumg7p.mongodb.net:27017,ac-limrpmj-shard-00-02.lnumg7p.mongodb.net:27017/?ssl=true&replicaSet=atlas-d8f8n1-shard-0&authSource=admin&retryWrites=true&w=majority";

const MONGODB_URI =
  "mongodb+srv://kunalkhairnar96:pzWgLjDtT31bGcVh@cluster0.0a3v1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
async function dbConnect() {
  try {
    const opts = {};
    mongoose.set("strictQuery", true);

    await mongoose.connect(MONGODB_URI);
    const db = mongoose.connection;
    console.log("MongoDB connection successfull");
  } catch (error) {
    console.log("Error connecting with Mongodb", error);
  }
}

export default dbConnect;
