import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { UserInfo } from "@/models/UserInfo";
import { Order } from "@/models/Order";

export async function GET(request) {
mongoose.connect(process.env.MONGO_URI);
const session= await getServerSession(authOptions);
const userEmail= session?.user?.email;
let isAdmin= false;
const url= new URL(request.url);
const _id=url.searchParams.get('_id');
if(_id){
    return Response.json(await Order.findById(_id));
}
if(userEmail){
    const userInfo= await UserInfo.findOne({email: userEmail});
    if(userInfo){
        const isAdmin= userInfo.admin;
    }
}
if(isAdmin){
    return Response.json(await Order.find());  
}
if(userEmail){
    return Response.json(await Order.find({userEmail}));  
}
}