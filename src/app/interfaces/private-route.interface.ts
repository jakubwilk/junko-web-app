import { RouteProps } from 'react-router';
import { ReactElement } from 'react';

export interface IPrivateRouteState {
    isLoading: boolean;
}

export interface IPrivateRouteProps extends RouteProps {
    children: ReactElement;
}

export interface IRouteNavigationState {
    isLoading: boolean;
    isRedirect: boolean;
}

export interface IRouteNavigationProps {
    userId: string;
    userRole: number;
    firstName: string;
    lastName: string;
    email: string;
}
