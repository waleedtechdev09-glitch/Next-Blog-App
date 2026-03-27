import mongoose from "mongoose";

const ConnectDB = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  await mongoose.connect(uri);
  console.log("Database Connected Successfully.");
};

export default ConnectDB;
