import { Component } from 'react';
import { ILoginPageProps, ILoginPageState } from '../../interfaces/login.interface';
import { Helmet } from 'react-helmet';
import LoginForm from '../../components/login/LoginForm';
import { AppContext } from '../../context/AppContext';
import { Redirect } from 'react-router-dom';
import './login-page.scss';
import LoginHeading from '../../components/login/LoginHeading';
import logo from '../../../assets/images/logo-site.png';

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
                  <div className={"login"}>
                      <Helmet>
                          <title>{`Junko | Logowanie`}</title>
                      </Helmet>
                      <div className={"login-page"}>
                          <LoginHeading
                              image={logo}
                              imageClassName={"login-page-logo"}
                              title={"Zaloguj się na swoje konto"}
                              titleClassName={"login-page-title"}
                          />
                          <LoginForm />
                      </div>
                  </div>
                )}
            </>
        );
    }
}

export default LoginPage;
