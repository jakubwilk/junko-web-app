import { createContext } from 'react';
import { TAppContext } from '../types/context.types';

export const AppContext = createContext<TAppContext>({
    userId: '',
    userRole: 0,
    firstName: '',
    lastName: '',
    email: '',
    url: '',
    isRedirectAllowed: false,
    updateUserId: (userId: string) => {},
    updateUserRole: (role: number) => {},
    redirectUserToDashboard: (role: number) => {},
    resetContextState: () => {},
    setBasicUserData: (userId: string, userRole: number) => {},
    setPersonalUserData: (firstName: string, lastName: string, email: string) => {}
});

