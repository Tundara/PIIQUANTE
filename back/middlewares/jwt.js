const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const verif = jwt.verify(token, process.env.JWT)
    if (req.body.userId && req.body.userId != verif.userId){
        res.status(401).json({message: "JWT Failed"});
    } else {
        next();
        res.status(200);
    }
}