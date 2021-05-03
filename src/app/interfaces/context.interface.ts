import { ReactElement } from 'react';

export interface IAppContextState {
    userId: string;
    userRole: number;
}

export interface IAppContextProps {
    children: ReactElement | ReactElement[];
}
