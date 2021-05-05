import { Component } from 'react';
import { ILoginPageProps, ILoginPageState } from '../../interfaces/login.interface';
import { Helmet } from 'react-helmet';
import LoginForm from '../../components/login/LoginForm';

class LoginPage extends Component<ILoginPageProps, ILoginPageState> {
    render() {
        return (
            <>
                <Helmet>
                    <title>{`Junko | Logowanie`}</title>
                </Helmet>
                <LoginForm />
            </>
        );
    }
}

export default LoginPage;
