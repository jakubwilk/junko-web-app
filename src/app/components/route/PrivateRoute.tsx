import { IPrivateRouteProps } from '../../utils/interfaces/route';
import { Redirect, Route } from 'react-router-dom';
import React from 'react';
import { useAuthorization } from '../../api/hooks/UseAuthorization';

const PrivateRoute = (routeProps: IPrivateRouteProps) => {
    const { component: Component, ...rest } = routeProps;
    const token = routeProps.location?.state as string;
    const auth = useAuthorization(token);
    const isAuthorized = true;

    return (
        <Route {...rest}
               render={(routeProps) =>
                   isAuthorized ? (
                       <Component {...routeProps} />
                   ) : (
                       <Redirect to={{
                           pathname: '/',
                           state: { from: routeProps.location }
                       }} />
                   )
               }
        />
    );
}

export default PrivateRoute;
