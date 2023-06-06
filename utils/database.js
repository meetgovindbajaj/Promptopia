import mongoose from 'mongoose';
let isConnected = false;
export const connectToDB = async () => {
  mongoose.set('strictQuery', true);
  if (isConnected) {
    console.log('Database already connected!');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      dbName: 'share_prompt',
    });
    isConnected = true;
    console.log('Database connected');
  } catch (e) {
    console.log(e);
  }
};
