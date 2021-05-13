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
import { MoonLoader } from 'react-spinners';
import RouteNavigation from './components/router/RouteNavigation';
import { getUserData } from './api/user';
import { TResponseUserData } from './types/user.types';

class App extends Component<IAppProps, IAppState> {
    static contextType = AppContext;

    constructor(props: IAppProps) {
        super(props);

        this.state = {
            isLoading: true
        }
    }

    componentDidMount = async () => {
        try {
            const { setBasicUserData, setPersonalUserData } = this.context;
            const userSession: TResponseCheckUserRole = await getUserSession();

            if (userSession.statusCode === HTTP_CODE.OK) {
                const userData: TResponseUserData = await getUserData(userSession.userId);
                setBasicUserData(userSession.userId, userSession.userRole);
                setPersonalUserData(userData.data.firstName, userData.data.lastName, userData.data.email);
            } else {
                setBasicUserData('', ROLES.NONE);
            }

            this.setState({ isLoading: false });
        } catch (error: unknown) {
            this.setState({ isLoading: false });
        }
    }


    render = () => {
        const { isLoading } = this.state;

        return (
            <>
                {isLoading ? (
                    <div className={"page-loader"}>
                        <MoonLoader color={'#007bff'} loading={isLoading} size={150} />
                    </div>
                ) : (
                    <AppContext.Consumer>
                        {value => (
                            <Router history={history}>
                                {value.userId ? (
                                    <RouteNavigation
                                        userId={value.userId}
                                        userRole={value.userRole}
                                        firstName={value.firstName}
                                        lastName={value.lastName}
                                        email={value.email}
                                    />
                                ) : null}
                                <Switch>
                                    <Route exact path={'/'} render={() => <LoginPage />} />
                                    <PrivateRoute path={'/dashboard'}>
                                        <AdminPage />
                                    </PrivateRoute>
                                    <PrivateRoute path={'/panel'}>
                                        <UserPage />
                                    </PrivateRoute>
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
