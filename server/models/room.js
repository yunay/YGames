const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    gameId: String,
    name: String,
    ownerId: String,
    isOpen: Boolean,
    playersIds: [String]
});

module.exports = mongoose.model('Room', roomSchema);