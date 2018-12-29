const Game = require('./models/game');
const serverConfig = require('./server.config');

const addGames = () => {
    Game.deleteMany({},()=>{

        for (var i = 0; i < serverConfig.games.length; i++) {
            var game = new Game();
    
            game.originalName = serverConfig.games[i].originalName;
            game.translatedName = serverConfig.games[i].translatedName;
            game.shortDescription = serverConfig.games[i].shortDescription;
            game.minPlayers = serverConfig.games[i].minPlayers;
            game.maxPlayers = serverConfig.games[i].maxPlayers;
            game.gameRules = serverConfig.games[i].gameRules;
            game.isActive = serverConfig.games[i].isActive;
    
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