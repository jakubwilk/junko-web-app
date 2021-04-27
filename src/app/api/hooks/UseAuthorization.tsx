import { useEffect, useState } from 'react';
import { apiUri } from '../config';
import axios from 'axios';

export const useAuthorization = async (token: string) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isAuthorized, setAuthorization] = useState<boolean>(false);

    useEffect(() => {
        console.log(token);
        const fetchData = async () => {
            try {
                const request = await axios.get(apiUri + '/auth/role', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(request);
            } catch (error: unknown) {
                console.log('error', error);
            }
        }

        fetchData();
    }, [])
}
