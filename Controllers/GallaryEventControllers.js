import GallaryItems from "../model/GallaryEvent.js"

export function postGallaryItem(req,res){

    const user =req.user
    if(user == null){
        res.status(403).json({
            message :"please login to create gallary  items"
        })
        return
    }
    if(user .type !="admin"){
        res.status(403).json({
            message : "you do not have permission to create a gallary item"
        })
        return
    }


    const gallaryItem = req.body.item
    const newGallaryItem = new GallaryItems (gallaryItem)

    newGallaryItem.save().then(
        ()=>{
            res.json({
                message :"create Gallary sucssefull"
            })
        }
    ).catch(
        ()=>{
           res.status(500).json({
                message :"Gallary create not failde"
           }) 
        }
    )
}

export function getGallaryItem(req,res){
    GallaryItems.find().then(
        (List)=>{
            res.json({
                list :List
            })
        }

    )


}
export function putGallaryItem(req,res){

}
export function deleteGallaryItem(req,res){

}