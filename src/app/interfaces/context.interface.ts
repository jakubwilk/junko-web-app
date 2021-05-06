import { ReactElement } from 'react';

export interface IAppContextState {
    userId: string;
    userRole: number;
    firstName: string;
    lastName: string;
    email: string;
    url: string;
    isRedirectAllowed: boolean;
}

export interface IAppContextProps {
    children: ReactElement | ReactElement[];
}
