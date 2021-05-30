import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

const App = () => {
    const [isReady, setReady] = useState<boolean>(false);

    useEffect(() => {
        setReady(true);

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
            </Switch>
        </Router>
    ) : null;
}

export default App;
