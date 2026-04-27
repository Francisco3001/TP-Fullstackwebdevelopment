require("dotenv").config();

const app = require("./app");
const CONFIG = require("./config/config");

app.listen(CONFIG.PORT, () => {
  console.log(`Servidor corriendo en puerto ${CONFIG.PORT}`);
});