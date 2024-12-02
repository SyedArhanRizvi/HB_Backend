import express from "express";
import { userAccountDeleteHandler, userAuthController, userLoginController, userLogoutHandler, userNewAccountController, userUpdateAccountHandler } from "../Controllers/user.Account.Controller.js";
import  userAuthChecker  from "../Middlewares/user.Auth.Midd.js";
import { singleUpload } from "../Middlewares/single.multer.js";

const userRoutes = express.Router();

// When New Account will Create, so this function will work ::
userRoutes.post("/create-new-userAccount", userNewAccountController);

// When user Signup their account ::
userRoutes.post("/login-userAccount",  userLoginController);

// When user wants to logout, so this function will work ::
userRoutes.post("/logout-user-Account:id", userLogoutHandler);

// When user will update there details so this function will work ::
userRoutes.put("/update-prev-userAccount:id", singleUpload.single("userProfile"), userUpdateAccountHandler);

// When user delete their account so this function will work ::
userRoutes.post("/delete-user-Account", userAccountDeleteHandler);

// Check user is admin or Not ::
userRoutes.post("/user-auth-checker", userAuthChecker, userAuthController);


export default userRoutes;