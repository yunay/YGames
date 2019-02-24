import * as React from "react"
import { DragSource } from 'react-dnd';
import { CardType } from "../../models/CardType"
import { BaseBuildingCard } from "../BaseBuildingCard"
import { getBuildingCardId, getPossibleWaysToMove } from "../BuildingCardsProvider"
import * as BuildingCards from "../building-cards"

const CardSource = {
    canDrag(props: any) {
        // You can disallow drag based on props
        return true;
    },

    isDragging(props: any, monitor: any) {
        // If your component gets unmounted while dragged
        // (like a card in Kanban board dragged between lists)
        // you can implement something like this to keep its
        // appearance dragged:
        return true;
    },

    beginDrag(props: any, monitor: any, component: any) {
        // Return the data describing the dragged item
        var cardId = getBuildingCardId(BuildingCards.TripleTunnelHTopCard)

        return {
            id: cardId,
            possibleWaysToMove: getPossibleWaysToMove(cardId)
        };
    },

    endDrag(props: any, monitor: any, component: any) {
        //if (!monitor.didDrop()) {
        //    // You can check whether the drop was successful
        //    // or if the drag ended but nobody handled the drop
        //    return;
        //}

        // When dropped on a compatible target, do something.
        // Read the original dragged item from getItem():
        const item = monitor.getItem();

        // You may also read the drop result from the drop target
        // that handled the drop, if it returned an object from
        // its drop() method.
        const dropResult = monitor.getDropResult();

        // This is a good place to call some Flux action
        //CardActions.moveCardToList(item.id, dropResult.listId);
    }
}

@DragSource<any>(CardType.BuildingCard, CardSource, (connect, monitor) => ({
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
}))
export class TripleTunnelHTopCard extends BaseBuildingCard<any, any> {
    render() {
        const { connectDragSource, isDragging } = this.props;
        return connectDragSource(
            <span style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move'
            }} className="card-h triple-tunnel-h-top"></span>
        );
    }
}
