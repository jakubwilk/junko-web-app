import React, { useState } from 'react';
import { useFormik } from 'formik';
import { TAuthLoginMessages, TFetchLoginSuccess } from '../../utils/types/auth.types';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { LoginSchema } from '../../utils/validation/login-form.validation';
import { Message } from 'primereact/message';
import { Checkbox } from 'primereact/checkbox';
import { Link } from 'react-router-dom';
import { ILoginFormState } from '../../utils/interfaces/login';
import { displayLoginErrorMessage } from '../../utils/helpers/errors-ui-handler';
import { TFetchException } from '../../utils/types/fetch.types';
import { apiUri } from '../../api/config';

const LoginForm = () => {
    const [authError, setAuthError] = useState('');
    const [isLoading, setLoading] = useState(false);

    const formSubmit = async (formData: ILoginFormState) => {
        const messages: TAuthLoginMessages = {
            serverErrorMessage: 'Wystąpił problem z serwerem, proszę spróbować później',
            userNotFoundMessage: 'Nie znaleziono użytkownika',
            wrongUserDataMessage: 'Błędna nazwa użytkownika lub hasło'
        }

        setLoading(true);
        fetch(apiUri + '/auth', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then((response: TFetchLoginSuccess | TFetchException) => {
                if (response.statusCode !== 200) {
                    setAuthError(displayLoginErrorMessage(response.statusCode, messages));
                } else {
                    console.log(response);
                }

                setLoading(false);
            })
            .catch(error => {
                setAuthError(displayLoginErrorMessage(500, messages));
                setLoading(false);
            });
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            isRemember: false
        },
        validationSchema: LoginSchema,
        onSubmit: async (formData: ILoginFormState) => {
            await formSubmit(formData);
        }
    });

    return (
        <>
            {authError.length > 0
                ? <Message className={'login-form-error'} severity={'error'} text={authError}/>
                : null}
            <form className={'login-form'} onSubmit={formik.handleSubmit}>
                <div className={'p-field login-form-group'}>
                    <label className={'login-form-label'} htmlFor={'email'}>Email użytkownika</label>
                    <span className={' p-input-icon-left login-form-input-group'}>
					<i className={'pi pi-envelope'} aria-hidden={'true'}/>
					<InputText
                        className={`login-form-input ${formik.errors.email ? 'login-form-input-error' : null}`}
                        id={'email'}
                        name={'email'}
                        value={formik.values.email}
                        placeholder={'jankowalski@gmail.com'}
                        autoComplete={'off'}
                        onChange={formik.handleChange}
                    />
				</span>
                    {formik.errors.email && formik.touched.email
                        ? <Message className={'login-form-error'} severity={'error'} text={formik.errors.email}/>
                        : null}
                </div>
                <div className={'p-field login-form-group'}>
                    <label className={'login-form-label'} htmlFor={'password'}>Hasło użytkownika</label>
                    <span className={'p-input-icon-left login-form-input-group'}>
					<i className={'pi pi-lock'} aria-hidden={true}/>
					<InputText
                        className={`login-form-input ${formik.errors.password ? 'login-form-input-error' : null}`}
                        type={'password'}
                        id={'password'}
                        name={'password'}
                        value={formik.values.password}
                        placeholder={'Hasło'}
                        feedback={'false'}
                        autoComplete={'off'}
                        onChange={formik.handleChange}
                    />
				</span>
                    {formik.errors.password && formik.touched.password
                        ? <Message className={'login-form-error'} severity={'error'} text={formik.errors.password}/>
                        : null}
                </div>
                <div className={'login-form-group'}>
                    <div className={'p-field-checkbox login-form-checkbox'}>
                        <Checkbox id={'remember'} name={'isRemember'} checked={formik.values.isRemember}
                                  onChange={formik.handleChange}/>
                        <label className={'login-form-label'} htmlFor={'isRemember'}>Zapamiętaj mnie</label>
                    </div>
                    <div className={'login-form-forgot'}>
                        <Link to={'/reset-password'}>Zapomniałeś/aś hasła? Ustaw nowe</Link>
                    </div>
                </div>
                <Button className={'login-form-button'} label={`${isLoading ? 'Czekaj' : 'Zaloguj się'}`} icon={'pi pi-angle-right'} iconPos={'right'}
                        type={'submit'}/>
            </form>
        </>
    );
}

export default LoginForm;
