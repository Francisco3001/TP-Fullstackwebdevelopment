const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.get("/", authMiddleware, roleMiddleware("admin"), ordersController.getOrders);        
router.get("/:id", authMiddleware, ordersController.getOrderById);  
router.post("/", authMiddleware, ordersController.createOrderFromCart);     

module.exports = router;