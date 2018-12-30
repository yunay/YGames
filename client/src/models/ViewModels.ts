export class User{
    _id:string;
    name:string;
    isPlaying:boolean;
}

export class Room{
    id:string;
    gameId: string;
    name: string;
    ownerId: string;
    isOpen: boolean;
    playersIds: string[]
}

export class Game{
    id:string;
    originalName: string;
    translatedName: string;
    shortDescription: string;
    minPlayers: number;
    maxPlayers: number;
    gameRules: string;
    isActive: boolean;
    playingTime: string;
    adultControl: string;
}

export class Message{
    text:string;
    ownerName:string;
    ownerId:string;
}