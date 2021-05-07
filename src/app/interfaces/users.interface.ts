import SimpleReactValidator from 'simple-react-validator';

export interface IAddUserState {
    email: string;
    role: number;
    isLoading: boolean;
    validator: SimpleReactValidator;
}

export interface IAddUserProps {
    isModal: boolean;
    reloadList?: () => void;
}
