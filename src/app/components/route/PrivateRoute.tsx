import { IPrivateRouteProps } from '../../utils/interfaces/route';
import { Redirect, Route } from 'react-router-dom';
import React from 'react';

const PrivateRoute = (routeProps: IPrivateRouteProps) => {
    const { component: Component, ...rest } = routeProps;
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
