import { request } from "express";
import mongoose from "mongoose";



const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    Price:{
        type :String,
        request :true
    },
    image :{
        type : String,
        required : true
    },
    features:{
        
    }

});

const Category = mongoose.model('Category', categorySchema);

export default Category;
