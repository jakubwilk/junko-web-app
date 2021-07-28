import { API_URL } from '../constants/api'

export const getOrdersList = async () => {
    const response = await fetch(`${API_URL}/orders/all`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return response.json()
}

export const getOrderEmployees = async () => {
    const response = await fetch(`${API_URL}/orders`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return response.json()
}

export const addNewOrder = async (data: any) => {
    const response = await fetch(`${API_URL}/orders`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    return response.json()
}
