export type TResponseCheckUserRole = {
    statusCode: number,
    userRole: number,
    userId: string,
}

export type TResponseLoginUser = {
    statusCode: number,
    userId: string,
    userRole: number
}

export type TAddUserData = {
    email: string;
    role: number;
}

export type TLoginUserData = {
    email: string,
    password: string,
    isRemember: boolean
}

export type TRegisterUserData = {
    email: string,
    password: string
}

export type TResponseLogoutUser = {
    statusCode: number
}

export type TStatusClass = 'active' | 'inactive';

export type TResponseActivateUser = {
    statusCode: number
}
