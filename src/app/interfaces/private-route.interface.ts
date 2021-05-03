import { RouteProps } from 'react-router';
import { ReactElement } from 'react';

export interface IPrivateRouteState {
    isLoading: boolean;
}

export interface IPrivateRouteProps extends RouteProps {
    children: ReactElement
}
