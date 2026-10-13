import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const dbUri = process.env.MONGO_URI || process.env.MONGO || "mongodb://localhost:27017/meropathsala";
        await mongoose.connect(dbUri);
        console.log('MongoDB Connected');
    } catch (error) {
        console.log("error occured", error); 
    }
}
export default connectDB;