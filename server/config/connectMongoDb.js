import mongoose from "mongoose";

const connectMongoDb = async () => {
  await mongoose.connection.on("connected", () =>
    console.log("database connected")
  );
  await mongoose.connect(process.env.MONGODB_URL);
};

export default connectMongoDb;


