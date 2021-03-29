import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Niepoprawny adres email')
        .required('Do poprawnego zalogowania, potrzebny jest adres email'),
    password: Yup.string()
        .min(16, 'Hasło powinno zawierać minimum 16 znaków')
        .required('By móc się zalogować, wymagane jest hasło'),
});
