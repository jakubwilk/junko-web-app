import axios, { AxiosError } from 'axios';
import { API_URL } from '../constants/api';

export const getUserSession = async () => {
    try {
        const response = await axios.get(`${API_URL}/auth`);
        console.log(response);
    } catch (err: unknown) {
        const error = err as AxiosError;
        console.log(error);
    }
}
