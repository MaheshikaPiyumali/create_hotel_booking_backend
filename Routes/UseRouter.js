import express from 'express'
import{postUser ,LoginUser,getAllUsers} from '../Controllers/UserControllers.js'
//
const userRouter= express.Router();

userRouter.get("/",getAllUsers)
userRouter.post("/",postUser)
userRouter.post("/login",LoginUser)

//userRouter.delete("/",deleteUser)

//userRouter.put("/",putUser)

export default userRouter;


