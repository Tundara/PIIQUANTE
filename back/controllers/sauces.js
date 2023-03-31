const saucesModel = require("../models/sauces")

exports.getallsauces = (req, res, next) => {
    saucesModel.find().then((data) => {
        res.status(201).json(data)
    }).catch((e) => {
        res.status(401).json(e)
    })
}

exports.deletesauce = (req, res, next) => {
    saucesModel.findOne({_id: req.params.id})
    .then((d) => {
        d.deleteOne()
        res.status(201).json({message: "Deleted !"})
    })
    .catch((d) => {
        res.status(401).json({message: "Failed ! "+d})
    })
}

exports.likesauce = (req, res, next) => {
    console.log(req.body)
    if(req.body.like == 1) {
        saucesModel.updateOne({_id: req.params.id}, {$inc: {likes: req.body.like}, $push: {usersLiked: req.body.userId}})
        .then((d) => {
            res.status(201).json({message: "Liked"})
        })
        .catch((d) => {
            res.status(401).json({message: "Not Liked"})
        })
    } else if(req.body.like == -1) {
        saucesModel.updateOne({_id: req.params.id}, {$inc: {dislikes: +1}, $push: {usersDisliked: req.body.userId}})
        .then((d) => {
            res.status(201).json({message: "Disliked"})
        })
        .catch((d) => {
            res.status(401).json({message: "Not Disliked"})
        })
    } else {
        saucesModel.findOne({_id: req.params.id}).then((d) => {
            if (d.usersDisliked.includes(req.body.userId)) {
                saucesModel.updateOne({_id: req.params.id}, {$inc: {dislikes: -1}, $pull: {usersDisliked: req.body.userId}})
                .then((d) => {
                    res.status(201).json({message: "Dislike Removed"})
                })
                .catch((d) => {
                    res.status(401).json({message: "Failed"})
                })
            } else if(d.usersLiked.includes(req.body.userId)) {
                saucesModel.updateOne({_id: req.params.id}, {$inc: {likes: -1}, $pull: {usersLiked: req.body.userId}})
                .then((d) => {
                    res.status(201).json({message: "Like Removed"})
                })
                .catch((d) => {
                    res.status(401).json({message: "Failed"})
                })
            }
        })
    }
}

exports.modifsauce = (req, res, next) => {
    saucesModel.findOne({_id: req.params.id})
    .then((d) => {
        console.log(d)
        if (req.body.sauce) {
            var newmodel = {
                ...JSON.parse(req.body.sauce),
                imageUrl: req.protocol+"://"+req.get("host")+"/images/"+req.file.filename,
            }
        } else {
            var newmodel = {
                ...req.body,
            }
        }
        saucesModel.updateOne({_id: req.params.id}, {...newmodel, _id: req.params.id})
        .then((d) => {
            res.status(201).json({message: "Success !"})
        })
        .catch((d) => {
            res.status(401).json({message: "Failed !"})
        })
    })
    .catch((d) => {
        console.log(d)
        res.status(401).json({message: "Failed !"})
    })
}

exports.getonesauce = (req, res, next) => {
    saucesModel.findOne({_id: req.params.id}).then((data) => {
        res.status(201).json(data)
    }).catch((e) => {
        res.status(401).json(e)
    })
}

exports.insertsauce = (req, res, next) => {
    const newSauce = new saucesModel({
        ...JSON.parse(req.body.sauce),
        heat: 0,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
        imageUrl: req.protocol+"://"+req.get("host")+"/images/"+req.file.filename,
    })

    newSauce.save()
    res.status(200).json({message: "Sauce created"})
}