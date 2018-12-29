const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id:String,
    name: String,
    password: String,
    gameLobby: String,
    isPlaying: Boolean
});

module.exports = mongoose.model('User', userSchema);