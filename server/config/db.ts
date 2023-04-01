const mongoose = require('mongoose');
const PORT = process.env.PORT || process.env.API_PORT;
export const connectDB = async () => {
  mongoose.connect(process.env.MONGODB_URL).then((conn: any) => {
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  });
};
