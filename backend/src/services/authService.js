const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersModel = require("../models/usersModel");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    }
  );
};

const register = async ({ name, email, password, role }) => {
  if (!name || !email || !password) {
    throw new Error("nombre, email y contraseña son requeridos");
  }

  const existingUser = await usersModel.getUserByEmail(email);

  if (existingUser) {
    throw new Error("Email ya está registrado");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await usersModel.createUser({
    name,
    email,
    password: hashedPassword,
    role: role || "user",
  });

  delete user.password;

  const token = generateToken(user);

  return {
    user,
    token,
  };
};

const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email y contraseña son requeridos");
  }

  const user = await usersModel.getUserByEmail(email);

  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new Error("Credenciales inválidas");
  }

  delete user.password;

  const token = generateToken(user);

  return {
    user,
    token,
  };
};

module.exports = {
  register,
  login,
};