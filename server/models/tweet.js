var mongoose = require('mongoose');

var Tweet = mongoose.Schema({
    tweet: {
        type    : String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    love: {
        status: {
            type   : Boolean,
            default: false
        },
        total: {
            type   : Number,
            default: 0
        }
    },
    date: {
        type   : Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Tweet', Tweet);