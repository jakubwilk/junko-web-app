import { createContext, useState } from 'react';
import { IUserAuthContext } from '../interfaces/context.interface';
import { TContextBody } from '../types/context.types';

const initialValues: IUserAuthContext = {
    id: '',
    email: '',
    role: 0,
    firstName: '',
    lastName: '',
    setId: (id) => {},
    setEmail: (email) => {},
    setRole: (role) => {},
    setFirstName: (firstName) => {},
    setLastName: (lastName) => {}
}

export const AuthContext = createContext<IUserAuthContext>(initialValues);

export const AuthContextProvider = (props: TContextBody) => {
    const [id, setId] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [role, setRole] = useState<number>(0);
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');

    return (
        <AuthContext.Provider value={{
            id,
            email,
            role,
            firstName,
            lastName,
            setId,
            setEmail,
            setRole,
            setFirstName,
            setLastName
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}
