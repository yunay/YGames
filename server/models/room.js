const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    id:String,
    gameId: String,
    name: String,
    owner: Object,
    isOpen: Boolean,
    players: [Object]
});

module.exports = mongoose.model('Room', roomSchema);