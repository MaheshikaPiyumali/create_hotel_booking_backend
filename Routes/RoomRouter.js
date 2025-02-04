import express from "express"
import {CreateRoom,deleteRoom,findRoomId,getRooms,updateRoom,getRoomsByCategory} from "../Controllers/RoomController.js"
import{isAdminValid} from '../Controllers/UserControllers.js'

const RoomRouter = express.Router()

RoomRouter.post("/",CreateRoom)
RoomRouter.delete("/:roomId",deleteRoom)
RoomRouter.get("/by-category/:category",getRoomsByCategory)
RoomRouter.get("/:roomId",findRoomId)
RoomRouter.get("/",getRooms)
RoomRouter.put("/:roomId",updateRoom)



export default  RoomRouter