const express = require("express");
const morgan = require("morgan");

const usersRoute = require("./routes/usersRoute");
const categoriesRoute = require("./routes/categoriesRoute");
const productsRoute = require("./routes/productsRoute");
const cartRoute = require("./routes/cartRoute");
const ordersRoute = require("./routes/ordersRoute");
const authRoute = require("./routes/authRoute");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mi API",
      version: "1.0.0",
      description: "Documentación de la API",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.js"], // donde están tus rutas
};

const swaggerSpec = swaggerJsdoc(options);

const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());


app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/products", productsRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", ordersRoute);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;