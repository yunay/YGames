const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    text: String,
    owner: String
});

module.exports = mongoose.model('Message', messageSchema);