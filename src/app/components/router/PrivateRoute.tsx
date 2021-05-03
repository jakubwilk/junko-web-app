import { Component, ReactElement } from 'react';
import { IPrivateRouteProps, IPrivateRouteState } from '../../interfaces/private-route.interface';
import { Redirect, Route } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import LoginPage from '../../pages/login/Login';

class PrivateRoute extends Component<IPrivateRouteProps, IPrivateRouteState> {
    static contextType = AppContext;

    constructor(props: IPrivateRouteProps) {
        super(props);

        this.state = {
            isLoading: true
        }
    }

    renderDashboard = (userRole: number, adminPage: ReactElement, userPage: ReactElement) => {
        switch (userRole) {
            case 1:
                return adminPage;
            case 3:
                return userPage;
            default:
                return <LoginPage />;
        }
    }

    componentDidMount() {
        this.setState({isLoading: false});
    }

    render() {
        const {adminPage, userPage, ...rest} = this.props;
        const {isLoading} = this.state;

        return (
            <>
                {isLoading ? null : (
                    <AppContext.Consumer>
                        {value => (
                            <Route
                                {...rest}
                                render={({location}) =>
                                    value.userRole === 0 ? (
                                        <Redirect to={{
                                            pathname: '/',
                                            state: { from: location }
                                        }}/>
                                    ) : this.renderDashboard(value.userRole, adminPage, userPage)
                                }
                            />
                        )}
                    </AppContext.Consumer>
                )}
            </>
        );
    }
}

export default PrivateRoute;
