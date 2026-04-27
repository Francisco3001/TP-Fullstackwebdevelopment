const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Gestion del carrito del usuario autenticado
 *
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         user_id:
 *           type: integer
 *           example: 2
 *
 *     CartItem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 10
 *         cart_id:
 *           type: integer
 *           example: 1
 *         product_id:
 *           type: integer
 *           example: 3
 *         quantity:
 *           type: integer
 *           example: 2
 *
 *     AddCartItemInput:
 *       type: object
 *       required: [product_id, quantity]
 *       properties:
 *         product_id:
 *           type: integer
 *           example: 3
 *         quantity:
 *           type: integer
 *           example: 2
 *
 *     UpdateCartItemInput:
 *       type: object
 *       properties:
 *         quantity:
 *           type: integer
 *           example: 4
 *
 *     CartResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Carrito creado exitosamente
 *         cart:
 *           $ref: '#/components/schemas/Cart'
 *
 *     CartItemResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Item del carrito actualizado exitosamente
 *         item:
 *           $ref: '#/components/schemas/CartItem'
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Error al procesar la solicitud
 *         error:
 *           type: string
 *           example: detalle tecnico del error
 */

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Obtener carrito del usuario autenticado
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carrito obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", authMiddleware, cartController.getCartByUser);

/**
 * @swagger
 * /api/cart/items:
 *   post:
 *     summary: Agregar item al carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddCartItemInput'
 *     responses:
 *       201:
 *         description: Item agregado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartItemResponse'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.post("/items", authMiddleware, cartController.addCartItem);

/**
 * @swagger
 * /api/cart/items/{id}:
 *   put:
 *     summary: Actualizar item del carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del item del carrito
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCartItemInput'
 *     responses:
 *       200:
 *         description: Item actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartItemResponse'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Item del carrito no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put("/items/:id", authMiddleware, cartController.updateCartItem);

/**
 * @swagger
 * /api/cart/items/{id}:
 *   delete:
 *     summary: Eliminar item del carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del item del carrito
 *     responses:
 *       200:
 *         description: Item eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartItemResponse'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Item del carrito no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/items/:id", authMiddleware, cartController.deleteCartItem);

module.exports = router;