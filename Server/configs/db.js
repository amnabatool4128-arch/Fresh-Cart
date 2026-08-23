import mongoose from "mongoose";

// Vercel can reuse this module across warm invocations; cache the
// connection (or in-flight promise) on `global` so we don't open a
// new connection per request, and so a failed attempt is retried on
// the next request instead of leaving Mongoose stuck disconnected.
let cached = global._mongooseConn;
if (!cached) {
  cached = global._mongooseConn = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    mongoose.connection.on("connected", () => console.log("Database connected"));

    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, { dbName: "freshcart" })
      .catch((error) => {
        cached.promise = null; // allow the next request to retry
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;
