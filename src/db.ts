import mongoose from 'mongoose';

export default async function connectDB() {
    return await mongoose.connect("mongodb://localhost:27017/tanstack");
}