import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';

interface LoginProps{
    handleLogin:()=>void;
    mutate?:any;//todo da mu se nameri mqsto
}

@observer class LoginImpl extends React.Component<LoginProps, any>{

    @observable private name: string = "";
    @observable private password: string = "";

    constructor(props:LoginProps){
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

    private handleNameChange(e:any){
        this.name = e.target.value;
    }

    private handlePasswordChange(e:any){
        this.password = e.target.value;
    }

    private async handleSignIn(){
        const response = await this.props.mutate({
            variables: { name:this.name, password:this.password },
          });

        const {token,refreshToken } = response.data.login;
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        this.props.handleLogin();
    }
}

const mutation = gql`
    mutation($name: String!, $password:String!){
        login(name:$name, password: $password){
            token
            refreshToken
        }
    }
`;

export const Login = graphql<LoginProps>(mutation)(LoginImpl);