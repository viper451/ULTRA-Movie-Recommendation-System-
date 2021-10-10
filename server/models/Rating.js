const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ratingSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    rating: {
        type: Number,
    },
    postId: {
        type: String,
    },
    moviename: {
        type: String,
    },
})

const Rating = mongoose.model('Rating', ratingSchema)

module.exports = { Rating }