const User = require("../models/User");
const AuthService = require("../firebase/auth/authentication");
const Response = require("../library/Response");
const {HTTP_CODES,ROLES} = require("../library/Enum");
const CustomError = require("../library/Error");

exports.signUp = async (req, res) => {
    const { email, password, name, surname, phone_number, roles } = req.body;

    const validRoles = Object.values(ROLES);
    const assignedRoles = roles.filter(role => validRoles.includes(role));

    try {
        const authService = new AuthService();
        const firebaseUser = await authService.signUp(email, password);
        const user = new User(firebaseUser.uid, email, password, name, surname, phone_number, assignedRoles);
        const userID = await user.create();
        return res.status(HTTP_CODES.CREATED).json(Response.successResponse({ userID, message: "User created successfully" }));
    } catch (error) {
        const errorResponse = Response.errorResponse(error);
        return res.status(errorResponse.code).json(errorResponse);
    }
};

exports.getAllUsers = async (req,res) => {
    try {
        const users = await User.getAll();
        return res.status(HTTP_CODES.OK).json(Response.successResponse({users}));
    } catch (error) {
        const errorResponse = Response.errorResponse(error);
        return res.status(errorResponse.code).json(errorResponse);
    }
}

exports.getUserByID = async (req,res) => {
    const {userID} = req.params;
    try {
        const user = await User.getById(userID);
        return res.status(HTTP_CODES.OK).json(Response.successResponse({user}))
    } catch (error) {
        const errorResponse = Response.errorResponse(error);
        return res.status(errorResponse.code).json(errorResponse);
    }
}

exports.updateUser = async (req,res) => {
    const {userID} = req.params;
    const updatedData = req.body;
    
    try {
        await User.update(userID,updatedData);
        return res.status(HTTP_CODES.CREATED).json(Response.successResponse({userID,message:"User updated succesfully"}));
    } catch (error) {
        const errorResponse = Response.errorResponse(error);
        return res.status(errorResponse.code).json(errorResponse);
    }
}

exports.deleteUser = async (req,res) => {
    const {userID} = req.params;

    try {
        await User.delete(userID);
        return res.status(HTTP_CODES.CREATED).json(Response.successResponse({userID,message:"User deleted succesfully"}));
    } catch (error) {
        const errorResponse = Response.errorResponse(error);
        return res.status(errorResponse.code).json(errorResponse);
    }
}

exports.signIn = async (req,res) => {
    const {email,password} = req.params;

    try {
        const authService = new AuthService();
        const user = authService.signIn(email,password);
        return res.status(HTTP_CODES.CREATED).json(Response.successResponse({user,message:"User signed in succesfully"}));
    } catch (error) {
        const errorResponse = Response.errorResponse(error);
        return res.status(errorResponse.code).json(errorResponse);
    }
}

exports.signOut = async (req,res) => {
    try {
        const authService = new AuthService();
        await authService.signOut();
        return res.status(HTTP_CODES.CREATED).json(Response.successResponse({message:"User signed out succesfully"}));
    } catch (error) {
        const errorResponse = Response.errorResponse(error);
        return res.status(errorResponse.code).json(errorResponse);
    }
}