import { ChangeEvent, FormEvent, MouseEvent, ReactElement } from 'react';

export interface IFormState {}

export interface IFormProps {
    id?: string;
    className?: string;
    children: ReactElement | ReactElement[];
    type?: string;
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}

export interface IFormInputState {}

export interface IFormInputProps {
    type?: string;
    label?: string;
    labelClassName?: string;
    className?: string;
    id?: string;
    name?: string;
    placeholder?: string;
    value?: string | number;
    checked?: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onClick?: (event: MouseEvent<HTMLInputElement>) => void;
}
