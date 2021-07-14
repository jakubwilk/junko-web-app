export type TResponseCheckUserRole = {
    statusCode: number
    userRole: number
    userId: string
}

export type TResponseLoginUser = {
    statusCode: number
    userId: string
    userRole: number
}

export type TResponseRegisterUser = {
    statusCode: number
}

export type TAddUserData = {
    email: string
    password: string
    role: number
}

export type TLoginUserData = {
    email: string
    password: string
    isRemember: boolean
}

export type TRegisterUserData = {
    email: string
    password: string
}

export type TResponseLogoutUser = {
    statusCode: number
}

export type TStatusClass = 'active' | 'inactive'

export type TResponseActivateUser = {
    statusCode: number
}

export type TEditUserData = {
    file: any
    firstName: string
    lastName: string
    password?: string
    city: string
    phoneNumber: string
    role: number
}

export type TSaveEditUserResponse = {
    statusCode: number
}
