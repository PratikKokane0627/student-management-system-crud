import mongoose from "mongoose";
import "dotenv/config";


async function connectDb() {

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("----MongoDB Connected----")
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}

export default connectDb;
