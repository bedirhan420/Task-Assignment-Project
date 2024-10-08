const BaseEntity = require("./BaseEntity");

class Project extends BaseEntity {
    constructor(name, description, members = []) {
        super("projects");
        this.name = name;
        this.description = description;
        this.members = members;
        this.isFinished = false;
    }

    async create() {
        const data = {
            name: this.name,
            description: this.description,
            members: Array.isArray(this.members) ? this.members : [], 
            isFinished: this.isFinished !== undefined ? this.isFinished : false 
        };
        return super.create(data);
    }
    

    static async addUserToProject(projectID, userId) {
        const project = await BaseEntity.getById("projects", projectID);
        const updatedMembers = [...project.members, userId];
        await BaseEntity.update("projects", projectID, { members: updatedMembers });
    }

    static async deleteUserFromProject(projectID, userId) {
        const project = await BaseEntity.getById("projects", projectID);
        const updatedMembers = project.members.filter(member => member !== userId);
        await BaseEntity.update("projects", projectID, { members: updatedMembers });
    }
}

module.exports = Project;
