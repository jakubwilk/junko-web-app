export type TAuthLoginMessages = {
    serverErrorMessage: string,
    userNotFoundMessage: string,
    wrongUserDataMessage: string
}

export type TFetchLoginSuccess = {
    statusCode: number,
    userId: string
}
