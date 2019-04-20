import * as React from 'react'

export class TicTacToe extends React.Component<{}, {}>{

    public render() {
        return <div className="row">
            <div className="col-6">
                <ul className="nav">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Active</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="javascript:;">Брой играчи: 3</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                </ul>
            </div>
            <div className="col-6">
                <ul className="nav justify-content-end">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Active</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="javascript:;">Брой играчи: 3</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="javascript:;">Изход</a>
                    </li>
                </ul>
            </div>
        </div>
    }
}