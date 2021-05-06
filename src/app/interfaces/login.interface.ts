import { RouteProps } from 'react-router';

export interface ILoginPageState {}

export interface ILoginPageProps extends RouteProps {}

export interface ILoginFormState {
    email: string;
    password: string;
    isRemember: boolean;
}

export interface ILoginFormProps {}
