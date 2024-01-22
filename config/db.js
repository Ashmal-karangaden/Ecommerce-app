import mongoose from 'mongoose'
import colors from 'colors'

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        const report = console.log(`Connected to Mongodb Database ${conn.connection.host}`.bgMagenta.white)
        report
    }catch(error){
        console.log(`Error in Mongodb ${error}`.bgRed.white)
    }
}

export default connectDB;