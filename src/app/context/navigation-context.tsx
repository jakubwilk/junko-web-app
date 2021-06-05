import { createContext, useState } from 'react';
import { TContextBody } from '../types/context.types';
import { INavigationContext } from '../interfaces/context.interface';

const initialValues: INavigationContext = {
    currentUrl: '',
    setCurrentUrl: (url) => {}
}

export const NavigationContext = createContext<INavigationContext>(initialValues);

export const NavigationContextProvider = (props: TContextBody) => {
    const [currentUrl, setCurrentUrl] = useState<string>('');

    return (
        <NavigationContext.Provider value={{ currentUrl, setCurrentUrl }}>
            {props.children}
        </NavigationContext.Provider>
    );
}
