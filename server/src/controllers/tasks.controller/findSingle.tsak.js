const Task = require("../../models/tasks.model/tasks.model");

const getTaskById = async (req, res, next) => {
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

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Task found successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getTaskById;
