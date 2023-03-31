const express = require("express")
const route = express.Router();
const sauces = require("../controllers/sauces")
const multerconfig = require("../middlewares/multerconfig")
const jwtmiddleware = require("../middlewares/jwt")

route.get("/", jwtmiddleware, multerconfig, sauces.getallsauces)
route.post("/", jwtmiddleware, multerconfig, sauces.insertsauce)
route.get("/:id", jwtmiddleware, multerconfig, sauces.getonesauce)
route.put("/:id", jwtmiddleware, multerconfig, sauces.modifsauce)
route.delete("/:id", jwtmiddleware, multerconfig, sauces.deletesauce)
route.post("/:id/like", jwtmiddleware, multerconfig, sauces.likesauce)

module.exports = route
