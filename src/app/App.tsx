import { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { IAppProps, IAppState } from './interfaces/app.interface';
import { AppContext } from './context/AppContext';
import LoginPage from './pages/login/Login';
import PrivateRoute from './components/router/PrivateRoute';
import AdminPage from './pages/dashboard/Admin';
import UserPage from './pages/dashboard/User';
import { getUserSession } from './api/auth';
import { TResponseCheckUserRole } from './types/auth.types';
import { HTTP_CODE } from './constants/http';
import { history } from './history';
import { ROLES } from './constants/roles';

class App extends Component<IAppProps, IAppState> {
    static contextType = AppContext;

    constructor(props: IAppProps) {
        super(props);

        this.state = {
            isLoading: true
        }
    }

    componentDidMount = () => {
        const { setBasicUserData } = this.context;
        getUserSession()
            .then((res: TResponseCheckUserRole) => {
                if (res.statusCode === HTTP_CODE.OK) {
                    setBasicUserData(res.userId, res.userRole);
                } else {
                    setBasicUserData('', ROLES.NONE);
                }

                this.setState({ isLoading: false });
            })
            .catch(err => {
                this.setState({ isLoading: false });
            });
    }

    render = () => {
        const { isLoading } = this.state;

        return (
            <>
                {isLoading ? null : (
                    <AppContext.Consumer>
                        {value => (
                            <Router history={history}>
                                <Switch>
                                    <Route exact path={'/'} render={() => <LoginPage />} />
                                    <PrivateRoute
                                        path={'/dashboard'}
                                        children={<AdminPage />}
                                    />
                                    <PrivateRoute
                                        path={'/panel'}
                                        children={<UserPage />}
                                    />
                                </Switch>
                            </Router>
                        )}
                    </AppContext.Consumer>
                )}
            </>
        )
    }
}

export default App;
