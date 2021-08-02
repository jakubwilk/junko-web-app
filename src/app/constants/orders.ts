import { TOrdersTableHeader, TOrderStatus } from '../types/order.types'

export const userOrdersTableHeaderMenu: TOrdersTableHeader[] = [
    {
        id: 1,
        name: 'Numer',
    },
    {
        id: 2,
        name: 'Klient',
    },
    {
        id: 3,
        name: 'Data przyjęcia',
    },
    {
        id: 4,
        name: 'Ostatnia modyfikacja',
    },
    {
        id: 5,
        name: 'Status',
    },
]

export const ordersTableHeaderMenu: TOrdersTableHeader[] = [
    {
        id: 1,
        name: 'Numer',
    },
    {
        id: 2,
        name: 'Klient',
    },
    {
        id: 3,
        name: 'Data przyjęcia',
    },
    {
        id: 4,
        name: 'Ostatnia modyfikacja',
    },
    {
        id: 5,
        name: 'Serwisant',
    },
    {
        id: 6,
        name: 'Status',
    },
]

export const ordersStatus: TOrderStatus[] = [
    {
        id: 1,
        name: 'Aktywny',
        value: 1,
    },
    {
        id: 2,
        name: 'W trakcie',
        value: 2,
    },
    {
        id: 3,
        name: 'Zakończony',
        value: 3,
    },
]
