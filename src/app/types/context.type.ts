export type TAppContext = {
    userId: string;
    userRole: number;
    updateUserId: (userId: string) => void;
    updateUserRole: (role: number) => void;
}
