const User = require("../../models/users.model/users.model");

const profile = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "User does not exist",
      });
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "User found successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = profile;
