const userSchem = require("../models/users");
const validator = require("email-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = (req, res, next) => {
    const valid = validator.validate(req.body.email)
    console.log(valid)
    if (valid) {
        bcrypt.hash(req.body.password, 10)
        .then((d) => {
            const newUser = new userSchem({
                email: req.body.email,
                password: d,
            })
        
            newUser.save()
            res.status(201).json({message: "Created !"})
        })
        .catch(()=>{
            res.status(401).json({message: "Failed"})
        })
    } else {
        res.status(401).json({message: "Format de l'email incorrect"})
    }
}

exports.login = (req, res, next) => {
    const valid = validator.validate(req.body.email)
    if (valid) {
       userSchem.findOne({email: req.body.email})
        .then((data) => {
            if(data) {
                bcrypt.compare(req.body.password, data.password)
                .then((d) => {
                    console.log(d)
                    if (d) {
                        token = jwt.sign({userId: data._id}, process.env.JWT, {expiresIn: "1d"})
                        res.status(200).json({userId: data._id, token: token});
                    } else {
                        res.status(401).json({message: "Mot de passe incorrect"})
                    }
                    
                }).catch((e) => {
                    res.status(401).json({message: "Failed : "+e})
                })
            } else {
                res.status(401).json({message: "Aucun utilisateur trouvé"})
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
}