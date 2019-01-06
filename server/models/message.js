const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    text: String,
    owner: Object,
    roomId: String
});

module.exports = mongoose.model('Message', messageSchema);