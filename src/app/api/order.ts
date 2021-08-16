import { API_URL } from '../constants/api'
import { TAddOrderHistoryData, TEditOrderData } from '../types/order.types'

export const getOrdersStatistics = async (id: string) => {
    const response = await fetch(`${API_URL}/orders/stats/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return response.json()
}

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

export const getOrdersCurrentUser = async (userId: string) => {
    const response = await fetch(`${API_URL}/orders/user/${userId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return response.json()
}

export const getOrdersCurrentEmployee = async (userId: string) => {
    const response = await fetch(`${API_URL}/orders/author/${userId}`, {
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

export const editOrder = async (id: string) => {
    const response = await fetch(`${API_URL}/orders/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return response.json()
}

export const saveEditOrder = async (data: TEditOrderData) => {
    const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    return response.json()
}

export const getOrderHistory = async (orderId: string) => {
    const response = await fetch(`${API_URL}/orders/history/${orderId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return response.json()
}

export const addOrderHistory = async (data: TAddOrderHistoryData) => {
    const response = await fetch(`${API_URL}/orders/history`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    return response.json()
}
