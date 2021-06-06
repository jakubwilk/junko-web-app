import { MouseEvent } from 'react';

export interface IUserGreetings {
    email: string;
    firstName: string;
    lastName: string;
    handleLogout: (e: MouseEvent<HTMLButtonElement>) => void;
}
