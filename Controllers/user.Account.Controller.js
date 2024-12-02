import { DUser } from "../Models/User.Schema.js";
import tokenGenerator from "../Utils/jwt.user.Token.js";
import bcryptHashedPassword from "../Utils/password.Hashed.js";
import bcrypt from "bcrypt";
import {singlePhotoUploadOnCloud} from "../Utils/signle.cloudinary.upload.js"
export const userNewAccountController = async (req, res)=>{
    let {fullName, email, password, number, userType} = req.body;
    try {
        const hashedPassword = await bcryptHashedPassword(password);
        password = hashedPassword;
        const createdUser = await DUser.create({fullName, email, password, number, userType});
        return res.status(201).json({message:"Account Created Successfully", createdUser});
    } catch (error) {
        console.log("There is some errors in your user new account controller plz fix the bug first ", error);
        return res.status(500).json({message:"There is some errors in your user new account controller plz fix the bug first ", error});
    }
}
export const userLoginController = async (req, res)=>{
    const {email, password} = req.body;
    console.log(email);
    
    try {
        const validUser = await DUser.findOne({email});
        console.log(validUser);
        
        if(!validUser) {
            // console.log("Invalid Email");
            
            return res.status(400).json({message:"Invalid Email"});
        }
        console.log(validUser);
        
        console.log(validUser.password);
        
        const userPass = await bcrypt.compare(password, validUser.password);
        if(!userPass) {
            return res.status(400).json({message:"Invalid Password"});
        }
        const userToken = await tokenGenerator(validUser);
        console.log("This is user token ", userToken);
        
        return res.status(200).cookie("auth_token", userToken, {maxAge:604800000}).json({message:"User Found Successfully ", user: validUser});
    } catch (error) {
        console.log("There is some errors in your user login controller plz fix the bug first ", error);
        return res.status(500).json({message:"There is some errors in your user login controller plz fix the bug first ", error});
    }
}
export const userLogoutHandler = async (req, res)=>{
    const id = req.params.id;
    try {
        const user = await DUser.findById(id);
        return res.status(200).clearCookie("auth_token").json({message:"User Logout successfully"});
    } catch (error) {
        console.log("There is some errors in your user logout controller plz fix the bug first ", error);
        return res.status(500).json({message:"There is some errors in your user logout controller plz fix the bug first ", error});
    }
}
export const userUpdateAccountHandler = async (req, res)=>{
    let {fullName, email, number} = req.body;
    const id = req.params.id;
    const file = req.file ? req.file.path : null;
    try {
        const photoImg = await singlePhotoUploadOnCloud(file);
        const updatedUser = await DUser.findByIdAndUpdate(id, {fullName, email, number, userProfile:photoImg});
        return res.status(201).json({message:"User Details Updated Successfully ", user:updatedUser});
    } catch (error) {
        console.log("There is some errors in your user update account controller plz fix the bug first ", error);
        return res.status(500).json({message:"There is some errors in your user update account controller plz fix the bug first ", error});
    }
}
export const userAccountDeleteHandler = async (req, res)=>{
    const {email, password} = req.body;
    console.log(email, password);
    
    try {
        const validUser = await DUser.findOne({email});
        console.log(validUser);
        
        if(!validUser) {
            return res.status(400).json({message:"Invalid Email"});
        }
        
        const userPass = await bcrypt.compare(password, validUser.password);
        if(!userPass) {
            return res.status(400).json({message:"Invalid Password"});
        }
        const deletedUser = await DUser.findByIdAndDelete(validUser._id);
        return res.status(200).clearCookie("auth_token").json({message:"User Account Deleted Successfully"});
    } catch (error) {
        console.log("There is some errors in your user delete account controller plz fix the bug first ", error);
        return res.status(500).json({message:"There is some errors in your user delete account controller plz fix the bug first ", error});
    }
}
export const userAuthController = async (req, res)=>{
    const loggedInUser = req.user;
    try {
       return res.status(200).json({message:"User have already logged in ", loggedInUser});
    } catch (error) {
        console.log("There is some errors in your user auth checker controller plz fix the bug first ", error);
        return res.status(500).json({message:"There is some errors in your user auth checker controller plz fix the bug first ", error});
    }
}
