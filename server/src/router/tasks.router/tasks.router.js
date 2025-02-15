const router = require("express").Router();

const taskController = require("../../controllers/tasks.controller");
const authMiddleware = require("../../middleware/authMiddleware");

router.route("/tasks").get(authMiddleware, taskController.getAllTasks);
router.route("/tasks").post(authMiddleware, taskController.createTask);
router.route("/tasks/:id").get(authMiddleware, taskController.getTaskById);
router.route("/tasks/:id").put(authMiddleware, taskController.updateTask);
router.route("/tasks/:id").delete(authMiddleware, taskController.deleteTask);

module.exports = router;
