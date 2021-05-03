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

const history = createBrowserHistory();

class App extends Component<IAppProps, IAppState> {
    static contextType = AppContext;

    render() {
        return (
            <AppProvider>
                <Router history={history}>
                    <Switch>
                        <Route exact path={'/'} render={() => <LoginPage />} />
                        <PrivateRoute
                            path={'/dashboard'}
                            adminPage={<AdminPage />}
                            userPage={<UserPage />}
                        />
                    </Switch>
                </Router>
            </AppProvider>
        )
    }
}

export default App;
