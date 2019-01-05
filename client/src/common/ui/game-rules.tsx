import * as React from 'react'
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

interface GameRulesProps{
    gameRules:string;
}

@observer export class GameRules extends React.Component<GameRulesProps, any>{
    @observable private shownGameRulesModal: boolean;

    constructor(props:any){
        super(props)

        this.toggleGameRulesModal = this.toggleGameRulesModal.bind(this);
    }

    public render() {

        return <>
            <button type="button" className="btn btn-info btn-sm lobby-main-btn" onClick={this.toggleGameRulesModal}>
                <i className="fa fa-info-circle"></i>Правила на играта</button>
            <Modal isOpen={this.shownGameRulesModal} toggle={this.toggleGameRulesModal}>
                <ModalHeader toggle={this.toggleGameRulesModal} close={<button className="close" onClick={this.toggleGameRulesModal}>&times;</button>}>Правила на играта</ModalHeader>
                <ModalBody>{this.props.gameRules}</ModalBody>
            </Modal>

        </>
    }

    private toggleGameRulesModal() {
        this.shownGameRulesModal = !this.shownGameRulesModal;
    }
}