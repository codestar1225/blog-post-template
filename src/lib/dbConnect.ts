import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGO_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGO_URI environment variable in .env.local"
  );
}

// Extend the global object to cache the connection
declare global {
  // allow global `mongoose` to persist across hot reloads in dev
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (global.mongoose.conn) return global.mongoose.conn;

  if (!global.mongoose.promise) {
    global.mongoose.promise = mongoose
      .connect(MONGODB_URI)
      .then((mongoose) => mongoose);
  }

  global.mongoose.conn = await global.mongoose.promise;
  return global.mongoose.conn;
}

export default dbConnect;

// import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGO_URI as string;

// if (!MONGODB_URI) {
//   throw new Error("Please define the MONGO_URI environment variable in .env.local");
// }

// let cached = (global as any).mongoose;

// if (!cached) {
//   cached = (global as any).mongoose = { conn: null, promise: null };
// }

// async function dbConnect() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default dbConnect;
