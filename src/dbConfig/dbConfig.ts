import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.mongo_uri!);
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log("DB connected successfully");
        })
        connection.on('error',(err)=>{
            console.log("Error while connecting to DB");
            console.log(err);
            process.exit(); 
        })
    } catch (error) {
        console.log("Something goes wrong!");
        console.log(error);

    }
}