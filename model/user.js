const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true

    },
    createdMembers: [{
        type: Schema.Types.ObjectId,
        ref: 'Member'
    }],
    createdEvents: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }]
});

module.exports = mongoose.model('User', userSchema);