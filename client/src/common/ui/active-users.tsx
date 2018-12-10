import * as React from 'react'

export class ActiveUsers extends React.Component<{}, {}>{

    public render() {

        return <table className="table">
            <thead className="thead-dark">
                <tr>
                    <th colSpan={3}>Играчи</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Юнай</td>
                    <td><a href="javascript:;" className="badge badge-danger">Зает</a></td>
                    <td><button type="button" className="btn btn-danger btn-sm">Откажи</button></td>
                </tr>
                <tr>
                    <td>Джей</td>
                    <td><a href="javascript:;" className="badge badge-success">Свободен</a></td>
                    <td><button type="button" className="btn btn-success btn-sm">Покани</button></td>
                </tr>
            </tbody>
        </table>
    }
}