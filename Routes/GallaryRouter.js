import express from 'express'
import{postGallaryItem,getGallaryItem} from '../Controllers/GallaryEventControllers.js'
const gallaryRouter =express.Router();

gallaryRouter.post("/",postGallaryItem)
gallaryRouter.get("/",getGallaryItem)

export default gallaryRouter;