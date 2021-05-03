import { Component } from 'react';
import { ILoginPageProps, ILoginPageState } from '../../interfaces/login-page.interface';
import { Helmet } from 'react-helmet';

class LoginPage extends Component<ILoginPageProps, ILoginPageState> {
    render() {
        return (
            <>
                <Helmet>
                    <title>{`Junko | Logowanie`}</title>
                </Helmet>
                <h1>Logowanie</h1>
            </>
        );
    }
}

export default LoginPage;
