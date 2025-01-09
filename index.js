import bodyparser from 'body-parser'

import express from 'express'
import userRouter from './Routes/UseRouter.js';
import mongoose from 'mongoose';
import gallaryRouter from './Routes/GallaryRouter.js';
import jwt from 'jsonwebtoken'

const app = express();
//MongoDB string ekaking conection eka
const connectionString ="mongodb+srv://Admin3:1999@cluster0.p7zq0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// conection eka true or fales

mongoose.connect(connectionString).then(
    ()=>{
        console.log("Database is conect")
    }
).catch(
    ()=>{
        console.log("database is connection failde")
    }
)

//midleware create
app.use((req,res,next)=>{
    const token = req.header("Authorization")?.replace("Bearer","")
if(token != null){
    jwt.verify(token,"secret",
        (err,decoded)=>{
        if(decoded !=null){
            req.body.user = decoded
           // console.log(decoded)
            next()
        }else{
            next()
        }
    })

}

});




app.use(bodyparser.json())
app.use("/api/users",userRouter)
app.use("/api/gallery",gallaryRouter)



app.listen(5000,(req,res)=>{
    console.log("server is running");
});