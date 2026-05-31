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
    const { user, token } = await authService.login(req.body);

    res.json({
      user,
      token,
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
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