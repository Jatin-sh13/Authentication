const mongoose = require('mongoose')
const userdetailschema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    username: {
        type: String,
        required: true
    },
    mobilenumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model('USERDETAIL', userdetailschema)