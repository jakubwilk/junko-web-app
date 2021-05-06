import { ChangeEvent, Component, FormEvent } from 'react';
import { ILoginFormProps, ILoginFormState } from '../../interfaces/login.interface';
import { TLoginUserData, TResponseLoginUser } from '../../types/auth.types';
import { createUserSession } from '../../api/auth';
import { AppContext } from '../../context/AppContext';
import { HTTP_CODE } from '../../constants/http';

class LoginForm extends Component<ILoginFormProps, ILoginFormState> {
    static contextType = AppContext;

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
        const { setBasicUserData } = this.context;
        event.preventDefault();
        const { email, password, isRemember } = this.state;
        const data: TLoginUserData = {
            email: email,
            password: password,
            isRemember: isRemember
        };

        createUserSession(data)
            .then((res: TResponseLoginUser) => {
                if (res.statusCode === HTTP_CODE.OK) {
                    setBasicUserData(res.userId, res.userRole);
                } else {
                    setBasicUserData('', 0);
                }
            })
            .catch(err => console.log(err));
    }

    render = () => {
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
