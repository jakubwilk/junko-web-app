import { apiUri, fetchGetConfig, fetchPostConfig } from './config';
import { TLoginFormState } from '../utils/types/login.types';

export const getUserSession = async (): Promise<void> => {
    const config: RequestInit = fetchGetConfig();
    const response: Response = await fetch(apiUri + '/users', config);

    return response.json();
}

export const openUserSession = async (formData: TLoginFormState) => {
    const requestBody = {
        email: formData.email,
        password: formData.password
    }

    const config: RequestInit = fetchPostConfig(requestBody);

    const response: Response = await fetch(apiUri + '/auth', config);
    return response.json();
}
