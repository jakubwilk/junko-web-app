export const apiUri: string = 'http://localhost:4128';

export const fetchBasicConfig = (body?: unknown) => {
    return  {
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    }
}
