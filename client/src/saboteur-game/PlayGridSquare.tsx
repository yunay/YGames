// import * as React from "react";
// import { DropTarget, DropTargetSpec } from 'react-dnd';
// import { observer } from "mobx-react"
// import { PossibleWaysToMove } from "./models/enums/PossibleWaysToMove";
// import { GridContentRegister } from "./models/GridContentRegister";
// import { CardType } from './models/CardType'
// import { getPossibleWaysToMove } from "./cards/BuildingCardsProvider"

// const squareTarget: DropTargetSpec<any> = {
//     drop(props, monitor, component) {
//         var { x, y } = props;
//         var cardId = (monitor.getItem() as any).id;

//         props.gridContentReg = props.gridContentReg.map((item: any) => {
//             if (item.position.x == x && item.position.y == y) {
//                 item.hasCard = true;
//                 item.cardId = cardId;
//             }

//             return item;
//         })

//         props.callBack(props.gridContentReg);
//     },

//     hover(props, monitor, component) {

//         console.log("props", props)
//         console.log("monitor", monitor)
//         console.log("component", monitor)

//         //do something on hover
//     },

//     canDrop(props, monitor) {
//         var { x, y } = props;
//         var gridContentReg: GridContentRegister[] = props.gridContentReg;
//         var possibleWaysToMove: PossibleWaysToMove[] = (monitor.getItem() as any).possibleWaysToMove;

//         var neighbors = gridContentReg.filter((item) => {
//             return (item.position.x == x - 1 && item.position.y == y)
//                 || (item.position.x == x && item.position.y == y - 1)
//                 || (item.position.x == x + 1 && item.position.y == y)
//                 || (item.position.x == x && item.position.y == y + 1)
//         })

//         var squaresWithCard = neighbors.filter((item) => {
//             return item.hasCard == true;
//         })

//         var matchedWithNewCardPossitions = { "Top": true, "Right": true, "Bottom": true, "Left": true }

//         for (var i = 0; i < squaresWithCard.length; i++) {
//             var neighborCard = squaresWithCard[i];
//             var neighborCardPossibleWaysToMove = getPossibleWaysToMove(neighborCard.cardId);

//             if (x == neighborCard.position.x && y < neighborCard.position.y) {
//                 //Новата карта е отгоре, съседа е отдолу
//                 //Проверяваме дали дали новата карта има път надолу и съседа на горе или
//                 //Новата карта няма път надолу и съседа нагоре
//                 if ((!possibleWaysToMove.some(x => x == PossibleWaysToMove.Bottom)
//                     || !neighborCardPossibleWaysToMove.some((x:any) => x == PossibleWaysToMove.Top))
//                     || (!possibleWaysToMove.some(x => x == PossibleWaysToMove.Bottom) && !neighborCardPossibleWaysToMove.some(x => x == PossibleWaysToMove.Top))) {

//                     matchedWithNewCardPossitions.Top = false;
//                 }
//             } else if (x > neighborCard.position.x && y == neighborCard.position.y) {
//                 //Новата карта е в дясно, съседа е в ляво
//                 //Проверяваме дали дали новата карта има път наляво и съседа надясно или
//                 //Новата карта няма път наляво и съседа надясно
//                 if ((!possibleWaysToMove.some(x => x == PossibleWaysToMove.Left)
//                     || !neighborCardPossibleWaysToMove.some((x:any) => x == PossibleWaysToMove.Right))
//                     || (!possibleWaysToMove.some(x => x == PossibleWaysToMove.Left) && !neighborCardPossibleWaysToMove.some(x => x == PossibleWaysToMove.Right))) {

//                     matchedWithNewCardPossitions.Left = false;
//                 }
//             } else if (x == neighborCard.position.x && y > neighborCard.position.y) {
//                 //Новата карта е отдолу, съседа е отгоре
//                 //Проверяваме дали дали новата карта има път нагоре и съседа надолу или
//                 //Новата карта няма път наляво и съседа надясно
//                 if ((!possibleWaysToMove.some(x => x == PossibleWaysToMove.Top)
//                     || !neighborCardPossibleWaysToMove.some((x:any) => x == PossibleWaysToMove.Bottom))
//                     || (!possibleWaysToMove.some(x => x == PossibleWaysToMove.Top) && !neighborCardPossibleWaysToMove.some(x => x == PossibleWaysToMove.Bottom))) {

//                     matchedWithNewCardPossitions.Bottom = false;
//                 }
//             } else if (x < neighborCard.position.x && y == neighborCard.position.y) {
//                 //Новата карта е в ляво, съседа е в дясно
//                 if ((!possibleWaysToMove.some(x => x == PossibleWaysToMove.Right)
//                     || !neighborCardPossibleWaysToMove.some((x:any) => x == PossibleWaysToMove.Left))
//                     || (!possibleWaysToMove.some(x => x == PossibleWaysToMove.Right) && !neighborCardPossibleWaysToMove.some(x => x == PossibleWaysToMove.Left))) {

//                     matchedWithNewCardPossitions.Right = false;
//                 }
//             }
//         }

//         if (matchedWithNewCardPossitions.Top
//             && matchedWithNewCardPossitions.Left
//             && matchedWithNewCardPossitions.Bottom
//             && matchedWithNewCardPossitions.Right
//             && squaresWithCard.length > 0
//             && possibleWaysToMove.length > 0)
//             return true;
//         else
//             return false;
//     }
// };

// function collect(connect: any, monitor: any) {
//     return {
//         connectDropTarget: connect.dropTarget(),
//         isOver: monitor.isOver(),
//         canDrop: monitor.canDrop()
//     };
// }

// interface PlayGridSquareProps {
//     x: number;
//     y: number;
//     connectDropTarget?: any;
//     isOver?: any;
//     gridContentReg: GridContentRegister[],
//     callBack: (gridContentReg: GridContentRegister[]) => any;
//     canDrop?: boolean;
// }

// @DropTarget(CardType.BuildingCard, squareTarget, collect)
// @observer export class PlayGridSquare extends React.Component<PlayGridSquareProps, any> {

//     render() {
//         const { x, y, connectDropTarget, isOver, canDrop } = this.props;
//         const style = { background: "#efda3e", opacity: 0.5 }

//         return connectDropTarget(

//            <span className="play-grid-droppable">{this.props.children}</span>
//         );
//     }


// }