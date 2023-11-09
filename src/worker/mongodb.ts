import mongoose from 'mongoose';
async function mongoHandler() {
  try {
    const connection = await mongoose.connect('', {
      serverSelectionTimeoutMS: 1000, // Timeout after 5s instead of 30s
      // socketTimeoutMS: 10, //
    });
    if (connection) {
      return connection;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default mongoHandler