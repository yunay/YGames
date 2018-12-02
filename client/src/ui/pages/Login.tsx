import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { graphql } from 'react-apollo';
import { loginQuery } from '../../queries';

interface LoginProps {
    handleLogin: () => void;
}

@observer class Login extends React.Component<LoginProps, any>{

    @observable private name: string = "";
    @observable private password: string = "";

    constructor(props: LoginProps) {
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
    }

    public render() {

        return <div>
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
                <button type="button" className="btn btn-primary" onClick={this.handleSignIn}>ВХОД</button>
            </div>
        </div>
    }

    private handleNameChange(e: any) {
        this.name = e.target.value;
    }

    private handlePasswordChange(e: any) {
        this.password = e.target.value;
    }

    private async handleSignIn() {
        const response = await (this.props as any).login({
            variables: { name: this.name, password: this.password },
        });

        const { token, refreshToken } = response.data.login;
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        this.props.handleLogin();
    }
}

export default graphql<LoginProps>(loginQuery,{name:"login"})(Login);