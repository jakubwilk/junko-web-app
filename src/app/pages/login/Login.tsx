import { Component } from 'react';
import { ILoginPageProps, ILoginPageState } from '../../interfaces/login.interface';
import { Helmet } from 'react-helmet';
import LoginForm from '../../components/login/LoginForm';
import { AppContext } from '../../context/AppContext';
import { Redirect } from 'react-router-dom';

class LoginPage extends Component<ILoginPageProps, ILoginPageState> {
    static contextType = AppContext;

    constructor(props: ILoginPageProps) {
        super(props);

        this.state = {
            isRedirectAllowed: false,
            dashboardUrl: ''
        }
    }

    redirectUserToDashboard = (role: number) => {
        switch (role) {
            case 1:
                this.setState({ dashboardUrl: '/dashboard' });
                break;
            case 2:
                this.setState({ dashboardUrl: '/dashboard' });
                break;
            case 3:
                this.setState({ dashboardUrl: '/panel' });
                break;
            default:
                this.setState({ dashboardUrl: '/' });
                break;
        }
    }

    componentDidMount = () => {
        const { userRole } = this.context;

        this.redirectUserToDashboard(userRole);
        this.setState({ isRedirectAllowed: true });
    }

    render = () => {
        const { isRedirectAllowed, dashboardUrl } = this.state;

        return (
            <>
                {isRedirectAllowed ? (
                    <Redirect to={{
                        pathname: dashboardUrl,
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
