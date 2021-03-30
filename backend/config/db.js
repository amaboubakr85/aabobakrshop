import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    console.log(`MongoDB connected on ${conn.connection.host}`.cyan.underline) //.cyan.underline is for colors.js
  } catch (error) {
    console.error(`error  : ${error.message}`.red.underline.bold) //red.underline.bold is for colors.js
    process.exit(1)
  }
}

export default connectDB
