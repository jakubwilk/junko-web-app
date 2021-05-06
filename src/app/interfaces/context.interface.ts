import { ReactElement } from 'react';

export interface IAppContextState {
    userId: string;
    userRole: number;
    url: string;
    isRedirectAllowed: boolean;
}

export interface IAppContextProps {
    children: ReactElement | ReactElement[];
}
