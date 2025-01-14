import categritems from "../model/category.js";
/*export function postCategory(req,res){
    if(req.user == null){
        res.status(403).json({
            message :"Unauthorized"
        })
        return

    }
    if(req.user.type !="admin"){
        res.status(403).json({
            message :"forbidden"

        });
        return;
    }
    const newCategory = new Category(req.body)
    newCategory.save().then(
        (result)=>{
            res.json({
                message :"Category created successfully",
                result :result
            })
        }
    ).catch(
        (err)=>{
            res.json({
                message : "Category creation failed",
                error :err
            })
        }
    )

 }*/
    export function postCategory(req, res) {
        if (!req.user) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        
        if (req.user.type !== "admin") {
            return res.status(403).json({ message: "Forbidden: Admin access required" });
        }
    
        const newCategory = new categritems(req.body);
    
        newCategory.save()
        .then((result) => {
            res.json({
                message: "Category created successfully",
                result: result
            });
        })
        .catch((err) => {
            console.error("Category creation error:", err);
            res.status(500).json({
                message: "Category creation failed",
                error: err.message // Send readable error message
            });
        });
    }
   