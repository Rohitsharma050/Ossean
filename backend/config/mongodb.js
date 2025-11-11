import mongoose  from "mongoose";
const connectDb = async ()=>{
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/OsseanDb`)
       console.log("Database connected successfully!")
    } catch (error) {
        console.log("Database connection faild:",error.mongoose)
    }
}
export default connectDb