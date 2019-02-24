import * as React from "react"
import { IBaseBuildingCard } from "./BaseBuildingCard"
import * as BuildingCards from "./building-cards"
import { PossibleWaysToMove } from "../models/enums/PossibleWaysToMove";

export function getBuldingCard(cardId: string, x: number, y: number) {
    switch (cardId) {
        case "0": return <BuildingCards.StartCard x={x} y={y} />;
        case "1": return <BuildingCards.AngleLeftBottomCard x={x} y={y} />;
        case "2": return <BuildingCards.AngleLeftTopCard x={x} y={y} />;
        case "3": return <BuildingCards.AngleRightBottomCard x={x} y={y} />;
        case "4": return <BuildingCards.AngleRightTopCard x={x} y={y} />;
        case "5": return <BuildingCards.CrossTunnelCard x={x} y={y} />;
        case "6": return <BuildingCards.EndTunnelBottomCard x={x} y={y} />;
        case "7": return <BuildingCards.EndTunnelBottomLeftCard x={x} y={y} />;
        case "8": return <BuildingCards.EndTunnelBottomRightCard x={x} y={y} />;
        case "9": return <BuildingCards.EndTunnelLeftRightCard x={x} y={y} />;
        case "10": return <BuildingCards.EndTunnelLeftV1Card x={x} y={y} />;
        case "11": return <BuildingCards.EndTunnelQuadrupleCard x={x} y={y} />;
        case "12": return <BuildingCards.EndTunnelRightV1Card x={x} y={y} />;
        case "13": return <BuildingCards.EndTunnelTopBottomCard x={x} y={y} />;
        case "14": return <BuildingCards.EndTunnelTopCard x={x} y={y} />;
        case "15": return <BuildingCards.EndTunnelTopLeftCard x={x} y={y} />;
        case "16": return <BuildingCards.EndTunnelTopRightCard x={x} y={y} />;
        case "17": return <BuildingCards.EndTunnelTripleBottomCard x={x} y={y} />;
        case "18": return <BuildingCards.EndTunnelTripleLeftCard x={x} y={y} />;
        case "19": return <BuildingCards.EndTunnelTripleRightCard x={x} y={y} />;
        case "20": return <BuildingCards.EndTunnelTripleTopCard x={x} y={y} />;
        case "21": return <BuildingCards.FakeGoldLeftCard x={x} y={y} />;
        case "22": return <BuildingCards.FakeGoldRightCard x={x} y={y} />;
        case "23": return <BuildingCards.GoldCard x={x} y={y} />;
        case "24": return <BuildingCards.HorizontalTunnelCard x={x} y={y} />;
        case "25": return <BuildingCards.TripleTunnelHBottomCard x={x} y={y} />;
        case "26": return <BuildingCards.TripleTunnelHTopCard x={x} y={y} />;
        case "27": return <BuildingCards.TripleTunnelVLeftCard x={x} y={y} />;
        case "28": return <BuildingCards.TripleTunnelVRightCard x={x} y={y} />;
        case "29": return <BuildingCards.VerticalTunnelCard x={x} y={y} />;

        default: throw Error("Card doesnt exist!");
    }
}

export function getPossibleWaysToMove(cardId: string): PossibleWaysToMove[] {
    switch (cardId) {
        case "0": return [PossibleWaysToMove.Top, PossibleWaysToMove.Right, PossibleWaysToMove.Bottom, PossibleWaysToMove.Left];
        case "1": return [PossibleWaysToMove.Left, PossibleWaysToMove.Bottom];
        case "2": return [PossibleWaysToMove.Left, PossibleWaysToMove.Top];
        case "3": return [PossibleWaysToMove.Right, PossibleWaysToMove.Bottom];
        case "4": return [PossibleWaysToMove.Right, PossibleWaysToMove.Top];
        case "5": return [PossibleWaysToMove.Left, PossibleWaysToMove.Bottom, PossibleWaysToMove.Right, PossibleWaysToMove.Top];
        case "6": return [PossibleWaysToMove.Bottom];
        case "7": return [PossibleWaysToMove.Bottom, PossibleWaysToMove.Left];
        case "8": return [PossibleWaysToMove.Right, PossibleWaysToMove.Bottom];
        case "9": return [PossibleWaysToMove.Left, PossibleWaysToMove.Right];
        case "10": return [PossibleWaysToMove.Left];
        case "11": return [PossibleWaysToMove.Top, PossibleWaysToMove.Right, PossibleWaysToMove.Bottom, PossibleWaysToMove.Left];
        case "12": return [PossibleWaysToMove.Right];
        case "13": return [PossibleWaysToMove.Top, PossibleWaysToMove.Bottom];
        case "14": return [PossibleWaysToMove.Top];
        case "15": return [PossibleWaysToMove.Left, PossibleWaysToMove.Top];
        case "16": return [PossibleWaysToMove.Top, PossibleWaysToMove.Right];
        case "17": return [PossibleWaysToMove.Left, PossibleWaysToMove.Bottom, PossibleWaysToMove.Right];
        case "18": return [PossibleWaysToMove.Left, PossibleWaysToMove.Bottom, PossibleWaysToMove.Top];
        case "19": return [PossibleWaysToMove.Top, PossibleWaysToMove.Bottom, PossibleWaysToMove.Right];
        case "20": return [PossibleWaysToMove.Left, PossibleWaysToMove.Top, PossibleWaysToMove.Right];
        case "21": return [PossibleWaysToMove.Left, PossibleWaysToMove.Bottom];
        case "22": return [PossibleWaysToMove.Right, PossibleWaysToMove.Bottom];
        case "23": return [PossibleWaysToMove.Left, PossibleWaysToMove.Bottom, PossibleWaysToMove.Right];
        case "24": return [PossibleWaysToMove.Left, PossibleWaysToMove.Right];
        case "25": return [PossibleWaysToMove.Top, PossibleWaysToMove.Left, PossibleWaysToMove.Bottom, PossibleWaysToMove.Right];
        case "26": return [PossibleWaysToMove.Left, PossibleWaysToMove.Bottom, PossibleWaysToMove.Right];
        case "27": return [PossibleWaysToMove.Left, PossibleWaysToMove.Bottom, PossibleWaysToMove.Top];
        case "28": return [PossibleWaysToMove.Top, PossibleWaysToMove.Bottom, PossibleWaysToMove.Right];
        case "29": return [PossibleWaysToMove.Top, PossibleWaysToMove.Bottom];

        default: throw Error("Card doesnt exist!");
    }
}

export function getBuildingCardId(buildingCard: any): string {
    switch (buildingCard) {
        case BuildingCards.StartCard: return "0";
        case BuildingCards.AngleLeftBottomCard: return "1";
        case BuildingCards.AngleLeftTopCard: return "2";
        case BuildingCards.AngleRightBottomCard: return "3";
        case BuildingCards.AngleRightTopCard: return "4";
        case BuildingCards.CrossTunnelCard: return "5";
        case BuildingCards.EndTunnelBottomCard: return "6";
        case BuildingCards.EndTunnelBottomLeftCard: return "7";
        case BuildingCards.EndTunnelBottomRightCard: return "8";
        case BuildingCards.EndTunnelLeftRightCard: return "9";
        case BuildingCards.EndTunnelLeftV1Card: return "10";
        case BuildingCards.EndTunnelQuadrupleCard: return "11";
        case BuildingCards.EndTunnelRightV1Card: return "12";
        case BuildingCards.EndTunnelTopBottomCard: return "13";
        case BuildingCards.EndTunnelTopCard: return "14";
        case BuildingCards.EndTunnelTopLeftCard: return "15";
        case BuildingCards.EndTunnelTopRightCard: return "16";
        case BuildingCards.EndTunnelTripleBottomCard: return "17";
        case BuildingCards.EndTunnelTripleLeftCard: return "18";
        case BuildingCards.EndTunnelTripleRightCard: return "19";
        case BuildingCards.EndTunnelTripleTopCard: return "20";
        case BuildingCards.FakeGoldLeftCard: return "21";
        case BuildingCards.FakeGoldRightCard: return "22";
        case BuildingCards.GoldCard: return "23";
        case BuildingCards.HorizontalTunnelCard: return "24";
        case BuildingCards.TripleTunnelHBottomCard: return "25";
        case BuildingCards.TripleTunnelHTopCard: return "26";
        case BuildingCards.TripleTunnelVLeftCard: return "27";
        case BuildingCards.TripleTunnelVRightCard: return "28";
        case BuildingCards.VerticalTunnelCard: return "29";

        default: throw Error("Card doesnt exist!");
    }
}