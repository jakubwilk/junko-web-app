export type TUserBasicData = {
    firstName: string,
    lastName: string,
    email: string
}

export type TResponseUserData = {
    statusCode: number,
    data: TUserBasicData
}
