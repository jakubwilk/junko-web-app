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

    componentDidMount = () => {
        this.setState({ isLoading: false });
    }

    render = () => {
        const { children, ...rest } = this.props;
        const { isLoading} = this.state;

        return (
            <>
                { isLoading ? null : (
                    <AppContext.Consumer>
                        {value => (
                            <Route
                                { ...rest }
                                render={({location}) =>
                                    value.userRole === 0 ? (
                                        <Redirect to={{
                                            pathname: '/',
                                            state: { from: location }
                                        }}/>
                                    ) : children
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
