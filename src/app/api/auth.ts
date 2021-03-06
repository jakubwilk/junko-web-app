import { API_URL } from '../constants/api'
import {
    TAddUserData,
    TLoginUserData,
    TRegisterUserData,
} from '../types/auth.types'

export const getUserSession = async () => {
    const response = await fetch(`${API_URL}/auth/role`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return response.json()
}

export const deleteUserSession = async (userId: string) => {
    const response = await fetch(`${API_URL}/auth/user/${userId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return response.json()
}

export const createUserSession = async (data: TLoginUserData) => {
    const response = await fetch(`${API_URL}/auth`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    return response.json()
}

export const activeUser = async (token: string) => {
    const response = await fetch(`${API_URL}/auth/activate/${token}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return response.json()
}

export const createUser = async (data: TRegisterUserData) => {
    const response = await fetch(`${API_URL}/auth`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    return response.json()
}

export const addUser = async (data: TAddUserData) => {
    const response = await fetch(`${API_URL}/auth/add/user`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    return response.json()
}
