var express = require("express");
var router = express.Router();
const {getAllUsers,getUserByID,signIn,signUp,signOut,updateUser,deleteUser} = require("../controllers/user");

router.get("/getAllUsers",getAllUsers);
router.get("/getUserByID/:id",getUserByID);

router.post("/signIn",signIn);
router.post("/signUp",signUp);
router.post("/signOut",signOut);

router.put("/updateUser/:id",updateUser);

router.delete("/deleteUser/:id",deleteUser);

module.exports = router;
