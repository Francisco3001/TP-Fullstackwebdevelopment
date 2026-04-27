const authService = require("../services/authService");

const register = async (req, res) => {
  try {
    const result = await authService.register(req.body);

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error registrando usuario",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);

    res.json({
      message: "Usuario logueado exitosamente",
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    res.status(401).json({
      message: "Error logueando usuario",
      error: error.message,
    });
  }
};

const profile = async (req, res) => {
  res.json({
    message: "Datos del perfil",
    user: req.user,
  });
};

module.exports = {
  register,
  login,
  profile,
};