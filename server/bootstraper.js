const Game = require('./models/game');
const serverConfig = require('./server.config');

const addGames = () => {
    Game.deleteMany({},()=>{

        for (var i = 0; i < serverConfig.games.length; i++) {
            var game = new Game();
            game.id = +new Date()+"_"+serverConfig.games[i].originalName;
            game.originalName = serverConfig.games[i].originalName;
            game.translatedName = serverConfig.games[i].translatedName;
            game.shortDescription = serverConfig.games[i].shortDescription;
            game.minPlayers = serverConfig.games[i].minPlayers;
            game.maxPlayers = serverConfig.games[i].maxPlayers;
            game.gameRules = serverConfig.games[i].gameRules;
            game.isActive = serverConfig.games[i].isActive;
            game.playingTime = serverConfig.games[i].playingTime;
            game.adultControl = serverConfig.games[i].adultControl;
  
            game.save();
        }
    });
};

const run = () => {
    //addGames();
};

module.exports = {
    run
}