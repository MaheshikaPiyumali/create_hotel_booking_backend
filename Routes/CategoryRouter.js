import express from 'express'
import{postCategory,deleteCategoryByName,getAllCategories,getCategoryByName } from "../Controllers/categoryControllers.js"

const categoryRouter = express.Router();

categoryRouter.post("/",postCategory)
categoryRouter.delete("/:name",deleteCategoryByName)
categoryRouter.get("/",getAllCategories)
categoryRouter.get("/:name",getCategoryByName)


export default  categoryRouter;