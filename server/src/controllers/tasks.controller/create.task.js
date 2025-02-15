const Task = require("../../models/tasks.model/tasks.model");

const createTask = async (req, res, next) => {
  const { title, description, dueDate, status } = req.body;

  if (!title || !description || !dueDate || !status) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Please provide all the required fields",
    });
  }

  try {
    const task = new Task({
      title,
      description,
      dueDate,
      status,
      userId: req.user.id,
    });

    await task.save();

    return res.status(201).json({
      status: 201,
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createTask;
