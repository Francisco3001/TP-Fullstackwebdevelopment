const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoriesController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Gestion de categorias
 *
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Perifericos
 *         description:
 *           type: string
 *           example: Productos de entrada y salida
 *
 *     CategoryInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Perifericos
 *         description:
 *           type: string
 *           example: Productos de entrada y salida
 *
 *     CategoryActionResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Categoria actualizada exitosamente
 *         category:
 *           $ref: '#/components/schemas/Category'
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
 * /api/categories:
 *   get:
 *     summary: Obtener todas las categorias
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista de categorias obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", categoriesController.getCategories);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Obtener categoria por ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoria
 *     responses:
 *       200:
 *         description: Categoria encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categoria no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:id", categoriesController.getCategory);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Crear categoria
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryInput'
 *     responses:
 *       201:
 *         description: Categoria creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryActionResponse'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", authMiddleware, roleMiddleware("admin"), categoriesController.createCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Actualizar categoria
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryInput'
 *     responses:
 *       200:
 *         description: Categoria actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryActionResponse'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado
 *       404:
 *         description: Categoria no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.put("/:id", authMiddleware, roleMiddleware("admin"), categoriesController.updateCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Eliminar categoria
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoria
 *     responses:
 *       200:
 *         description: Categoria eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryActionResponse'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado
 *       404:
 *         description: Categoria no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/:id", authMiddleware, roleMiddleware("admin"), categoriesController.deleteCategory);

module.exports = router;