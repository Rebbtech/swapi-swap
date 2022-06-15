import mongoose from 'mongoose'

const mongoClient = async () => {
    try {
        if (!process.env.MONGO_CLIENT) {
           console.log( "MONGO_CLIENT is not defined, please create MONGO_CLIENT and provide a mongoDB connection string.")
        }
        const conn = await mongoose.connect(process.env.MONGO_CLIENT)
        if (conn) {
          return  console.log("MongoDB connected!")
        }
        console.log("Failed to connect MongoDB.")
    } catch (error) {
        console.log(error)
    }
}

export default mongoClient