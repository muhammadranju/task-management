const User = require("../../models/users.model/users.model");

const resetPassword = async (req, res, next) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Check Expiry
    });

    if (!user)
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Invalid or expired token",
      });

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resetPassword;
