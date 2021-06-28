import { API_URL } from '../constants/api';
import { TEditUserData } from '../types/auth.types';

export const getAllUsers = async () => {
    const response = await fetch(`${API_URL}/users/all`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.json();
}

export const getUserData = async (userId: string) => {
    const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.json();
}

export const getEditUserData = async (userId: string) => {
    const response = await fetch(`${API_URL}/users/edit/${userId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.json();
}

export const saveEditUserData = async (userId: string, data: TEditUserData) => {
    const response = await fetch(`${API_URL}/users/edit/${userId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return response.json();
}
