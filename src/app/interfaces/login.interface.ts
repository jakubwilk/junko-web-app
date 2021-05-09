import { RouteProps } from 'react-router';

export interface ILoginPageState {}

export interface ILoginPageProps extends RouteProps {}

export interface ILoginHeadingState {}

export interface ILoginHeadingProps {
    image: string;
    alt?: string;
    imageClassName: string;
    title: string;
    titleClassName: string;
}

export interface ILoginFormState {
    email: string;
    password: string;
    isRemember: boolean;
}

export interface ILoginFormProps {}
