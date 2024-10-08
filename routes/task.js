const express = require("express");
const {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    assignTaskToUser,
    removeTaskFromUser,
} = require("../controllers/task");

const authenticate = require("../middlewares/authenticationMiddleware");
const checkRole = require("../middlewares/rolesMiddleware");

const {ROLES} = require("../library/Enum");

const router = express.Router();

router.use(authenticate);

router.post("/add", checkRole([ROLES.ADMIN,ROLES.MANAGER]), createTask);

router.get("/getAll", checkRole([ROLES.ADMIN,ROLES.MANAGER,ROLES.MEMBER]), getAllTasks);
router.get("/getById/:id",checkRole([ROLES.ADMIN,ROLES.MANAGER,ROLES.MEMBER]),getTaskById)

router.put("/update/:id", checkRole([ROLES.ADMIN,ROLES.MANAGER]), updateTask);
router.delete("/delete/:id", checkRole([ROLES.ADMIN,ROLES.MANAGER]), deleteTask);

router.post("/assignTaskToUser/:projectID/:userId", checkRole([ROLES.ADMIN]), assignTaskToUser);
router.delete("/removeTaskFromUser/:projectID:userId", checkRole([ROLES.ADMIN]), removeTaskFromUser);

module.exports = router;
