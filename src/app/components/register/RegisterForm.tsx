import { useState } from 'react'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import ClipLoader from 'react-spinners/ClipLoader'
import { IRegisterInitialValues } from '../../interfaces/register.interface'
import {
    TRegisterUserData,
    TResponseRegisterUser,
} from '../../types/auth.types'
import { createUser } from '../../api/auth'
import { HTTP_CODE } from '../../constants/http'
import { getValidationRegisterMessage } from '../../utils/validation'

const registerSchema = Yup.object().shape({
    email: Yup.string()
        .email('Podano niepoprawny adres')
        .required('Email jest wymagany'),
    password: Yup.string()
        .min(16, 'Podane hasło jest za krótkie, powinno mieć minimum 16 znaków')
        .trim('Hasło nie może zawierać spacji')
        .oneOf([Yup.ref('repeatPassword'), null], 'Hasła muszą być takie same')
        .required('Hasło jest wymagane'),
    repeatPassword: Yup.string()
        .trim('Hasło nie może zawierać spacji')
        .oneOf([Yup.ref('password'), null], 'Hasła muszą być takie same')
        .required('Pole wymagane'),
})

const RegisterForm = () => {
    const [isLoading, setLoading] = useState<boolean>(false)
    const [validationMessage, setValidationMessage] = useState<string>('')
    const [statusCode, setStatusCode] = useState<number>(0)

    const initialValues: IRegisterInitialValues = {
        email: '',
        password: '',
        repeatPassword: '',
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={registerSchema}
            onSubmit={async (values, actions) => {
                const userData: TRegisterUserData = {
                    email: values.email,
                    password: values.password,
                }

                setLoading(true)
                const response: TResponseRegisterUser = await createUser(
                    userData
                )

                setLoading(false)
                const message: string = getValidationRegisterMessage(
                    response.statusCode
                )
                setValidationMessage(message)
                setStatusCode(response.statusCode)
            }}
        >
            {({ errors, touched }) => (
                <>
                    {validationMessage === '' ? null : (
                        <span
                            className={
                                statusCode === HTTP_CODE.CREATED
                                    ? 'validation-success'
                                    : 'validation-error'
                            }
                        >
                            {validationMessage}
                        </span>
                    )}
                    <Form className={'form'}>
                        <div className={'form-group'}>
                            <label htmlFor={'email'}>
                                {'Email użytkownika'}
                            </label>
                            <Field
                                className={
                                    errors.email && touched.email
                                        ? 'form-field-error'
                                        : ''
                                }
                                id={'email'}
                                name={'email'}
                                placeholder={'johndoe@localhost'}
                                autoComplete={'off'}
                            />
                            {errors.email && touched.email ? (
                                <span className={'form-error'}>
                                    {errors.email}
                                </span>
                            ) : null}
                        </div>
                        <div className={'form-group'}>
                            <label htmlFor={'password'}>
                                {'Hasło użytkownika'}
                            </label>
                            <Field
                                className={
                                    errors.password && touched.password
                                        ? 'form-field-error'
                                        : ''
                                }
                                type={'password'}
                                id={'password'}
                                name={'password'}
                                autoComplete={'off'}
                            />
                            {errors.password && touched.password ? (
                                <span className={'form-error'}>
                                    {errors.password}
                                </span>
                            ) : null}
                        </div>
                        <div className={'form-group'}>
                            <label htmlFor={'repeatPassword'}>
                                {'Powtórz hasło'}
                            </label>
                            <Field
                                className={
                                    errors.repeatPassword &&
                                    touched.repeatPassword
                                        ? 'form-field-error'
                                        : ''
                                }
                                type={'password'}
                                id={'repeatPassword'}
                                name={'repeatPassword'}
                                autoComplete={'off'}
                            />
                            {errors.repeatPassword && touched.repeatPassword ? (
                                <span className={'form-error'}>
                                    {errors.repeatPassword}
                                </span>
                            ) : null}
                        </div>
                        <button
                            className={`button form-button ${
                                isLoading ? 'disabled' : ''
                            }`}
                            type={'submit'}
                        >
                            {isLoading ? (
                                <>
                                    <ClipLoader
                                        color={'#ffffff'}
                                        loading={isLoading}
                                        size={15}
                                    />
                                    {'Tworzenie konta'}
                                </>
                            ) : (
                                'Utwórz konto'
                            )}
                        </button>
                    </Form>
                </>
            )}
        </Formik>
    )
}

export default RegisterForm
