import { API_URL } from '../constants/api';

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
