export const getValidationLoginMessage = (statusCode: number): string => {
    switch (statusCode) {
        case 403:
            return 'Użytkownik nie został znaleziony w systemie';
        case 401:
            return 'Konto nie zostało aktywowane';
        case 400:
            return 'Podano błędne hasło';
        default:
            return '';
    }
}
