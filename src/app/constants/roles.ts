import { TUserSelectRole } from '../types/constants.types'

export const ROLES = {
    NONE: 0,
    OWNER: 1,
    EMPLOYEE: 2,
    USER: 3,
    BANNED: 4,
}

export const SELECT_ROLES: TUserSelectRole[] = [
    {
        id: ROLES.NONE,
        name: 'Wybierz role',
    },
    {
        id: ROLES.OWNER,
        name: 'Właściciel',
    },
    {
        id: ROLES.EMPLOYEE,
        name: 'Pracownik',
    },
    {
        id: ROLES.USER,
        name: 'Użytkownik',
    },
    {
        id: ROLES.BANNED,
        name: 'Nieaktywny',
    },
]
