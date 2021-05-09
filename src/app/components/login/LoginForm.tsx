import { ChangeEvent, Component, FormEvent } from 'react';
import { ILoginFormProps, ILoginFormState } from '../../interfaces/login.interface';
import { TLoginUserData, TResponseLoginUser } from '../../types/auth.types';
import { createUserSession } from '../../api/auth';
import { AppContext } from '../../context/AppContext';
import { HTTP_CODE } from '../../constants/http';
import { ROLES } from '../../constants/roles';
import FormInput from '../forms/FormInput';
import Form from '../forms/Form';

class LoginForm extends Component<ILoginFormProps, ILoginFormState> {
    static contextType = AppContext;

    constructor(props: ILoginFormProps) {
        super(props);

        this.state = {
            email: '',
            password: '',
            isRemember: true
        }
    }

    handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
        const { isRemember } = this.state;

        this.setState({ isRemember: !isRemember });
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
                    setBasicUserData('', ROLES.NONE);
                }
            })
            .catch(err => console.log(err));
    }

    render = () => {
        const { email, password, isRemember } = this.state;

        return (
            <Form
                className={"login-form"}
                onSubmit={(e) => this.handleSubmit(e)}
            >
                <div className={"form-group"}>
                    <FormInput
                        type={"text"}
                        label={"Email"}
                        labelClassName={"label login-form-input-label"}
                        className={"input login-form-input"}
                        id={"email"}
                        name={"email"}
                        placeholder={"joe@localhost"}
                        value={email}
                        onChange={(e) => this.handleChange(e)}
                    />
                </div>
                <div className={"form-group"}>
                    <FormInput
                        type={"password"}
                        label={"Hasło"}
                        labelClassName={"label login-form-input-label"}
                        id={"password"}
                        className={"input login-form-input"}
                        name={"password"}
                        value={password}
                        onChange={(e) => this.handleChange(e)}
                    />
                </div>
                <div className={"form-group"}>
                    <FormInput
                        type={"checkbox"}
                        label={"Zapamiętaj mnie"}
                        labelClassName={"label login-form-checkbox-label"}
                        id={"isRemember"}
                        className={"login-form-checkbox"}
                        name={"isRemember"}
                        checked={isRemember}
                        onChange={(e) => this.handleCheck(e)}
                    />
                </div>
                <button className={"button login-form-button"}>Login</button>
            </Form>
        );
    }
}

export default LoginForm;
