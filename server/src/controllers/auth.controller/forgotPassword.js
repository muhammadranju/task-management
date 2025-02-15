const crypto = require("crypto");
const User = require("../../models/users.model/users.model");
const nodemailer = require("nodemailer");

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  console.log(email);
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({
        status: 404,
        success: false,
        message: "User not found",
      });

    // Generate Reset Token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 Hour Expiry
    await user.save();

    // Send Reset Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }, // Use environment variables in production
    });

    const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password/${resetToken}`;
    await transporter.sendMail({
      to: user.email,
      subject: "Password Reset Request",
      html: /*html*/ `
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 10px;">
        <div style="max-width: 500px; margin: 30px auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); text-align: center;">
            <h3 style="color: #333;">Password Reset Request</h3>
            <p style="font-size: 16px; color: #666;">Click the button below to reset your password:</p>
            <a href=${resetLink} style="display: inline-block; background: #007bff; color: #ffffff; padding: 12px 20px; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 5px; margin-top: 10px;">Reset Password</a>
            <p style="font-size: 14px; color: #666; margin-top: 20px;">If you did not request this, please ignore this email.</p>
            <hr style="border: 0; height: 1px; background: #ddd; margin: 20px 0;">
            <p style="font-size: 12px; color: #999;">&copy; 2025 Your <a href="https://www.mdranju.xyz" target="_blank">Md. Ranju</a> All rights reserved.</p>
        </div>
    </body>`,
    });

    return res.status(200).json({
      status: 200,
      success: true,
      resetLink,
      message: "Reset email sent successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = forgotPassword;
