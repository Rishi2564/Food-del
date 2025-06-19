import { MenuItem } from "@/models/MenuItem";
import mongoose from "mongoose";

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URI);
  const data = await req.json();
  const menuItemDoc = await MenuItem.create(data);
  return Response.json(menuItemDoc);
}
