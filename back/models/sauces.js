const mongoose = require("mongoose")
const Schema = mongoose.Schema

const saucesSchem = new Schema({
    userId : {type: String, required: true},
    name : {type: String, required: true},
    manufacturer : {type: String, required: true},
    description : {type: String, required: true},
    mainPepper : {type: String, required: true},
    imageUrl : {type: String, required: true},
    heat : {type: Number, required: true},
    likes : {type: Number, required: true},
    dislikes : {type: Number},
    usersLiked : {type: [String]},
    usersDisliked : {type: [String]},
})

const schem = mongoose.model('Sauces', saucesSchem);
module.exports = schem;