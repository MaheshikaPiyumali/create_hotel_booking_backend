import bodyparser from 'body-parser'

import express from 'express'
import userRouter from './Routes/UseRouter.js';
import mongoose from 'mongoose';
import gallaryRouter from './Routes/GallaryRouter.js';
import jwt from 'jsonwebtoken'
import categoryRouter from './Routes/CategoryRouter.js';
import dotenv from 'dotenv'

dotenv.config()

const app = express();
app.use(bodyparser.json())


//MongoDB string ekaking conection eka
const connectionString = process.env.MONGO_URL




//midleware create
/*app.use((req,res,next)=>{
    const token = req.header("Authorization")?.replace("Bearer","");
if(token != null){
    jwt.verify(token,process.env.JWT_KEY,(err,decoded)=>{
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

});*/
app.use((req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return next(); // No token, proceed without authentication
    }

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            console.error("JWT Verification Error:", err.message);
            return next(); // Invalid token, proceed without authentication
        }

        req.user = decoded; // Attach decoded user data to req
        next();
    });
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