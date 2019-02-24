const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const processSchema = new Schema({
    id:String,
    processStatus: Number,
    owner: Object,
    roomId:String,
    players: [Object],
    processContent: String
});

module.exports = mongoose.model('Process', processSchema);