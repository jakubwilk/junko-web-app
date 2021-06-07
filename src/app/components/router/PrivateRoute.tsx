import { FC, useContext } from 'react';
import { AuthContext } from '../../context/auth-context';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';

const PrivateRoute: FC<{
    component: FC;
    path: string;
    exact: boolean;
}> = (props) => {
    const { id } = useContext(AuthContext);

    return id === '' ? <Redirect to={"/"} /> : <Route path={props.path} exact={props.exact} component={props.component} />;
}

export default PrivateRoute;
