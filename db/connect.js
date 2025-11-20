const mongoose = require("mongoose");
const local_host = " 192.168.31.199";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb://${local_host}:27017/contactForm`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
