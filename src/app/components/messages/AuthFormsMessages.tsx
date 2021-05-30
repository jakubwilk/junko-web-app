import { Component } from 'react';
import { IAuthFormsMessagesProps, IAuthFormsMessagesState } from '../../interfaces/errors.interface';
import { AUTH_LOCALE } from '../../constants/locale';
import { HTTP_CODE } from '../../constants/http';
import './auth-form-messages.scss';

class AuthFormsMessages extends Component<IAuthFormsMessagesProps, IAuthFormsMessagesState> {
    constructor(props: IAuthFormsMessagesProps) {
        super(props);

        this.state = {
            message: '',
            isReady: false
        }
    }

    setMessage = async (status: number) => {
        switch (status) {
            case 201:
                await this.setState({ message: AUTH_LOCALE.REGISTRATION_SUCCESS, isReady: true });
                break;
            case 400:
                await this.setState({ message: AUTH_LOCALE.USER_EXISTS, isReady: true });
                break;
            case 403:
                await this.setState({ message: AUTH_LOCALE.USER_NOT_EXIST, isReady: true });
                break;
            case 500:
                await this.setState({ message: AUTH_LOCALE.SERVER_ERROR, isReady: true });
                break;
            default:
                await this.setState({ message: '', isReady: false });
                break;
        }
    }

    componentDidMount = async () => {
        const { statusCode } = this.props;
        await this.setMessage(statusCode);
    }

    render = () => {
        const { statusCode } = this.props;
        const { message, isReady } = this.state;

        return (
            <>
                {isReady ? (
                    <div className={statusCode === HTTP_CODE.CREATED ? "success" : "error"}>
                        <p className={statusCode === HTTP_CODE.CREATED ? "success-message" : "error-message"}>{message}</p>
                    </div>
                ) : null}
            </>
        );
    }
}

export default AuthFormsMessages;
