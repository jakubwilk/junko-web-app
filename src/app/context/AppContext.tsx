import { createContext } from 'react';
import { TAppContext } from '../types/context.type';

export const AppContext = createContext<TAppContext>({
    userId: '',
    userRole: 0,
    updateUserId: (userId: string) => {
    },
    updateUserRole: (role: number) => {
    }
});

