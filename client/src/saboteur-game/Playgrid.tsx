import * as React from "react"
import { observer } from "mobx-react"
import { observable, action, runInAction, computed, autorun } from "mobx"
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { StartCard, AngleLeftBottomCard } from "./cards/building-cards"
import { GridContentRegister } from "./models/GridContentRegister"
import { getBuldingCard } from "./cards/BuildingCardsProvider"

@DragDropContext(HTML5Backend)
@observer export class Playgrid extends React.Component<any, any> {
    @observable gridContentReg: GridContentRegister[] = []
    gridContent: any[];

    constructor(props: any) {
        super(props);

        this.changesCallBack = this.changesCallBack.bind(this);
    }

    // componentWillMount() {
    //     this.gridContent = this.prepareGridContentReg();
    // }

    // componentWillUpdate() {
    //     this.gridContent = this.prepareGridContentReg();
    // }

    render() {

        if (this.gridContent && this.gridContent.length > 0) {
            return (
                <div>
                    <div className="play-grid">
                        <div className="play-grid-row">{this.gridContent}</div>
                    </div>
                    <div>
                        {/*Картите на играча*/}
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }

    changesCallBack(gridContentReg: GridContentRegister[]) {
        this.gridContentReg = gridContentReg;
        this.forceUpdate();
    }

    private prepareGridContentReg() {
        let x: number;
        let y: number;

        if (this.gridContentReg.length > 0)
            return this.prepareGridContent();

        var gridContentReg: any[] = [];

        for (var i = 0; i < 63; i++) {
            x = i % 7;
            y = Math.floor(i / 7);

            if (x == 3 && y == 8)
                gridContentReg.push({ hasCard: true, id: i.toString(), position: { x: x, y: y }, cardId: "0" })
            else
                gridContentReg.push({ hasCard: false, id: i.toString(), position: { x: x, y: y } })
        }

        this.gridContentReg = gridContentReg;

        return this.prepareGridContent();
    }

    prepareGridContent() {
        let x: number;
        let y: number;
        let gridContent: any[] = [];

        // for (var i = 0; i < this.gridContentReg.length; i++) {
        //     x = this.gridContentReg[i].position.x;
        //     y = this.gridContentReg[i].position.y;

        //     if (this.gridContentReg[i].position.x == 3 && this.gridContentReg[i].position.y == 8) {
        //         gridContent.push(<PlayGridSquare x={x} y={y} key={i} gridContentReg={this.gridContentReg}
        //             callBack={this.changesCallBack}>
        //             {getBuldingCard("0", x, y)}
        //         </PlayGridSquare>)
        //     } else if (this.gridContentReg[i].hasCard) {
        //         gridContent.push(<PlayGridSquare x={x} y={y} key={i} gridContentReg={this.gridContentReg}
        //             callBack={this.changesCallBack}>
        //             {getBuldingCard(this.gridContentReg[i].cardId, x, y)}
        //         </PlayGridSquare>)
        //     }else {
        //         gridContent.push(<PlayGridSquare x={x} y={y} key={i} gridContentReg={this.gridContentReg}
        //             callBack={this.changesCallBack} />)
        //     }
        // }

        //return gridContent;

        //tODO
    }
}