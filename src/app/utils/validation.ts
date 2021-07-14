export const getValidationLoginMessage = (statusCode: number): string => {
    switch (statusCode) {
        case 403:
            return 'Użytkownik nie został znaleziony w systemie'
        case 401:
            return 'Konto nie zostało aktywowane'
        case 400:
            return 'Podano błędne hasło'
        default:
            return ''
    }
}

export const getValidationRegisterMessage = (statusCode: number) => {
    switch (statusCode) {
        case 201:
            return 'Konto zostało pomyślnie stworzone. Proszę przejść do skrzynki pocztowej w celu aktywacji konta.'
        case 400:
            return 'Podany adres email istnieje już w naszym systemie'
        default:
            return ''
    }
}
