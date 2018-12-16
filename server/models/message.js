const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    text: String,
    ownerName: String,
    ownerId: String
});

module.exports = mongoose.model('Message', messageSchema);