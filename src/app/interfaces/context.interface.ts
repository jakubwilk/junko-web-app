export interface IUserAuthContext {
    id: string;
    email: string;
    role: number;
    firstName: string;
    lastName: string;
    setId: (id: string) => void;
    setEmail: (email: string) => void;
    setRole: (role: number) => void;
    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
    clearAuthContext: () => void;
}

export interface INavigationContext {
    currentUrl: string;
    setCurrentUrl: (url: string) => void;
}

export interface IUserContext {
    id: string;
    isEditEnable: boolean;
    setId: (id: string) => void;
    setEditEnable: (value: boolean) => void;
    clearUserContext: () => void;
}
