import { ChangeEvent, Component, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ILoginFormProps, ILoginFormState } from '../../interfaces/login.interface';
import { TLoginUserData, TResponseLoginUser } from '../../types/auth.types';
import { createUserSession } from '../../api/auth';
import { AppContext } from '../../context/AppContext';
import { HTTP_CODE } from '../../constants/http';
import { ROLES } from '../../constants/roles';
import FormInput from '../forms/FormInput';
import Form from '../forms/Form';
import SimpleReactValidator from 'simple-react-validator';
import { ClipLoader } from 'react-spinners';
import AuthFormsMessages from '../messages/AuthFormsMessages';

class LoginForm extends Component<ILoginFormProps, ILoginFormState> {
    static contextType = AppContext;

    constructor(props: ILoginFormProps) {
        super(props);

        this.state = {
            email: '',
            password: '',
            messageComponent: <></>,
            isRemember: true,
            isLoading: false,
            validator: new SimpleReactValidator({
                element: (message: string) => <span className={"login-form-validation"}>{message}</span>,
                messages: {
                    required: "Pole jest wymagane",
                    email: "Podano niepoprawny adres email"
                }
            })
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

    handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { setBasicUserData } = this.context;
        const { email, password, isRemember, validator } = this.state;
        const data: TLoginUserData = {
            email: email,
            password: password,
            isRemember: isRemember
        };

        await this.setState({ isLoading: true });

        if (validator.allValid()) {
            createUserSession(data)
                .then((res: TResponseLoginUser) => {
                    if (res.statusCode === HTTP_CODE.OK) {
                        this.setState({ messageComponent: <AuthFormsMessages statusCode={res.statusCode} />});
                        setBasicUserData(res.userId, res.userRole);
                    } else {
                        this.setState({ messageComponent: <AuthFormsMessages statusCode={res.statusCode} />});
                        setBasicUserData('', ROLES.NONE);
                    }
                })
                .catch(err => console.log(err));
        } else {
            validator.showMessages();
        }

        await this.setState({ isLoading: false });
    }

    render = () => {
        const { email, password, messageComponent, isRemember, isLoading, validator } = this.state;

        return (
            <>
                {messageComponent}
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
                            onBlur={() => validator.showMessageFor('email')}
                        />
                        {validator.message('email', email, 'required|email')}
                    </div>
                    <div className={"form-group"}>
                        <FormInput
                            type={"password"}
                            label={"Hasło"}
                            labelClassName={"label login-form-input-label"}
                            id={"password"}
                            className={`input login-form-input`}
                            name={"password"}
                            value={password}
                            onChange={(e) => this.handleChange(e)}
                        />
                        {validator.message('password', password, 'required')}
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
                    <button className={"button login-form-button"}>
                        {isLoading ? (
                            <>
                                <ClipLoader css={"margin-right: 10px"} color={"#ffffff"} size={20} />
                                {"Logowanie"}
                            </>
                        ) : "Zaloguj się"}
                    </button>
                    <Link to={'/sign-up'} className={"login-form-link"}>{"Nie masz konta? Zarejestruj się!"}</Link>
                </Form>
            </>
        );
    }
}

export default LoginForm;
