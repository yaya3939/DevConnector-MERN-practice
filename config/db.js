const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(db);
    console.log("MongoDB connecting.");
  } catch (error) {
    console.error(error.message);
    //exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
