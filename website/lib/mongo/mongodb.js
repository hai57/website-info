/* eslint-disable prettier/prettier */
// /* eslint-disable no-console */
/* eslint-disable no-console */
import mongoose from 'mongoose';

const connectMongoDB = async () => {
  try {
    // const conn = await mongoose.connect(process.env.MONGODB_URI);

    // console.log(`MongoDB Connected: ${conn.connection.host}:${conn.connection.port}`);
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectMongoDB
