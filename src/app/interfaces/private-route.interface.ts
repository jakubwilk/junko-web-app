import { RouteProps } from 'react-router';
import { Component, ReactElement } from 'react';

export interface IPrivateRouteState {
    isLoading: boolean;
}

export interface IPrivateRouteProps extends RouteProps {
    adminPage: ReactElement;
    userPage: ReactElement;
}
