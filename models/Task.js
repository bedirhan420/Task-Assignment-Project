const BaseEntity = require("./BaseEntity");
const CustomError = require("../library/Error");
const { HTTP_CODES } = require("../library/Enum");

class Task extends BaseEntity {
    constructor(uuid, title, description,members=[], status = "pending") {
        super("tasks");
        this.uuid = uuid;
        this.title = title;
        this.description = description;
        this.status = status;
        this.members = members;
    }

    async create() {
        const data = {
            uuid: this.uuid,
            title: this.title,
            description: this.description,
            status: this.status,
            members : this.members
        };
        return super.create(data);
    }

    static async assignTaskToUser(taskId, userId) {
        try {
            const task = await super.getById(taskId);
            if (!task) {
                throw new CustomError(HTTP_CODES.NOT_FOUND, `Task with ID ${taskId} does not exist`);
            }

            task.assignedTo = userId;
            await super.update(taskId, { assignedTo: userId });

            return { message: `Task assigned to user with ID ${userId} successfully` };
        } catch (error) {
            throw new CustomError(HTTP_CODES.INT_SERVER_ERROR, "Failed to assign task", error.message);
        }
    }

    static async removeTaskFromUser(taskId,userId) {
        try {
            const task = await BaseEntity.getById("projects", projectID);
            if (!task) {
                throw new CustomError(HTTP_CODES.NOT_FOUND, `Task with ID ${taskId} does not exist`);
            }
            const updatedMembers = task.members.filter(member => member !== userId);
            await BaseEntity.update("tasks", taskId, { members: updatedMembers });

            return { message: `Task unassigned successfully` };
        } catch (error) {
            throw new CustomError(HTTP_CODES.INT_SERVER_ERROR, "Failed to unassign task", error.message);
        }
    }
}

module.exports = Task;
