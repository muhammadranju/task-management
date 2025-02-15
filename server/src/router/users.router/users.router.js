const router = require("express").Router();

const authController = require("../../controllers/auth.controller");

const userController = require("../../controllers/users.controller");
const authMiddleware = require("../../middleware/authMiddleware");

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);

router.route("/profile").get(authMiddleware, userController.profile);
router.route("/profile").put(authMiddleware, userController.updateProfile);

router.route("/forgot-password").post(authController.forgotPassword);
router.route("/reset-password").post(authController.resetPassword);

module.exports = router;
