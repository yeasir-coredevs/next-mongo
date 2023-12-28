import mongoose, { Connection } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cachedConnection: Connection | null = null;

export async function connectToDatabase(): Promise<Connection> {
  if (cachedConnection) {
    return cachedConnection;
  }
  try {
    const dbConnection = await mongoose.connect(MONGODB_URI);
    cachedConnection = dbConnection.connection;
    console.log('connected to MongoDB')
    return dbConnection.connection;
  }
  catch (e) {
    console.log(e);
    throw new Error('Unable to connect to the database');
  }
}
