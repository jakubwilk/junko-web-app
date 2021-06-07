export const getValidationLoginMessage = (statusCode: number): string => {
    switch (statusCode) {
        case 403:
            return 'Użytkownik nie został znaleziony w systemie';
        case 400:
            return 'Podano błędne hasło';
        default:
            return '';
    }
}
