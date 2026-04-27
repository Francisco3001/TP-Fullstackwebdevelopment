const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoriesController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.get("/", categoriesController.getCategories);
router.get("/:id", categoriesController.getCategory);

router.post("/", authMiddleware, roleMiddleware("admin"), categoriesController.createCategory);
router.put("/:id", authMiddleware, roleMiddleware("admin"), categoriesController.updateCategory);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), categoriesController.deleteCategory);

module.exports = router;