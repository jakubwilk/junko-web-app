export type TMenuItem = {
    key: number;
    href: string,
    title: string,
    name: string,
    isActive: boolean,
    isDisabled: boolean
}

export type TMenu = {
    links: TMenuItem[]
}
