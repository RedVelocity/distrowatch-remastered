import { connect } from 'mongoose';

const { MONGO_URI } = process.env;

if (!MONGO_URI) {
  throw new Error(
    'Please define the MONGO_URI environment variable inside .env.local'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  // eslint-disable-next-line no-multi-assign
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = await connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};

export default dbConnect;
