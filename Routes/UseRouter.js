import express from 'express'
import{postUser, LoginUser} from '../Controllers/UserControllers.js'

const userRouter= express.Router();

//userRouter.get("/",getUser)
userRouter.post("/",postUser)
userRouter.post("/login",LoginUser)

//userRouter.delete("/",deleteUser)

//userRouter.put("/",putUser)

export default userRouter;


