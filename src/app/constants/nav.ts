import { TDashboardNavigation } from '../types/navigation'

export const adminMenu: TDashboardNavigation[] = [
    {
        key: 1,
        url: '/dashboard',
        title: 'Wróć do strony głównej panelu',
        name: 'Strona główna',
    },
    {
        key: 2,
        url: '/dashboard/users',
        title: 'Przejdź do listy użytkowników',
        name: 'Użytkownicy',
    },
    {
        key: 3,
        url: '/dashboard/orders',
        title: 'Udaj się do listy zleceń',
        name: 'Zlecenia',
    },
    {
        key: 4,
        url: '/dashboard/my-orders',
        title: 'Przejdź do listy wykonywanych przez Ciebie zleceń',
        name: 'Moje zlecenia',
    },
]

export const userMenu: TDashboardNavigation[] = [
    {
        key: 1,
        url: '/dashboard',
        title: 'Przejdź do strony głównej',
        name: 'Strona główna',
    },
    {
        key: 2,
        url: '/history',
        title: 'Udaj się do historii zleceń',
        name: 'Historia',
    },
]
