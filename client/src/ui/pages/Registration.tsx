import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { graphql, compose } from 'react-apollo';
import { MUTATIONS } from '../../queries'
const clientConfig = require('../../client.config')

interface RegistrationProps {
    handleRegister?: () => void;
}

@observer class Registration extends React.Component<any, any>{

    @observable private name: string = "";
    @observable private password: string = "";
    @observable private repassword: string = "";
    @observable private selectedAvatar:any = null;

    constructor(props: any) {
        super(props)

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRePasswordChange = this.handleRePasswordChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.selectedAvatar = clientConfig.avatars[0];
    }

    public render() {
        return <div className="row">

            <div className="col-sm-12 col-md-4">
                <div>
                    <label>Име
            <input type="text" className="form-control" value={this.name} onChange={this.handleNameChange} />
                    </label>
                </div>
                <div>
                    <label>Парола
            <input type="password" className="form-control" value={this.password} onChange={this.handlePasswordChange} />
                    </label>
                </div>
                <div>
                    <label>Повтори парола
            <input type="password" className="form-control" value={this.repassword} onChange={this.handleRePasswordChange} />
                    </label>
                </div>
                <div>
                    <button type="button" className="btn btn-primary" onClick={this.handleRegister}>РЕГИСТРАЦИЯ</button>
                </div>
            </div>
            <div className="col-sm-12 col-md-8 avatars-panel">
                <div className="row">
                   {this.renderAvatars()}
                </div>
            </div>
        </div>
    }

    //#region Handlers

    handleNameChange(e: any) {
        this.name = e.target.value;
    }

    handlePasswordChange(e: any) {
        this.password = e.target.value;
    }

    handleRePasswordChange(e: any) {
        this.repassword = e.target.value;
    }

    private async handleRegister() {

        await (this.props as any).register({
            variables: { name: this.name, password: this.password, avatar:this.selectedAvatar },
        });

        const loginResponse = await (this.props as any).login({
            variables: { name: this.name, password: this.password },
        })

        const { token, refreshToken } = loginResponse.data.login;
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        this.props.handleRegister();
    } 

    //#endregion

    renderAvatars():any{
        return clientConfig.avatars.map((avatar:any, id:number) => <div onClick={()=>{this.selectedAvatar = avatar}} className="col-2" key={"avatar_"+id}>
        <span className="avatar-panel">{avatar}</span>
        {this.selectedAvatar == avatar ? <span className="fa fa-check selected-avatar"></span> : null}
        </div>)
    }
}

export default compose(
    graphql<RegistrationProps>(MUTATIONS.REGISTER_QUERY, { name: "register" }),
    graphql(MUTATIONS.LOGIN_QUERY, { name: "login" })
)(Registration);
