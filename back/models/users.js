const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchem = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
})

const schem = mongoose.model('User', userSchem);
module.exports = schem;