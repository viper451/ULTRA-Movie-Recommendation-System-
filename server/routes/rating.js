const express = require('express')
const router = express.Router()
const { Rating } = require('../models/Rating')
const { auth } = require("../middleware/auth");

//saving the rating
router.post("/user_rating", auth, (req, res) => {
    const rating = new Rating(req.body)
    rating.save((err, rating) => {
        console.log(err)
        if (err) return res.json({ success: false, err })

        Rating.find({ '_id': rating._id })
            .populate('writer')
            .exec((err, result) => {
                if (err) return res.json({ success: false, err })
                return res.status(200).json({ success: true, result })
            })
    })
})

//get rating
router.get("/user_rating", auth, async (req, res) => {
    try {
        const rating = await Rating.find({ user: req.body.id, postId: req.body.postId })
        console.log(rating)
        if(!rating){
            return res.status(400).json({ msg: 'There is no rating for this movie' })
        }
        res.json(rating)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router;
