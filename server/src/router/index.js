const router = require("express").Router();
const usersRouter = require("./users.router/users.router");
const tasksRouter = require("./tasks.router/tasks.router");

router.use(tasksRouter);
router.use("/auth", usersRouter);

module.exports = router;
