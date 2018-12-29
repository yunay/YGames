const serverConfig = {
    connectionString: 'mongodb://yunay:asd123456@ds261253.mlab.com:61253/ygames',
    secret:'ortemcv11mk12mn4n6nuj7pp11p',
    games:[
        {
            originalName:"saboteur",
            translatedName:"Саботьор",
            shortDescription:"Забавна игра с карти",
            minPlayers:3,
            maxPlayers:10,
            gameRules:"Саботьор е картова игра, в която играчите поемат ролята на джуджета, копаещи злато в мина. Внезапно свистяща кирка счупва миньорският фенер и джуджетата остават на тъмно. Саботьорът нанесе своя удaр! Но кои миньори са саботьори?Дали миньорите ще намерят златото или злодеите ще се смеят последни? Отборът, който намери златото печели.",
            isActive:true,
            playingTime:"15 - 30 мин",
            adultControl:"8+"
        } 
    ]
}

module.exports = serverConfig;