
import mongoose from "mongoose"
import User from "../model/user.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()



 
 export function postUser(req,res){

const user =req.body

const password = req.body.password
const saltRounds =10;

const passwordHash = bcrypt.hashSync(password,saltRounds);

user.password =passwordHash

const newUser =new User(user)

    newUser
    .save()
    .then(()=>{
        res.json({
            message : "user create successfully"
        });
       } ).catch(
       ()=>{
        res.json({
            message : "user create faild"
        });
       });

}

export function LoginUser(req, res) {
    const credentials = req.body;

    User.findOne({ email: credentials.email }).then((user) => {
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const isPasswordValid = bcrypt.compareSync(credentials.password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({
                message: "Incorrect password",
            });
        }

        // ✅ Define payload outside of any conditional block
        const payload = {
            id: user._id,
            email: user.email,
            type: user.type
        };

        // ✅ Generate JWT token
        const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });

        // ✅ Send response
        res.json({
            message: "User found",
            user: user,
            token: token,
        });
    }).catch((error) => {
        res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    });
}

export function getAllUsers(req, res) {
    User.find()
        .then((users) => {
            res.json({
                message: "Users retrieved successfully",
                users: users
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Failed to retrieve users",
                error: error.message
            });
        });
}


  export function isCustomerValid(req) {
    if (req.user == null) {
      return false;
    }
    console.log(req.user);
    if (req.user.type != "customer") {
      return false;
    }
  
    return true;
  } 
