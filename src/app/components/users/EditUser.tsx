import './edit-user.scss'
import { MouseEvent, useContext, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Form, Formik, Field } from 'formik'
import { ClipLoader } from 'react-spinners'
import { TEditUserData, TSaveEditUserResponse } from '../../types/auth.types'
import { ROLES, SELECT_ROLES } from '../../constants/roles'
import { TUserSelectRole } from '../../types/constants.types'
import { AuthContext } from '../../context/auth-context'
import { UserContext } from '../../context/user-context'
import { getEditUserData, saveEditUserData } from '../../api/user'
import { HTTP_CODE } from '../../constants/http'
import { getValidationEditUserMessage } from '../../utils/validation'

const editSchema = Yup.object().shape({
    firstName: Yup.string(),
    lastName: Yup.string(),
    password: Yup.string()
        .min(16, 'Podane hasło jest za krótkie, powinno mieć minimum 16 znaków')
        .trim('Hasło nie może zawierać spacji')
        .oneOf([Yup.ref('repeatPassword'), null], 'Hasła muszą być takie same'),
    city: Yup.string(),
    phoneNumber: Yup.string(),
    role: Yup.number(),
})

const initialData: TEditUserData = {
    firstName: '',
    lastName: '',
    password: '',
    city: '',
    phoneNumber: '',
    role: 0,
}

export const EditUser = () => {
    const { id, clearUserContext } = useContext(UserContext)
    const { role } = useContext(AuthContext)
    const [isReady, setReady] = useState<boolean>(false)
    const [isLoading, setLoading] = useState<boolean>(false)
    const [isEdited, setEdited] = useState<boolean>(false)
    const [validationMessage, setValidationMessage] = useState<string>('')
    const [statusCode, setStatusCode] = useState<number>(0)

    const handleClose = (e: MouseEvent<HTMLButtonElement>) => {
        clearUserContext()

        if (isEdited) {
            window.location.reload()
        }
    }

    useEffect(() => {
        getEditUserData(id)
            .then((res) => {
                const responseData: TEditUserData = {
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    city: res.data.city,
                    phoneNumber: res.data.phoneNumber,
                    role: res.data.role,
                }

                Object.assign(initialData, responseData)
                setReady(true)
            })
            .catch((err) => {
                console.log(err.message)
                setReady(true)
            })
    }, [id])

    return (
        <div className={'overlay'}>
            <div className={'overlay-content'}>
                <section className={'modal edit-user'}>
                    {isReady ? (
                        <>
                            <h2 className={'edit-user-title'}>{'Edytuj użytkownika'}</h2>
                            <Formik
                                initialValues={initialData}
                                validationSchema={editSchema}
                                onSubmit={async (values, actions) => {
                                    const userData: TEditUserData = {
                                        firstName: values.firstName,
                                        lastName: values.lastName,
                                        password: values.password,
                                        city: values.city,
                                        phoneNumber: values.phoneNumber,
                                        role: values.role,
                                    }

                                    setLoading(true)
                                    const response: TSaveEditUserResponse = await saveEditUserData(
                                        id,
                                        userData
                                    )

                                    const message: string = getValidationEditUserMessage(
                                        response.statusCode
                                    )
                                    setValidationMessage(message)
                                    setStatusCode(response.statusCode)
                                    setLoading(false)
                                    setEdited(true)
                                }}
                            >
                                {({ errors, touched, setFieldValue, values }) => (
                                    <>
                                        {validationMessage === '' ? null : (
                                            <span
                                                className={
                                                    statusCode === HTTP_CODE.OK
                                                        ? 'validation-success'
                                                        : 'validation-error'
                                                }
                                            >
                                                {validationMessage}
                                            </span>
                                        )}
                                        <Form className={'form'}>
                                            <div className={'form-group'}>
                                                <div>
                                                    <label htmlFor={'firstName'}>{'Imię'}</label>
                                                    <Field
                                                        className={
                                                            errors.firstName && touched.firstName
                                                                ? 'form-field-error'
                                                                : ''
                                                        }
                                                        id={'firstName'}
                                                        name={'firstName'}
                                                        autoComplete={'off'}
                                                    />
                                                    {errors.firstName && touched.firstName ? (
                                                        <span className={'form-error'}>
                                                            {errors.firstName}
                                                        </span>
                                                    ) : null}
                                                </div>
                                                <div>
                                                    <label htmlFor={'lastName'}>{'Nazwisko'}</label>
                                                    <Field
                                                        className={
                                                            errors.lastName && touched.lastName
                                                                ? 'form-field-error'
                                                                : ''
                                                        }
                                                        id={'lastName'}
                                                        name={'lastName'}
                                                        autoComplete={'off'}
                                                    />
                                                    {errors.lastName && touched.lastName ? (
                                                        <span className={'form-error'}>
                                                            {errors.lastName}
                                                        </span>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div
                                                className={
                                                    role === ROLES.OWNER
                                                        ? 'form-group multi'
                                                        : 'form-group'
                                                }
                                            >
                                                <div>
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
                                                {role === ROLES.OWNER ? (
                                                    <div>
                                                        <label htmlFor={'role'}>{'Rola'}</label>
                                                        <Field
                                                            as={'select'}
                                                            className={''}
                                                            id={'role'}
                                                            name={'role'}
                                                            value={values.role}
                                                        >
                                                            {SELECT_ROLES.map(
                                                                (role: TUserSelectRole) => (
                                                                    <option
                                                                        key={role.id}
                                                                        value={role.id}
                                                                    >
                                                                        {role.name}
                                                                    </option>
                                                                )
                                                            )}
                                                        </Field>
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div className={'form-group'}>
                                                <div>
                                                    <label htmlFor={'city'}>{'Miasto'}</label>
                                                    <Field
                                                        className={
                                                            errors.city && touched.city
                                                                ? 'form-field-error'
                                                                : ''
                                                        }
                                                        id={'city'}
                                                        name={'city'}
                                                        autoComplete={'off'}
                                                    />
                                                    {errors.city && touched.city ? (
                                                        <span className={'form-error'}>
                                                            {errors.city}
                                                        </span>
                                                    ) : null}
                                                </div>
                                                <div>
                                                    <label htmlFor={'phoneNumber'}>
                                                        {'Numer telefonu'}
                                                    </label>
                                                    <Field
                                                        className={
                                                            errors.phoneNumber &&
                                                            touched.phoneNumber
                                                                ? 'form-field-error'
                                                                : ''
                                                        }
                                                        id={'phoneNumber'}
                                                        name={'phoneNumber'}
                                                        autoComplete={'off'}
                                                    />
                                                    {errors.phoneNumber && touched.phoneNumber ? (
                                                        <span className={'form-error'}>
                                                            {errors.phoneNumber}
                                                        </span>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className={'button-group'}>
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
                                                            {'Zapisywanie'}
                                                        </>
                                                    ) : (
                                                        'Zapisz'
                                                    )}
                                                </button>
                                                <button
                                                    className={
                                                        'button form-button form-button-cancel'
                                                    }
                                                    type={'button'}
                                                    onClick={(e) => handleClose(e)}
                                                >
                                                    {'Zamknij'}
                                                </button>
                                            </div>
                                        </Form>
                                    </>
                                )}
                            </Formik>
                        </>
                    ) : (
                        <div className={'modal-loader'}>
                            <ClipLoader loading={!isReady} size={120} color={'red'} />
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}
