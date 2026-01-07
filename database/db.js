import mongoose from "mongoose";


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)

        console.log("connected successfully");
    } catch (error) {
        // console.log("Error in connecting DB");
        console.log(error.message);
    }
}


export default connectDB