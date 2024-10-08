const Project = require("../models/Project");
const Response = require("../library/Response");
const {HTTP_CODES} = require("../library/Enum");
const CustomError = require("../library/Error");
const { v4: uuidv4 } = require('uuid');

exports.createProject = async (req, res) => {
    const {name, description, members = [] } = req.body;
    try {
        const newProject = new Project(name, description,members);
        
        const projectId = await newProject.create();

        return res.status(HTTP_CODES.CREATED).json(Response.successResponse({ projectId }));
    } catch (error) {
        const errorResponse = Response.errorResponse(error);
        return res.status(errorResponse.code).json(errorResponse);
    }
};

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.getAll("projects");
        return res.status(HTTP_CODES.OK).json(Response.successResponse({ projects }));
    } catch (error) {
        const errorResponse = Response.errorResponse(error);
        return res.status(errorResponse.code).json(errorResponse);
    }
};

exports.getProjectById = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Project.getById("projects",id);
        return res.status(HTTP_CODES.OK).json(Response.successResponse({ project }));
    } catch (error) {
        const errorResponse = Response.errorResponse(error);
        return res.status(errorResponse.code).json(errorResponse);
    }
};

exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        await Project.update("projects",id, updatedData);
        return res.status(HTTP_CODES.OK).json(Response.successResponse({ message: "Project updated successfully" }));
    } catch (error) {
        const errorResponse = Response.errorResponse(error);
        return res.status(errorResponse.code).json(errorResponse);
    }
};

exports.addUserToProject = async (req, res) => {
    const { projectID, userId } = req.params;
    try {
        await Project.addUserToProject(projectID, userId);
        return res.status(HTTP_CODES.OK).json(Response.successResponse({ message: "User added to project successfully" }));
    } catch (error) {
        const errorResponse = Response.errorResponse(error);
        return res.status(errorResponse.code).json(errorResponse);
    }
};

exports.deleteUserFromProject = async (req, res) => {
    const { projectID, userId } = req.params;
    try {
        await Project.deleteUserFromProject(projectID, userId);
        return res.status(Enum.HTTP_CODES.OK).json(Response.successResponse({ message: "User removed from project successfully" }));
    } catch (error) {
        const errorResponse = Response.errorResponse(error);
        return res.status(errorResponse.code).json(errorResponse);
    }
};


exports.deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        await Project.delete("projects",id);
        return res.status(Enum.HTTP_CODES.OK).json(Response.successResponse({ message: "Project deleted successfully" }));
    } catch (error) {
        const errorResponse = Response.errorResponse(error);
        return res.status(errorResponse.code).json(errorResponse);
    }
};
