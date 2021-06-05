import { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import PrivateRoute from './components/router/PrivateRoute';
import { getUserSession } from './api/auth';
import { TResponseCheckUserRole } from './types/auth.types';
import { AuthContext } from './context/auth-context';
import AdminDashboard from './pages/dashboard/Admin';
import NoMatch from './pages/no-match/NoMatch';

const App = () => {
    const [isReady, setReady] = useState<boolean>(false);
    const { setId, setRole } = useContext(AuthContext);

    useEffect(() => {
        getUserSession()
            .then((res: TResponseCheckUserRole) => {
                setId(res.userId);
                setRole(res.userRole);
                setReady(true);
            })
            .catch(err => {
                console.log(err);
                setReady(true);
            });

        return () => {
            setReady(false);
        }
    }, [])

    return isReady ? (
        <Router>
            <Switch>
                <Route exact path={"/"}>
                    <Login />
                </Route>
                <Route path={"/sign-up"}>
                    <Register />
                </Route>
                <PrivateRoute component={AdminDashboard} path={"/dashboard"} exact={false} />
                <Route path={"*"}>
                    <NoMatch />
                </Route>
            </Switch>
        </Router>
    ) : null;
}

export default App;
