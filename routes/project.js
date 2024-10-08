const express = require("express");
const {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
    addUserToProject,
    deleteUserFromProject,
} = require("../controllers/project");

const authenticate = require("../middlewares/authenticationMiddleware");
const checkRole = require("../middlewares/rolesMiddleware");

const {ROLES} = require("../library/Enum");

const router = express.Router();

router.use(authenticate);

router.post("/add", checkRole([ROLES.ADMIN,ROLES.MANAGER]),createProject);

router.get("/getAll", checkRole([ROLES.ADMIN,ROLES.MANAGER,ROLES.MEMBER]), getAllProjects);
router.get("/getById/:id",checkRole([ROLES.ADMIN,ROLES.MANAGER,ROLES.MEMBER]),getProjectById)

router.put("/update/:id", checkRole([ROLES.ADMIN,ROLES.MANAGER]), updateProject);
router.delete("/delete/:id", checkRole([ROLES.ADMIN,ROLES.MANAGER]), deleteProject);

router.post("/addUserToProject/:projectID/:userId", checkRole([ROLES.ADMIN]),addUserToProject);
router.delete("/deleteUserFromProject/:projectID:userId", checkRole([ROLES.ADMIN]), deleteUserFromProject);

module.exports = router;
