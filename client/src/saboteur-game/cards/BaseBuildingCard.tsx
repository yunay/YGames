import { BaseCard } from "./BaseCard"

export interface IBaseBuildingCard{
    x?: number;
    y?: number;
}

export abstract class BaseBuildingCard<TProps extends IBaseBuildingCard, TModel> extends BaseCard<TProps, TModel> {
  
}