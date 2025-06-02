import mongoose from "mongoose";
const Schema= mongoose.Schema
const articleSchema=new Schema({
    title:String,
    body:String,
    likes:Number,
})
let Article=mongoose.model("article",articleSchema)
export default Article;