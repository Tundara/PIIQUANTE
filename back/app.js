const express = require('express');
const app = express();
const routesSauce = require("./routes/sauce")
const routesAuth = require("./routes/auth")
const jwtmiddleware = require("./middlewares/jwt")
const mongoose = require("mongoose");
const multer = require('multer');
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect('mongodb://localhost:27017/piiquante', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connexion à la base de données réussie');
}).catch((error) => {
  console.error('Erreur de connexion à la base de données : ', error);
});

app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//app.use(jwtmiddleware.verifyToken)
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/sauces", routesSauce)
app.use("/api/auth", routesAuth)

module.exports = app