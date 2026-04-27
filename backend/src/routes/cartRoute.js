const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.get("/", authMiddleware, cartController.getCartByUser);
router.post("/", authMiddleware, cartController.createCart);

router.get("/:cartId/items", authMiddleware, cartController.getCartItems);
router.post("/items", authMiddleware, cartController.addCartItem);
router.put("/items/:id", authMiddleware, cartController.updateCartItem);
router.delete("/items/:id", authMiddleware, cartController.deleteCartItem);

module.exports = router;