import { ILoginFormState } from '../../utils/interfaces/login';
import { apiUri } from '../config';
import axios from 'axios';

export const loginUser = (formData: ILoginFormState) => {
    return axios.post(apiUri + '/auth', formData);
}
