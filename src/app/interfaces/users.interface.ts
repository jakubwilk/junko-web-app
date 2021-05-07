export interface IAddUserState {
    email: string;
    role: number;
    isLoading: boolean;
}

export interface IAddUserProps {
    reloadList?: () => void;
}
