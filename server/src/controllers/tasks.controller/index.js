const createTask = require("./create.task");
const getAllTasks = require("./findAll.task");
const getTaskById = require("./findSingle.tsak");
const updateTask = require("./update.task");
const deleteTask = require("./delete.task");

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
