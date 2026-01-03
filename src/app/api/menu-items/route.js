import { MenuItem } from "@/models/MenuItem";
import mongoose from "mongoose";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URI);
  const data = await req.json();
  if (await isAdmin()) {
    const menuItemDoc = await MenuItem.create(data);
    return Response.json(menuItemDoc);
  } else {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}
export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URI);
  if (await isAdmin()) {
    const { _id, ...data } = await req.json();
    await MenuItem.findByIdAndUpdate(_id, data);
  }

  return Response.json(true);
}

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URI);
  return Response.json(await MenuItem.find());
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGO_URI);
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  if (await isAdmin()) {
    await MenuItem.deleteOne({ _id });
  }

  return Response.json(true);
}
