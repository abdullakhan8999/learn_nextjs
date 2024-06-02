import { connect } from "@/dbConfig/dbConfig";
import User from "@/Models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
connect();


export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { username, email, password } = reqBody;
        console.log("reqBody: " + reqBody);

        //check user already exist 
        let user = await User.findOne({email});
        if(user){
            return NextResponse.json({
                status :400,
                error : "User already exists!"
            });
        }

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        //create user
        user = new User({
            username,
            email,
            hashedPassword
        });
        await user.save();
        console.log("User: " + user);
        

        return NextResponse.json({
            status: 200,
            success:true,
            message : "User created successfully!"
        })
        
    } catch (error: any) {
        return NextResponse.json({
            status: 500,
            error: error.message
        });
    }
}

