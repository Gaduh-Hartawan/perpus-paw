const router = require("express").Router();
const verify = require("../configs/verify");
const authController = require("../controllers/auth.js")

// Route Auth Admin
router.get('/loginAdmin', verify.isLogout, authController.loginAdmin)
router.get('/logoutAdmin', authController.logoutAdmin)
router.post("/authAdmin", authController.authAdmin)
// Route Auth User
router.get('/login', verify.isLogout, authController.login)
router.get('/logout', authController.logout)
router.post("/login/auth", authController.authUser)
router.get("/register", verify.isLogout, authController.register);
router.post("/register/save", authController.saveRegister)

module.exports = router