import { AuthLoginMessages } from '../utils/types/auth.types';

export const authLoginHandler = (statusCode: number, messages: AuthLoginMessages, cb: Function) => {
    const { serverErrorMessage, userNotFoundMessage, wrongUserDataMessage } = messages;

    switch (statusCode) {
        case 500:
            cb(serverErrorMessage);
            break;
        case 403:
            cb(userNotFoundMessage);
            break;
        case 400:
            cb(wrongUserDataMessage);
            break;
        default:
            cb('');
    }
}
