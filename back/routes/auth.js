const express = require("express");
const route = express.Router();

const users = require("../controllers/users")

route.post("/signup", users.signup)
route.post("/login", users.login)
module.exports = route