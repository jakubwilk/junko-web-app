export type TUserBasicData = {
    firstName: string
    lastName: string
    email: string
}

export type TUserBasicResponseData = {
    statusCode: number
    data: TUserBasicData
}

export type TSingleUserData = {
    id: string
    email: string
    firstName: string
    lastName: string
    role: number
    photo: string
    isActive: boolean
    createdAt: Date
}

export type TUsersStatistics = {
    users: number
    employees: number
}
