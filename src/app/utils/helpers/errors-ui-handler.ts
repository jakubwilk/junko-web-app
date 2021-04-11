import { TAuthLoginMessages } from '../types/auth.types';

export const displayLoginErrorMessage = (statusCode: number, errorMessages: TAuthLoginMessages) => {
    const { serverErrorMessage, userNotFoundMessage, wrongUserDataMessage } = errorMessages;

    switch (statusCode) {
        case 500:
            return serverErrorMessage
        case 403:
            return wrongUserDataMessage
        case 400:
            return userNotFoundMessage
        default:
            return '';
    }
}
