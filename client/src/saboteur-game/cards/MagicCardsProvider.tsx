import * as React from "react"
import * as MagicCards from "./magic-cards"

export function MagicCardsFactory(cardId: string) {

    switch (cardId) {
        case "0": return <MagicCards.CartLockCard  />;
        default: return <MagicCards.CartLockCard />;
    }
}