import { ReactElement } from 'react';
import { TMenuItem } from '../types/menu.types';

export interface INavbarState {}

export interface INavbarProps {
    logoUrl: string;
    alt?: string;
    children: ReactElement | ReactElement[];
}

export interface IMenuState {}

export interface IMenuProps {
    children: ReactElement | ReactElement[]
}

export interface IMenuItemState {}

export interface IMenuItemProps extends TMenuItem{}
