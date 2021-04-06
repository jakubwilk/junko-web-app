import { ReactElement } from 'react';

export interface ILoginCardProps {
    logo: string;
    alt?: string;
    title: string;
    subtitle: string;
    children?: ReactElement | ReactElement[];
}

export interface ILoginFormState {
    email: string;
    password: string;
    isRemember: boolean;
}
