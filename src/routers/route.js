const express = require("express");
const router = express.Router();
const { authenticationMid, authorizationMid } = require("../middleware/auth");

//////////////////////////~Import folder~////////////////////////
const {
  createUser,
  userLogin,
  getUsers,
  userUpdate,
  deleteUser,
} = require("../controller/userController");

/////////////////////////~Router besed Api~//////////////////////
router.get("/test-me", function (req, res) {
  res.send("My first ever api!");
});

/////////////////////~User Apis~//////////////////////////
router.post("/register", createUser);
router.post("/login", userLogin);
router.get("/users", authenticationMid, getUsers);
router.put(
  "/updateUser/:userId",
  authenticationMid,
  authorizationMid,
  userUpdate
);
router.delete(
  "/deleteUser/:userId",
  authenticationMid,
  authorizationMid,
  deleteUser
);

/////////////////////////~exports Modules~/////////////////////////////
module.exports = router;
