const { createUser, getusers, getuserByuserId, updateUsers, deleteUser, login } = require("./user.controller");
const router = require("express").Router();
const { checktoken } = require("../../auth/token_validation")
router.post("/", checktoken, createUser);
router.get("/", checktoken, getusers);
router.get("/:id", checktoken, getuserByuserId);
router.patch("/", checktoken, updateUsers);
router.delete("/", checktoken, deleteUser);
router.post("/login", login)


module.exports = router;