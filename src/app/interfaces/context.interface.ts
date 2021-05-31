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
}
