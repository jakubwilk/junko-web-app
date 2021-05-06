export type TAppContext = {
    userId: string;
    userRole: number;
    url: string;
    isRedirectAllowed: boolean;
    updateUserId: (userId: string) => void;
    updateUserRole: (role: number) => void;
    redirectUserToDashboard: (role: number) => void;
    resetContextState: () => void;
    setBasicUserData: (userId: string, userRole: number) => void;
}
