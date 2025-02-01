import Category from "../model/category.js";
//import { isAdminValid } from "../Controllers/UserControllers.js";

// Function to create a category with proper error handling
export async function postCategory(req, res) {
    if (!req.user) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    if (req.user.type !== "admin") {
        return res.status(403).json({ message: "Forbidden: Admin access required" });
    }

    const { name } = req.body;

    try {
        // Check if a category with the same name already exists
        const existingCategory = await Category.findOne({ name: name });

        if (existingCategory) {
            return res.status(409).json({ message: "Category already exists" });
        }

        // Create and save the new category
        const newCategory = new Category(req.body);
        const result = await newCategory.save();

        return res.status(201).json({
            message: "Category created successfully",
            result: result,
        });

    } catch (err) {
        console.error("Category creation error:", err);

        // Avoid returning circular objects by sending readable error messages
        return res.status(500).json({
            message: "Category creation failed",
            error: err.message,
        });
    }
}
//deiete category
export async function deleteCategoryByName(req, res) {
    if (!req.user) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    if (req.user.type !== "admin") {
        return res.status(403).json({ message: "Forbidden: Admin access required" });
    }

    const categoryName = req.params.name;

    try {
        // Find and delete the category by name
        const deletedCategory = await Category.findOneAndDelete({ name: categoryName });

        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        return res.status(200).json({ message: `Category '${categoryName}' deleted successfully` });

    } catch (error) {
        console.error("Error deleting category:", error);
        return res.status(500).json({
            message: "Failed to delete category",
            error: error.message,
        });
    }
}
//get All category
export async function getAllCategories(req, res) {
    try {
        // Retrieve all categories from the database
        const categories = await Category.find();

        if (categories.length === 0) {
            return res.status(404).json({ message: "No categories found" });
        }

        return res.status(200).json({
            message: "Categories retrieved successfully",
            categories: categories,
        });
    } catch (error) {
        console.error("Error retrieving categories:", error);
        return res.status(500).json({
            message: "Failed to retrieve categories",
            error: error.message,
        });
    }
}
export  function getCategoryByName(req,res) {
    const name = req.params.name;
    Category.findOne({name:name}).then(
        (result)=>{
            if(result==null){
                res.json({
                    message :"Category Not found"
                })
            }else{
                res.json(
                    {
                        Category :result
                    }
                )
            }
        }

    ).catch(
        ()=>{
            res.json(
                {
                    message:"failed to get category"
                }
            )
        }

    )
}
//update category
export function UpdateCategory(req, res) {
    if (!isAdminValid(req)) {
        res.status(404).json({
            message: "Unauthorized"
        });
        return;
    }

    const name = req.params.name;

    Category.updateOne({ name: name }, req.body)
        .then(() => {
            res.json({
                message: "Category updated successfully"
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Failed to update category",
                error: err.message
            });
        });
}


export function isAdminValid(req) {
    if (req.user == null) {
      return false;
    }
    if (req.user.type != "admin") {
      return false;
    }
    return true;
  }