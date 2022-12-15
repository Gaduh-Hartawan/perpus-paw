const router = require("express").Router();
const verifyLogin = require("../configs/verify").isLogin;
const userController = require('../controllers/user')

// Dashboard
router.get("/dashboard",verifyLogin, userController.getDashboard);

module.exports = router