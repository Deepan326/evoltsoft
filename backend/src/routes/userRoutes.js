const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  showLoginPage,
  showRegisterPage
} = require("../controllers/userController.js");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser);

userRouter.get("/register",showRegisterPage);
userRouter.get("/login",showLoginPage);


module.exports = userRouter;
