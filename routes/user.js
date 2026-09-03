const express = require("express");
const router = express.Router();
const wrapAsync = require("../utilities/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");

const userController = require("../controllers/users.js");


// 1.Signup Page, 2.Signup Process: 
router
.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signup));

// 1.Login Page, 2.Login Process:
router
.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl,
passport.authenticate("local", {
    failureRedirect: "/login", 
    failureFlash: true
}),
userController.login
);  

// 1.Logout Process :
router.get("/logout", userController.logout);

module.exports = router;

