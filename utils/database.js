import mongoose from 'mongoose';
// export const connectToDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//       dbName: 'PROMPTOPIA',
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };
export const connectToDB = () =>
  mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    dbName: 'PROMPTOPIA',
  });
