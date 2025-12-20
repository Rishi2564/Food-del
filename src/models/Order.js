const { count } = require("console");
import { Schema, model, models } from "mongoose";

const OrderSchema= new Schema({
    userEmail:String,
    phone:String,
    streetAddress:String,
    city:String,
    country:String,
    postalCode:String,
    cartProducts:Object,
    paid:{type:Boolean, default:false},
},{timestamps:true});

export const Order= models?.Order || model('Order', OrderSchema);