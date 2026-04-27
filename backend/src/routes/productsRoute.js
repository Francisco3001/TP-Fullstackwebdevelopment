const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.get("/", productsController.getProducts);
router.get("/:id", productsController.getProduct);
router.post("/", authMiddleware, roleMiddleware("admin"), productsController.createProduct);
router.put("/:id", authMiddleware, roleMiddleware("admin"), productsController.updateProduct);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), productsController.deleteProduct);

module.exports = router;