const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Gestion de ordenes
 *
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         user_id:
 *           type: integer
 *           example: 3
 *         total:
 *           type: number
 *           format: float
 *           example: 89999.5
 *         status:
 *           type: string
 *           example: pending
 *
 *     OrderActionResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Orden creada desde carrito exitosamente
 *         order:
 *           $ref: '#/components/schemas/Order'
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
 * /api/orders:
 *   get:
 *     summary: Obtener todas las ordenes
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de ordenes obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", authMiddleware, roleMiddleware("admin"), ordersController.getOrders);        

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Obtener orden por ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la orden
 *     responses:
 *       200:
 *         description: Orden encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Orden no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:id", authMiddleware, ordersController.getOrderById);  

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Crear orden desde carrito del usuario autenticado
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Orden creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderActionResponse'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", authMiddleware, ordersController.createOrderFromCart);     

module.exports = router;