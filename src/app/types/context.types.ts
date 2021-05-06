export type TAppContext = {
    userId: string;
    userRole: number;
    firstName: string;
    lastName: string;
    email: string;
    url: string;
    isRedirectAllowed: boolean;
    updateUserId: (userId: string) => void;
    updateUserRole: (role: number) => void;
    redirectUserToDashboard: (role: number) => void;
    resetContextState: () => void;
    setBasicUserData: (userId: string, userRole: number) => void;
    setPersonalUserData: (firstName: string, lastName: string, email: string) => void;
}
