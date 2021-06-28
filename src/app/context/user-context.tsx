import { createContext, useState } from 'react';
import { TContextBody } from '../types/context.types';
import { IUserContext } from '../interfaces/context.interface';

const initialValue: IUserContext = {
    id: '',
    isEditEnable: false,
    setId: (id: string) => {},
    setEditEnable: (value: boolean) => {},
    clearUserContext: () => {}
}

export const UserContext = createContext<IUserContext>(initialValue);

export const UserContextProvider = (props: TContextBody) => {
    const [id, setId] = useState<string>('');
    const [isEditEnable, setEditEnable] = useState<boolean>(false);

    const clearUserContext = () => {
        setId('');
        setEditEnable(false);
    }

    return (
        <UserContext.Provider value={{
            id,
            isEditEnable,
            setId,
            setEditEnable,
            clearUserContext
        }}>
            {props.children}
        </UserContext.Provider>
    )
}
