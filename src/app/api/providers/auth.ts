import { apiUri, axiosBasicConfig } from '../config';
import { ILoginFormState } from '../../utils/interfaces/login';
import axios, { AxiosError, AxiosResponse } from 'axios';

export const openUserSession = async (formData: ILoginFormState) => {
    try {
        const requestBody: ILoginFormState = {
            email: formData.email,
            password: formData.password,
            isRemember: formData.isRemember
        }
        const response: AxiosResponse = await axios.post(apiUri + '/auth', requestBody, axiosBasicConfig());

        console.log(response);
        return response;
    } catch (error: unknown) {
        const err = error as AxiosError;

        if (err.response) {
            console.log(err.response.status);
        }
    }
}
