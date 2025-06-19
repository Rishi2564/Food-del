const { Schema, models, model } = require("mongoose");

const MenuItemSchema= new Schema({
   
   name: {type:String},
   basePrice: {type:Number},
   description: {type:String},
   image: {type:String,},
},{timestamps:true});
export const MenuItem= models?.MenuItem || model('MenuItem',MenuItemSchema);