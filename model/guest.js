const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const guestSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tel: {
        type: String
    },
    email: {
        type: String
    },
    bdate: {
        type: Date,
        default: null
    },
    gender: {
        type: String
    },
    invitedBy: {
        type: String
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Guest', guestSchema);