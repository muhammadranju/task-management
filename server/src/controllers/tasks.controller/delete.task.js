const Task = require("../../models/tasks.model/tasks.model");

const deleteTask = async (req, res, next) => {
  const { id } = req.params;

  try {
    const task = await Task.findById({ _id: id });
    if (!task) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Task does not exist",
      });
    }

    await task.deleteOne();

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = deleteTask;
