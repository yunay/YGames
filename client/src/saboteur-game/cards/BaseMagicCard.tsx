import * as React from "react"
import { BaseCard } from "./BaseCard"

interface BaseMagicCardProps{

}

export class BaseMagicCard extends BaseCard<BaseMagicCardProps, any> {
    render() {
        return (
            <div></div>
        );
    }
}
