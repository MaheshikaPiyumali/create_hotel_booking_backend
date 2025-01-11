import express from 'express'
import{postCategory} from "../Controllers/categoryControllers.js"

const categoryRouter = express.Router();

categoryRouter.post("/",postCategory)

export default  categoryRouter;