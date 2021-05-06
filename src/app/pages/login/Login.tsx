import { Component } from 'react';
import { ILoginPageProps, ILoginPageState } from '../../interfaces/login.interface';
import { Helmet } from 'react-helmet';
import LoginForm from '../../components/login/LoginForm';
import { AppContext } from '../../context/AppContext';
import { Redirect } from 'react-router-dom';

class LoginPage extends Component<ILoginPageProps, ILoginPageState> {
    static contextType = AppContext;

    render = () => {
        const { isRedirectAllowed, url } = this.context;

        return (
            <>
                {isRedirectAllowed ? (
                    <Redirect to={{
                        pathname: url,
                        state: { from: this.props.location }
                    }} />
                ) : (
                  <>
                      <Helmet>
                          <title>{`Junko | Logowanie`}</title>
                      </Helmet>
                      <LoginForm />
                  </>
                )}
            </>
        );
    }
}

export default LoginPage;
