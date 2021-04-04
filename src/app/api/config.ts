export const apiUri: string = 'http://localhost:4128';

export const fetchGetConfig = (): RequestInit => {
    return  {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    }
}

export const fetchPostConfig = (body: unknown): RequestInit => {
    return {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
}
