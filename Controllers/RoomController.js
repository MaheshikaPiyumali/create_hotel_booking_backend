import rooms from "../model/Room.js";
import {isAdminValid} from "../Controllers/UserControllers.js";
import Category from "../model/category.js";

export function CreateRoom(req,res){
  


        if(!isAdminValid(req)){
            res.json({
                message : "Forbidden"
            })
            return
        }

       /* const { RoomId, Category } = req.body;

        if (!RoomId || !Category) {
            return res.status(400).json({ message: 'RoomId and category are required' });
        }*/






    const newRoom = new rooms(req.body)
    newRoom.save().then(
        (result)=>{
            res.json({
                message :"Room create successfully",
                result :result
            })

        }).catch(
        (err)=>{
            res.json({
                message :"Room creation Failed",
                error :err
            })
        })
        
}
// Delete Function
export function deleteRoom(req,res){
    if(!isAdminValid(req)){
        res.json({
            message :"Forbidden"
        })
        return
    }
    
    const roomId = req.params.roomId;
    rooms.findOneAndDelete({RoomId :roomId}).then(
       ()=>{
        res.json({
            message :"Room Delete successfully"
        })
       } 
    ).catch(
        ()=>{
            res.json({
                message :"Room delete failed"
            })
        }
    )
}



  

export function findRoomId(req,res){
    const roomId = req.body.roomId

    rooms.FindOne({roomId:roomId}).then(
        (result)=>{
            if(result == null){
                res.Status(404).json({
                    message : "Room not found"
                })
                return
            }else{
                res.json({
                    message:"Room Found",
                    result :result
                })
            }
        }
    ).catch(
        (err)=>{
            res.json({
                message :"Room search failed",
                error :err
            })
        }
    )
}
//get room
export function getRooms(req,res){
    rooms.find().then(
        (result)=>{
            res.json({
                rooms :result
            })
        }
    ).catch(
        ()=>{
            res.json({
                message :"failde to get  rooms"
            })
        }
    )

}
//Room update b Id
export function updateRoom(req,res){
    if(!isAdminValid(req)){
        res.Status(404).json({
            message :"forbidden"
        })
        return
    }
    const roomId = req.body.roomId
    rooms.findOneAndUpdate({roomId:roomId}).then(
        ()=>{
            res.json({
                message :"room Update successfuly"
            })
        }
    ).catch(
        (err)=>{
            res.json({
                message :"Update Failed",
                error :err
            })
        }
    )
}

export function getRoomsByCategory(req,res){
    const Category = req.params.Category

    rooms.find({Category:Category}).then(
        (result)=>{
            res.json({
                    rooms :result
            })
        }
    ).catch(
        ()=>{
            res.json({
                message :"failed to get rooms"
            })
        }
    )
}