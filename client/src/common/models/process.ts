export enum ProcessType{
    Preparing = 1,
    Started = 2,
    Ended = 3
}

export interface IProcess{
    processType:ProcessType
}