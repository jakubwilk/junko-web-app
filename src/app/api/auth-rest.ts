import { apiUri } from './config';

export const getUserSession = async (): Promise<void> => {
    const config: RequestInit = {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response: Response = await fetch(apiUri, config);

    return response.json();
}
