interface Position {
    x: number,
    y:number
}

export interface GridContentRegister {
    id?:string,
    position?: Position,
    hasCard?: boolean,
    cardId?: string
}