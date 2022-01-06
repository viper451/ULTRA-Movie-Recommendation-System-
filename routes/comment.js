const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");
const { auth } = require("../middleware/auth");

//saving the comments
router.post("/saveComment", auth, (req, res) => {
    const emptyMessage="NEED TO TYPE SOMETHING "
    const comment = new Comment(req.body)
    console.log("COMMENT"+comment)
    if(comment.content!=''){
    comment.save((err, comment) => {
        // console.log(err)
        if (err) return res.json({ success: false, err })

        Comment.find({ '_id': comment._id })
            .populate('writer')
            .exec((err, result) => {
                if (err) return res.json({ success: false, err })
                return res.status(200).json({ success: true, result })
            })
    })
}
else{
    return res.json({ success: false, emptyMessage})
}
})

router.post("/getComments", (req, res) => {

    Comment.find({ "postId": req.body.movieId })
        .populate('writer')
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, comments })
        })
});


router.post("/numComments", (req, res) => {
    // console.log(req.body)
    Comment.find({ 'writer': req.body.userFrom })
        .exec((err, comments) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true,comments })
        })
});





module.exports = router;