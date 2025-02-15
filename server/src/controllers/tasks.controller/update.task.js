const Task = require("../../models/tasks.model/tasks.model");

const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, dueDate, status } = req.body;
  try {
    const task = await Task.findById({ _id: id });
    if (!task) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Task does not exist",
      });
    }
    console.log(req.body);
    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.dueDate = dueDate ?? task.dueDate;
    task.status = status ?? task.status;

    console.log(task);
    await task.save();

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = updateTask;
