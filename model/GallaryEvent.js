import mongoose from "mongoose";

const galleryItemSchema =mongoose.Schema({
    name :{
        type : String,
        required :true
    },
    image :{
        type : String,
        required : true
    },
    description :{
        type : String,
        required : true
    }

})
 const GallaryItems = mongoose.model("GallartItems",galleryItemSchema)
 export default GallaryItems;