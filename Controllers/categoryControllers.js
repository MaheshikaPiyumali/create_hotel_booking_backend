import Category from "../model/category.js";

import {isAdminValid} from "../Controllers/UserControllers.js"

  // Correct import statement

// Function to create a category
export function postCategory(req, res) {
    if (!req.user) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    if (req.user.type !== "admin") {
        return res.status(403).json({ message: "Forbidden: Admin access required" });
    }

    const newCategory = new Category(req.body);  // Corrected usage of 'Category'

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

   //get cattegory
   export function getCategory(req, res) {
    Category.find()
        .then((categories) => {
            res.json({
                message: "Categories retrieved successfully",
                categories: categories
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Failed to retrieve categories",
                error: error.message
            });
        });
}
