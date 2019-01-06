const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String
    },
    createdBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    memberAsist: [{
        type: Schema.Types.ObjectId,
        ref: 'Member'

    }]

});

module.exports = mongoose.model('Event', eventSchema);