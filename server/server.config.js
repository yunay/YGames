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
            adultControl:"8+",
            imageURL:"https://p-sf1.pcloud.com/DLZgNMmL4ZxTM0M4Zs2jBZZL1HjA7ZNVZZIWHZXZIcJZzkZZZ0CuYUYxtNauhPpEVCzBhmF4aC8Jk/th-12296370401-286x180.jpg"
        },
        {
            originalName:"tic-tac-toe",
            translatedName:"Морски шах",
            shortDescription:"Всеки я знае тази игра",
            minPlayers:2,
            maxPlayers:2,
            gameRules:"Играе се с 2 човека, които се редуват. Всеки записва своя знак (X или О) в едно от квадратчетата. Целта е да се подредят три знака хоризонтално, вертикално или по диагонал. Който успее пръв да го направи печели играта.",
            isActive:true,
            playingTime:"1 - 2 мин",
            adultControl:"4+",
            imageURL:"https://p-sf1.pcloud.com/DLZgj2mL4ZryT0M4Zs2jBZZk1HjA7Z3VZZIWHZXZY9QZ95ZZZpK3n8XaWKXSMVK8aOUGe6zP0Vszk/th-12296372006-286x180.png"
        },
    ]
}

module.exports = serverConfig;