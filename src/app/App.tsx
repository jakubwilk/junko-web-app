import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/auth-context';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import DashboardWrapper from './pages/dashboard/DashboardWrapper';

const App = () => {
    const [isReady, setReady] = useState<boolean>(false);

    useEffect(() => {
        setReady(true);

        return () => {
            setReady(false);
        }
    }, [])

    return isReady ? (
        <AuthContextProvider>
            <Router>
                <Switch>
                    <Route exact path={"/"}>
                        <Login />
                    </Route>
                    <Route path={"/sign-up"}>
                        <Register />
                    </Route>
                    <Route path={"/dashboard"}>
                        <DashboardWrapper />
                    </Route>
                </Switch>
            </Router>
        </AuthContextProvider>
    ) : null;
}

export default App;
