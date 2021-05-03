import { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { IAppProps, IAppState } from './interfaces/app.interface';
import AppProvider from './context/AppProvider';
import { AppContext } from './context/AppContext';
import LoginPage from './pages/login/Login';
import PrivateRoute from './components/router/PrivateRoute';
import AdminPage from './pages/dashboard/Admin';
import UserPage from './pages/dashboard/User';
import { getUserSession } from './api/auth';

const history = createBrowserHistory();

class App extends Component<IAppProps, IAppState> {
    static contextType = AppContext;

    constructor(props: IAppProps) {
        super(props);

        this.state = {
            isLoading: true,
            isValidToken: false
        }
    }

    componentDidMount = async () => {
        console.log(this.context);
        const response = await getUserSession();
        console.log(response);
        this.setState({ isLoading: false });
    }

    render = () => {
        const { isLoading, isValidToken } = this.state;

        return (
            <>
                {isLoading ? null : (
                    <AppProvider>
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
                    </AppProvider>
                )}
            </>
        )
    }
}

export default App;
