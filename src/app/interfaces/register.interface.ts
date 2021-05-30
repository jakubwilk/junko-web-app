import { RouteProps } from 'react-router';
import SimpleReactValidator from 'simple-react-validator';
import { ReactElement } from 'react';

export interface IRegisterPageState {}

export interface IRegisterPageProps extends RouteProps {}

export interface IRegisterHeadingState {}

export interface IRegisterHeadingProps {
    image: string;
    alt?: string;
    imageClassName: string;
    title: string;
    titleClassName: string;
}

export interface IRegisterFormState {
    email: string;
    password: string;
    rePassword: string;
    isLoading: boolean;
    messageComponent: ReactElement;
    validator: SimpleReactValidator;
}

export interface IRegisterFormProps {}
