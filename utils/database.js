import mongoose from 'mongoose';
let isConnected = false;
export const connectToDB = async () => {
  mongoose.set('strictQuery', false);
  if (isConnected) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      dbName: 'PROMPTOPIA',
    });
    isConnected = true;
  } catch (e) {
    console.log(e);
  }
};
