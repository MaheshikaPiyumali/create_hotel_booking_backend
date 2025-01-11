import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    description :{
        type : String,
        required : true
    },
    Price :{
        type :String,
        requied :true
    }


})

const categritems = mongoose.model("categritems",CategorySchema)
export default categritems;