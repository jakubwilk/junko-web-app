export type TUserBasicData = {
    firstName: string,
    lastName: string,
    email: string
}

export type TUserBasicResponseData = {
    statusCode: number,
    data: TUserBasicData
}

export type TSingleUserData = {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    photo: string,
    isActivate: boolean,
    createdAt: Date
}
