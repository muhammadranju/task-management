const Task = require("../../models/tasks.model/tasks.model");

const getAllTasks = async (req, res, next) => {
  try {
    const { page = 1, limit = 4 } = req.query; // ✅ Get pagination params from query

    const tasks = await Task.find({ userId: req.user.id })
      .skip((page - 1) * limit) // ✅ Skip tasks for pagination
      .limit(parseInt(limit)); // ✅ Limit tasks per page

    const totalTasks = await Task.countDocuments({ userId: req.user.id }); // ✅ Total task count
    const totalPages = Math.ceil(totalTasks / limit); // ✅ Calculate total pages

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Tasks found successfully",
      data: tasks,
      totalPages, // ✅ Added total pages
      currentPage: parseInt(page), // ✅ Return current page
      totalTasks, // ✅ Added total task count
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

module.exports = getAllTasks;
