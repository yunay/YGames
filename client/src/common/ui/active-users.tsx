import * as React from 'react'

export class ActiveUsers extends React.Component<{}, {}>{

    public render() {

        return <table className="table main-table">
            <thead>
                <tr>
                    <th colSpan={2}>Играчи</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Юнай</td>
                    <td><span className="badge badge-success">Свободен</span></td>
                    <td><button type="button" className="btn btn-danger btn-sm">Откажи <i className="fa fa-user-times"></i></button></td>
                </tr>
                <tr>
                    <td>Джей</td>
                    <td><span className="badge badge-success">Свободен</span></td>
                    <td><button type="button" className="btn btn-success btn-sm">Покани <i className="fa fa-user-plus"></i></button></td>
                </tr>
                <tr>
                    <td>Джей</td>
                    <td><span className="badge badge-success">Свободен</span></td>
                    <td><button type="button" className="btn btn-success btn-sm">Покани <i className="fa fa-user-plus"></i></button></td>
                </tr>
                <tr>
                    <td>Джей</td>
                    <td><span className="badge badge-danger">Зает</span></td>
                    <td><button type="button" className="btn btn-success btn-sm">Покани <i className="fa fa-user-plus"></i></button></td>
                </tr>
                <tr>
                    <td>Джей</td>
                    <td><span className="badge badge-danger">Зает</span></td>
                    <td><button type="button" className="btn btn-success btn-sm">Покани <i className="fa fa-user-plus"></i></button></td>
                </tr>
                <tr>
                    <td>Джей</td>
                    <td><span className="badge badge-danger">Зает</span></td>
                    <td><button type="button" className="btn btn-success btn-sm">Покани <i className="fa fa-user-plus"></i></button></td>
                </tr>
                <tr>
                    <td>Джей</td>
                    <td><span className="badge badge-danger">Зает</span></td>
                    <td><button type="button" className="btn btn-success btn-sm">Покани <i className="fa fa-user-plus"></i></button></td>
                </tr>
                <tr>
                    <td>Джей</td>
                    <td><span className="badge badge-danger">Зает</span></td>
                    <td><button type="button" className="btn btn-success btn-sm">Покани <i className="fa fa-user-plus"></i></button></td>
                </tr>
                <tr>
                    <td>Джей</td>
                    <td><span className="badge badge-danger">Зает</span></td>
                    <td><button type="button" className="btn btn-success btn-sm">Покани <i className="fa fa-user-plus"></i></button></td>
                </tr>
            </tbody>
        </table>
    }
}