const express = require('express');
const router = express.Router();


const { Favorite } = require("../models/Favorite");
const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");


router.post("/getLikes", (req, res) => {

    let variable = {}
    if (req.body.movieId) {
        variable = { movieId: req.body.movieId }
    } else {
        variable = { commentId: req.body.commentId }
    }

    Like.find(variable)
        .exec((err, likes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, likes })
        })


})


router.post("/getDislikes", (req, res) => {

    let variable = {}
    if (req.body.movieId) {
        variable = { movieId: req.body.movieId }
    } else {
        variable = { commentId: req.body.commentId }
    }

    Dislike.find(variable)
        .exec((err, dislikes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, dislikes })
        })

})


router.post("/upLike", (req, res) => {

    let variable = {}
    if (req.body.movieId) {
        variable = { movieId: req.body.movieId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    const like = new Like(variable)
    // save like data in MongoDB
    like.save((err, likeResult) => {
        if (err) return res.json({ success: false, err });
        // In case disLike Button is already clicked, we need to decrease the dislike by 1 
        Dislike.findOneAndDelete(variable)
            .exec((err, disLikeResult) => {
                if (err) return res.status(400).json({ success: false, err });
                res.status(200).json({ success: true })
            })
    })

})


router.post("/unLike", (req, res) => {

    let variable = {}
    if (req.body.movieId) {
        variable = { movieId: req.body.movieId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    Like.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true })
        })

})


router.post("/unDislike", (req, res) => {

    let variable = {}

    if (req.body.movieId) {
        variable = { movieId: req.body.movieId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    Dislike.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true })
        })


})



router.post("/upDislike", (req, res) => {

    let variable = {}
    if (req.body.movieId) {
        variable = { movieId: req.body.movieId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    const disLike = new Dislike(variable)
    // save the like data in MongoDB
    disLike.save((err, dislikeResult) => {
        if (err) return res.json({ success: false, err });
        // In case Like Button is already clicked, we need to decrease the like by 1 
        Like.findOneAndDelete(variable)
            .exec((err, likeResult) => {
                if (err) return res.status(400).json({ success: false, err });
                res.status(200).json({ success: true })
            })
    })


})

router.post("/numLikes", (req, res) => {
    console.log(req.body.userFrom)
    Like.find({ 'userId': req.body.userFrom })
    
        .exec((err, likes) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true,likes })
        })
});




router.post("/numDislikes", (req, res) => {
    console.log(req.body.userFrom)
    Dislike.find({ 'userId': req.body.userFrom })
        .exec((err, dislikes) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true,dislikes })
        })
});











module.exports = router;