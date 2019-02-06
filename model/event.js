const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    cordinator: {
        type: String,
    },
    description: {
        type: String
    },
    staffAuv: [{
        type: String,
    }],
    staffMav: [{
        type: String,
    }],
    staffProto: [{
        type: String,
    }],
    staffDarte: [{
        type: String,
    }],
    staffEci: [{
        type: String,
    }],
    staffVar: [{
        type: String,
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    memberAsist: [{
        type: Schema.Types.ObjectId,
        ref: 'Member'

    }],
    guests: [{
        type: Schema.Types.ObjectId,
        ref: 'Guest'

    }],
    active: {
        type: Boolean,
        required: true,
        default: false
    }


}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);