import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
    name:{
        type : String,
        required : true,
        unique :true
    },
    description :{
        type : String,
        required : true
    },
    Price :{
        type :Number,
        requied :true
    },
    image:{
        type : String,
        required : true
    },
    features :[{
        type :String,
    }]


})

const categritems = mongoose.model("categritems",CategorySchema)
export default categritems;