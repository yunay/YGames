import * as React from 'react'

export class RoomActivity extends React.Component<any, any>{

    public render() {

        return <table className="table main-table">
            <thead>
                <tr>
                    <th colSpan={2}>Играчи в стаята</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Юнай</td>
                    <td><button type="button" className="btn btn-danger btn-sm">Изгони <i className="fa fa-user-times"></i></button></td>
                </tr>
                <tr>
                    <td>Джей</td>
                    <td><button type="button" className="btn btn-danger btn-sm">Изгони <i className="fa fa-user-times"></i></button></td>
                </tr>
            </tbody>
        </table>
    }
}