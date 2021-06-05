export type TUserBasicData = {
    firstName: string,
    lastName: string,
    email: string
}

export type TUserBasicResponseData = {
    statusCode: number,
    data: TUserBasicData
}
