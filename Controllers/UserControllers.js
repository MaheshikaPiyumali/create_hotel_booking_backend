
import mongoose from "mongoose"
import User from "../model/user.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'



 
 export function postUser(req,res){

const user =req.body

const password = req.body.password
const passwordHash = bcrypt.hashSync(password,10);
user.password =passwordHash

    const newUser =new User(user)

    newUser.save().then(

       ()=>{
        res.json({
            message : "user create successfully"
        })
       } 
    ).catch(
       ()=>{
        res.json({
            message : "user create faild"
        })
       } 
    )

}
export function LoginUser(req, res){
    const credentials =req.body
    User.findOne({email : credentials.email, password : credentials.password}).then(
        (user)=>{
            if(user == null){
                res.status(404).json({
                    message :"User Not found"
                })
            }else{
                const payload = {
                    id : user._id,
                    email : user.email,
                    type :user.type
                };
                const token = jwt.sign(payload,"secret", {expiresIn :"1h"});
                res.json({
                    message :"User found",
                    user : user,
                    token :token

                })
            }
        }
    )

}
