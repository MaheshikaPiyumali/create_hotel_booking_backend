import bodyparser from 'body-parser'

import express from 'express'
import userRouter from './Routes/UseRouter.js';
import mongoose from 'mongoose';
import gallaryRouter from './Routes/GallaryRouter.js';
import jwt from 'jsonwebtoken'
import categoryRouter from './Routes/CategoryRouter.js';

const app = express();
app.use(bodyparser.json())


//MongoDB string ekaking conection eka
const connectionString ="mongodb+srv://Admin3:1999@cluster0.p7zq0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"



//midleware create
app.use((req,res,next)=>{
    const token = req.header("Authorization")?.replace("Bearer","")
if(token != null){
    jwt.verify(token,"secret",(err,decoded)=>{
        if(decoded !=null){
            req.user = decoded;
           // console.log(decoded)
            next();
        }else{
            next();
        }
    });

}else{
    next();
}

});

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





app.use("/api/users",userRouter)
app.use("/api/gallery",gallaryRouter)
app.use("/api/category",categoryRouter)



app.listen(5000,()=>{
    console.log("server is running");
});