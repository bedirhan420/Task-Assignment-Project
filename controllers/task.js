const Task = require("../models/Task");
const Response = require("../library/Response");
const {HTTP_CODES} = require("../library/Enum");
const CustomError = require("../library/Error");

exports.createTask = async (req, res) => {
    const { uuid, title, description, members = [],status } = req.body;
    try {
        const newTask = new Task(uuid,title, description,members,status);
        
        const taskId = await newTask.create();

        return res.status(HTTP_CODES.CREATED).json(Response.successResponse({ taskId }));
    } catch (error) {
        const errorResponse = Response.errorResponse(error);
        return res.status(errorResponse.code).json(errorResponse);
    }
};

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.getAll("tasks");
        return res.status(HTTP_CODES.OK).json(Response.successResponse({ tasks }));
    } catch (error) {
        const errorResponse = Response.errorResponse(error);
        return res.status(errorResponse.code).json(errorResponse);
    }
};

exports.getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Project.getById("tasks",id);
        return res.status(HTTP_CODES.OK).json(Response.successResponse({ task }));
    } catch (error) {
        const errorResponse = Response.errorResponse(error);
        return res.status(errorResponse.code).json(errorResponse);
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        await Project.update("tasks",id, updatedData);
        return res.status(HTTP_CODES.OK).json(Response.successResponse({ message: "Task updated successfully" }));
    } catch (error) {
        const errorResponse = Response.errorResponse(error);
        return res.status(errorResponse.code).json(errorResponse);
    }
};

exports.assignTaskToUser= async (req, res) => {
    const { taskID, userId } = req.params;
    try {
        await Task.assignTaskToUser(taskID, userId);
        return res.status(HTTP_CODES.OK).json(Response.successResponse({ message: "Task assigned to user successfully" }));
    } catch (error) {
        const errorResponse = Response.errorResponse(error);
        return res.status(errorResponse.code).json(errorResponse);
    }
};

exports.removeTaskFromUser= async (req, res) => {
    const { taskID, userId } = req.params;
    try {
        await Task.removeTaskFromUser(taskID, userId);
        return res.status(HTTP_CODES.OK).json(Response.successResponse({ message: "Task removed from user successfully" }));
    } catch (error) {
        const errorResponse = Response.errorResponse(error);
        return res.status(errorResponse.code).json(errorResponse);
    }
};


exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await Task.delete("tasks",id);
        return res.status(HTTP_CODES.OK).json(Response.successResponse({ message: "Task deleted successfully" }));
    } catch (error) {
        const errorResponse = Response.errorResponse(error);
        return res.status(errorResponse.code).json(errorResponse);
    }
};
