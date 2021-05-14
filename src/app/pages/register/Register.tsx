import { Component } from 'react';
import { IRegisterPageProps, IRegisterPageState } from '../../interfaces/register.interface';
import { AppContext } from '../../context/AppContext';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import logo from '../../../assets/images/logo-site.png';
import './register-page.scss';
import RegisterHeading from '../../components/register/RegisterHeading';
import RegisterForm from '../../components/register/RegisterForm';

class RegisterPage extends Component<IRegisterPageProps, IRegisterPageState> {
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
                    <div className={"register"}>
                        <Helmet>
                            <title>{`Junko | Tworzenie konta`}</title>
                        </Helmet>
                        <div className={"register-page"}>
                            <RegisterHeading
                                image={logo}
                                imageClassName={"register-page-logo"}
                                title={"Utwórz nowe konto"}
                                titleClassName={"register-page-title"}
                            />
                            <RegisterForm />
                        </div>
                    </div>
                )}
            </>
        );
    }
}

export default RegisterPage;
