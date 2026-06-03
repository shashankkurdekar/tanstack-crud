import connectDB from '@/db';
import userModel from "@/user.model";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { name, email } = await req.json();
        await connectDB();
        const existingUser = await userModel.findOne({ name, email });
        if (existingUser) {
            return NextResponse.json({ success: true }, { status: 201 });
        }
        else {
            const user = new userModel({ name, email });
            await user.save();
            return NextResponse.json({ success: true }, { status: 201 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}
export async function GET() {
    try {
        await connectDB();
        const users = await userModel.find();
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}