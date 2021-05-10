import { TMenu } from '../types/menu.types';

export const adminMenu: TMenu = {
    links: [
        {
            key: 1,
            href: '/dashboard',
            title: 'Przejdź do strony głównej panelu',
            name: 'Strona główna',
            isActive: true,
            isDisabled: false
        },
        {
            key: 2,
            href: '/users',
            title: 'Przejdź do listy użytkowników',
            name: 'Użytkownicy',
            isActive: true,
            isDisabled: false
        },
        {
            key: 3,
            href: '/orders',
            title: 'Przejdź do spisu zleceń',
            name: 'Zlecenia',
            isActive: true,
            isDisabled: false
        }
    ]
}
