import * as React from 'react'

export class Rooms extends React.Component<{}, {}>{

    public render() {

        return <table className="table main-table">
        <thead>
            <tr>
                <th colSpan={3}>Активни стаи</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Готина стая</td>
                <td>3/5</td>
                <td><button type="button" className="btn btn-success btn-sm">Вход <i className="fa fa-sign-in"></i></button></td>
            </tr>
            <tr>
                <td>Джей</td>
                <td>5/5</td>
                <td><button type="button" className="btn btn-success btn-sm">Вход <i className="fa fa-sign-in"></i></button></td>
            </tr>
        </tbody>
    </table>
    }
}