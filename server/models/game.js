const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    originalName: String,
    translatedName: String,
    shortDescription: String,
    minPlayers: Number,
    maxPlayers: Number,
    gameRules: String,
    isActive: Boolean
});

module.exports = mongoose.model('Game', gameSchema);