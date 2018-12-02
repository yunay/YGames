import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { graphql, compose } from 'react-apollo';
import { registerQuery, loginQuery } from '../../queries'

interface RegistrationProps {
    handleRegister?: () => void;
}

@observer class Registration extends React.Component<any, any>{

    @observable private name: string = "";
    @observable private password: string = "";
    @observable private repassword: string = "";

    constructor(props: any) {
        super(props)

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRePasswordChange = this.handleRePasswordChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
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
                <label>Повтори парола
                    <input type="password" className="form-control" value={this.repassword} onChange={this.handleRePasswordChange} />
                </label>
            </div>
            <div>
                <button type="button" className="btn btn-primary" onClick={this.handleRegister}>РЕГИСТРАЦИЯ</button>
            </div>
        </div>
    }

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
            variables: { name: this.name, password: this.password },
        });

        const loginResponse = await (this.props as any).login({
            variables: { name: this.name, password: this.password },
        })
        
        const { token, refreshToken } = loginResponse.data.login;
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        this.props.handleRegister();
    }
}

export default compose(
    graphql<RegistrationProps>(registerQuery,{name:"register"}),
    graphql(loginQuery,{name:"login"})
) (Registration);
