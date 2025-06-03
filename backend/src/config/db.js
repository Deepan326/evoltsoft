
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

let testConnection = null;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected (Production)");
  } catch (error) {
    console.error("Connection error (Production):", error.message);
    process.exit(1);
  }
};

const connectTestDB = async () => {
  try {
    const connection = await mongoose.createConnection(process.env.TEST);
    console.log("MongoDB Connected (test)");
    return connection; 
  } catch (error) {
    console.error("Connection error (test):", error.message);
    process.exit(1);
  }
};

module.exports = { connectDB, connectTestDB };
