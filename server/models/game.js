const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    id:String,
    originalName: String,
    translatedName: String,
    shortDescription: String,
    minPlayers: Number,
    maxPlayers: Number,
    gameRules: String,
    isActive: Boolean,
    playingTime: String,
    adultControl: String,
    imageURL: String,
});

module.exports = mongoose.model('Game', gameSchema);