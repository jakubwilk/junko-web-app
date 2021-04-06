export const apiUri: string = 'http://localhost:4128';

export const axiosBasicConfig = () => {
    return  {
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    }
}
