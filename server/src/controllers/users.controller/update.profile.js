const User = require("../../models/users.model/users.model");

const updateProfile = async (req, res, next) => {
  const id = req.user.id;
  const { username, email } = req.body;

  try {
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "User does not exist",
      });
    }

    user.username = username ?? user.username;
    user.email = email ?? user.email;

    await user.save();

    return res.status(200).json({
      status: 200,
      success: true,
      message: "User updated successfully",
      data: { user },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = updateProfile;
