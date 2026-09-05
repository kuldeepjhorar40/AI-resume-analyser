const mongoose = require("mongoose");


/**
 * Establishes the application's MongoDB connection and propagates
 * connection failures to the server bootstrap process so the API does
 * not start in an invalid infrastructure state.
 */
const connectDB = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL is missing from environment variables");
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB connected Successfully");
  } catch (err) {
    console.error(
      "Some error in Database:",
      err.message
    );

    throw err;
  }
};

module.exports = connectDB;