import Category from "../model/category.js";
import { isAdminValid } from "../Controllers/UserControllers.js";

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
