const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id:String,
    name: String,
    avatar:String,
    password: String,
    gameLobby: String,
    isPlaying: Boolean,
    isOnline: Boolean,
});

module.exports = mongoose.model('User', userSchema);