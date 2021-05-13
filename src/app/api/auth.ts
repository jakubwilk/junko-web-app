import { API_URL } from '../constants/api';
import { TAddUserData, TLoginUserData } from '../types/auth.types';

export const getUserSession = async () => {
    const response = await fetch(`${API_URL}/auth/role`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.json();
}

export const deleteUserSession = async (userId: string) => {
    const response = await fetch(`${API_URL}/auth/user/${userId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.json();
}

export const createUserSession = async (data: TLoginUserData) => {
    const response = await fetch(`${API_URL}/auth`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return response.json();
}

export const addUser = async (data: TAddUserData) => {
    const response = await fetch(`${API_URL}/auth/add`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return response.json();
}
