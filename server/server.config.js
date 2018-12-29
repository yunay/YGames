const serverConfig = {
    connectionString: 'mongodb://yunay:asd123456@ds261253.mlab.com:61253/ygames',
    secret:'ortemcv11mk12mn4n6nuj7pp11p',
    games:[
        {
            originalName:"saboteur",
            translatedName:"Саботьор",
            shortDescription:"Забавна игра с карти",
            minPlayers:3,
            maxPlayers:5,
            gameRules:"Правила на играта",
            isActive:true
        } 
    ]
}

module.exports = serverConfig;