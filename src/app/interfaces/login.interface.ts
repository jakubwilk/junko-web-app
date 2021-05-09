import { RouteProps } from 'react-router';
import SimpleReactValidator from 'simple-react-validator';

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
    isLoading: boolean;
    validator: SimpleReactValidator;
}

export interface ILoginFormProps {}
