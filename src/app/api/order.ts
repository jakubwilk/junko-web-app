import { API_URL } from '../constants/api'

export const getOrdersList = async () => {
    const response = await fetch(`${API_URL}/orders`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return response.json()
}
