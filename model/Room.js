import mongoose from "mongoose";
import Category from "../model/category.js"
const RoomsSchema = new mongoose.Schema({
    RoomId :{
        type :Number,
        required :true,
        unique :true
    },
    category :{
        type :String,
        required :true
    },
    MaxGuests :{
        type : Number,
        required :true,
        default :3
    },
    available :{
        type :Boolean,
       required :true,
       default : true


    },
    photos :[
        {
            type :String
        }
    ],
    SpecialDescription :{
        type :String,
        default :true
    },
    Notes :{
        type :String,
        default :""
    }


});
const rooms = mongoose.model("rooms",RoomsSchema)
export default rooms;