import { ChangeEvent, Component, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { IRegisterFormProps, IRegisterFormState } from '../../interfaces/register.interface';
import { TRegisterUserData, TResponseLoginUser } from '../../types/auth.types';
import { createUser } from '../../api/auth';
import { AppContext } from '../../context/AppContext';
import { HTTP_CODE } from '../../constants/http';
import { ROLES } from '../../constants/roles';
import FormInput from '../forms/FormInput';
import Form from '../forms/Form';
import SimpleReactValidator from 'simple-react-validator';
import { ClipLoader } from 'react-spinners';
import AuthFormsMessages from '../messages/AuthFormsMessages';

class RegisterForm extends Component<IRegisterFormProps, IRegisterFormState> {
    static contextType = AppContext;

    constructor(props: IRegisterFormProps) {
        super(props);

        this.state = {
            email: '',
            password: '',
            rePassword: '',
            isLoading: false,
            statusCode: 0,
            validator: new SimpleReactValidator({
                element: (message: string) => <span className={"register-form-validation"}>{message}</span>,
                messages: {
                    required: "Pole jest wymagane",
                    email: "Podano niepoprawny adres email"
                },
                validators: {
                    same: {
                        message: "Hasła nie są identyczne",
                        rule: (val: string, params: unknown[], validator: SimpleReactValidator) => {
                            return val === this.state.password;
                        }
                    }
                }
            })
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

    handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { setBasicUserData } = this.context;
        const { email, password, validator } = this.state;
        const data: TRegisterUserData = {
            email: email,
            password: password
        };

        await this.setState({ isLoading: true });

        if (validator.allValid()) {
            createUser(data)
                .then((res: TResponseLoginUser) => {
                    if (res.statusCode === HTTP_CODE.OK) {
                        this.setState({ statusCode: res.statusCode });
                        setBasicUserData(res.userId, res.userRole);
                    } else {
                        this.setState({ statusCode: res.statusCode });
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
        const { email, password, rePassword, isLoading, statusCode, validator } = this.state;

        return (
            <>
                <AuthFormsMessages statusCode={statusCode} />
                <Form
                    className={"register-form"}
                    onSubmit={(e) => this.handleSubmit(e)}
                >
                    <div className={"form-group"}>
                        <FormInput
                            type={"text"}
                            label={"Email"}
                            labelClassName={"label register-form-input-label"}
                            className={"input register-form-input"}
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
                            labelClassName={"label register-form-input-label"}
                            id={"password"}
                            className={`input register-form-input`}
                            name={"password"}
                            value={password}
                            onChange={(e) => this.handleChange(e)}
                            onBlur={() => validator.showMessageFor('email')}
                        />
                        {validator.message('password', password, 'required')}
                    </div>
                    <div className={"form-group"}>
                        <FormInput
                            type={"password"}
                            label={"Potwierdź hasło"}
                            labelClassName={"label register-form-input-label"}
                            id={"repassword"}
                            className={`input register-form-input`}
                            name={"rePassword"}
                            value={rePassword}
                            onChange={(e) => this.handleChange(e)}
                            onBlur={() => validator.showMessageFor('email')}
                        />
                        {validator.message('repassword', rePassword, 'required|same')}
                    </div>
                    <button className={"button register-form-button"}>
                        {isLoading ? (
                            <>
                                <ClipLoader css={"margin-right: 10px"} color={"#ffffff"} size={20} />
                                {"Rejestracja"}
                            </>
                        ) : "Utwórz konto"}
                    </button>
                    <Link to={'/'} className={"register-form-link"}>{"Powrót do strony głównej"}</Link>
                </Form>
            </>
        );
    }
}

export default RegisterForm;
