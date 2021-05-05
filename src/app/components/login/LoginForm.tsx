import { ChangeEvent, Component, FormEvent } from 'react';
import { ILoginFormProps, ILoginFormState } from '../../interfaces/login.interface';
import { TLoginUserData } from '../../types/auth.types';
import { createUserSession } from '../../api/auth';

class LoginForm extends Component<ILoginFormProps, ILoginFormState> {
    constructor(props: ILoginFormProps) {
        super(props);

        this.state = {
            email: '',
            password: '',
            isRemember: false
        }
    }

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const input = event.target as HTMLInputElement;

        this.setState({
            ...this.state,
            [input.name]: input.value
        });
    }

    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { email, password, isRemember } = this.state;
        const data: TLoginUserData = {
            email: email,
            password: password,
            isRemember: isRemember
        };

        createUserSession(data)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    render() {
        const { email, password } = this.state;

        return (
            <div className={"login-form"}>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <label htmlFor={"email"}>Email</label>
                    <input
                        type={"text"}
                        id={"email"}
                        name={"email"}
                        placeholder={"joe@localhost"}
                        value={email}
                        onChange={(e) => this.handleChange(e)}
                    />
                    <label htmlFor={"password"}>Password</label>
                    <input
                        type={"password"}
                        id={"password"}
                        name={"password"}
                        placeholder={"password"}
                        value={password}
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button>Login</button>
                </form>
            </div>
        );
    }
}

export default LoginForm;
