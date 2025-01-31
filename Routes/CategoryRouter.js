import express from 'express'
import{postCategory} from "../Controllers/categoryControllers.js"

const categoryRouter = express.Router();

categoryRouter.post("/",postCategory)
//categoryRouter.get("/",getCategory)


export default  categoryRouter;