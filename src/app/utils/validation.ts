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

export const getValidationEditUserMessage = (statusCode: number) => {
    switch (statusCode) {
        case 200:
            return 'Profil został pomyślnie zmieniony'
        case 500:
            return 'Wystąpił problem po stronie serwera. Proszę spróbować później'
        default:
            return ''
    }
}

export const getValidationAddOrderMessage = (statusCode: number) => {
    switch (statusCode) {
        case 201:
            return 'Zlecenie zostało dodane pomyślnie'
        case 500:
            return 'Wystąpił błąd podczas dodawnaia zlecenia'
        default:
            return ''
    }
}

export const getValidationEditOrderMessage = (statusCode: number) => {
    switch (statusCode) {
        case 200:
            return 'Zlecenie zostało zmienione pomyślnie'
        case 500:
            return 'Wystąpił problem po stronie serwera. Proszę spróbować później'
        default:
            return ''
    }
}

export const getValidationAddOrderHistoryMessage = (statusCode: number) => {
    switch (statusCode) {
        case 201:
            return 'Pozycja została dodana pomyślnie'
        case 500:
            return 'Wystąpił problem po stronie serwera. Proszę spróbować później'
        default:
            return ''
    }
}
