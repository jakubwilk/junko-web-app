import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory, History } from 'history';
import LoginPage from './pages/login/LoginPage';
import DashboardOwnerPage from './pages/panel/DashboardOwnerPage';
import PrivateRoute from './components/route/PrivateRoute';

const history: History = createBrowserHistory();

const App = () => {
    return (
        <div className={'app'}>
            <Router history={history}>
                <Switch>
                    <Route exact path={'/'}>
                        <LoginPage title={'Junko | Logowanie'} />
                    </Route>
                    <PrivateRoute path={'/dashboard'} component={() => <DashboardOwnerPage title={'Junko | Panel zarządzania'} />} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
