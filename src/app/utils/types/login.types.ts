import { ReactElement } from 'react';

export type TLoginCardProps = {
    logo: string,
    alt?: string,
    title: string,
    subtitle: string,
    children?: ReactElement | ReactElement[]
}

export type TLoginFormState = {
    email: string,
    password: string,
    isRemember: boolean
}
