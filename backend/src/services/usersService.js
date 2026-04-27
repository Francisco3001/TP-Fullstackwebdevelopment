const usersModel = require("../models/usersModel");

const getUsers = async () => {
  return await usersModel.getAllUsers();
};

const getUserById = async (id) => {
  return await usersModel.getUserById(id);
};

const updateUser = async (id, data) => {
  return await usersModel.updateUser(id, data);
};

const deleteUser = async (id) => {
  return await usersModel.deleteUser(id);
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};