const User = require("../../models/users.model/users.model");

const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Please provide all the required fields",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        status: 409,
        success: false,
        message: "User already exists",
      });
    }

    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();

    return res.status(201).json({
      status: 201,
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
