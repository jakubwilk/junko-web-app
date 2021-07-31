import { MouseEvent, useContext, useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import './add-order.scss'
import { Form, Formik, Field } from 'formik'
import { parse, isDate } from 'date-fns'
import * as Yup from 'yup'
import { TAddOrderData, TAddOrderResponse, TOrderEmployees } from '../../types/order.types'
import { HTTP_CODE } from '../../constants/http'
import { UserContext } from '../../context/user-context'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { addNewOrder, getOrderEmployees } from '../../api/order'
import { getValidationAddOrderMessage, getValidationEditUserMessage } from '../../utils/validation'
import { OrderContext } from '../../context/order-context'

const parseDateString = (value: Date, originalValue: string) => {
    return isDate(originalValue) ? originalValue : parse(originalValue, 'dd-MM-yyyy', new Date())
}

const addSchema = Yup.object().shape({
    employeeId: Yup.string(),
    customerEmail: Yup.string().email('Podano niepoprawny adres').required('Email jest wymagany'),
    title: Yup.string().required('Tytuł jest wymagany'),
    issueTime: Yup.date()
        .transform(parseDateString)
        .max(new Date())
        .required('Wymagana jest poprawna data wystapienia usterki'),
    details: Yup.string().required('Opis jest wymagany'),
})

const initialData: TAddOrderData = {
    employeeId: '',
    customerEmail: '',
    title: '',
    issueTime: new Date(),
    details: '',
}

export const AddOrder = () => {
    const { id } = useContext(UserContext)
    const { setAddOrderEnable } = useContext(OrderContext)
    const [users, setUsers] = useState<TOrderEmployees[]>([])
    const [isReady, setReady] = useState<boolean>(false)
    const [isCreated, setCreated] = useState<boolean>(false)
    const [isLoading, setLoading] = useState<boolean>(false)
    const [validationMessage, setValidationMessage] = useState<string>('')
    const [statusCode, setStatusCode] = useState<number>(0)

    const handleClose = (e: MouseEvent<HTMLButtonElement>) => {
        setAddOrderEnable(false)

        if (isCreated) {
            window.location.reload()
        }
    }

    const reloadPage = (e: MouseEvent<HTMLButtonElement>) => {
        window.location.reload()
    }

    useEffect(() => {
        getOrderEmployees()
            .then((data) => {
                const users: TOrderEmployees[] = []
                data.data.map((user: TOrderEmployees) => {
                    const userData: TOrderEmployees = {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                    }

                    users.push(userData)
                })

                setUsers(users)
                setReady(true)
            })
            .catch((err) => {
                console.log(err.message)
                setReady(true)
            })

        return () => {}
    }, [])

    return (
        <div className={'overlay'}>
            <div className={'overlay-content'}>
                <section className={'modal add-order'}>
                    {isReady ? (
                        <>
                            <h2 className={'add-order-title'}>{'Dodaj zlecenie'}</h2>
                            <Formik
                                initialValues={initialData}
                                validationSchema={addSchema}
                                onSubmit={async (values, actions) => {
                                    setLoading(true)
                                    const response: TAddOrderResponse = await addNewOrder(values)
                                    const message: string = getValidationAddOrderMessage(
                                        response.statusCode
                                    )
                                    setValidationMessage(message)
                                    setStatusCode(response.statusCode)
                                    setLoading(false)
                                    setCreated(true)
                                }}
                            >
                                {({ values, errors, touched, setFieldValue }) => (
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
                                                {statusCode === HTTP_CODE.CREATED ? (
                                                    <button
                                                        onClick={(e) => reloadPage(e)}
                                                        className={'button validation-reload'}
                                                    >
                                                        {'Odśwież strone'}
                                                    </button>
                                                ) : null}
                                            </span>
                                        )}
                                        <Form className={'form'}>
                                            <div className={'form-group'}>
                                                <div>
                                                    <label htmlFor={'title'}>{'Tytuł'}</label>
                                                    <Field
                                                        className={
                                                            errors.title && touched.title
                                                                ? 'form-field-error'
                                                                : ''
                                                        }
                                                        id={'title'}
                                                        name={'title'}
                                                        autoComplete={'off'}
                                                    />
                                                    {errors.title && touched.title ? (
                                                        <span className={'form-error'}>
                                                            {errors.title}
                                                        </span>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className={'form-group'}>
                                                <div>
                                                    <label htmlFor={'customerEmail'}>
                                                        {'Email klienta'}
                                                    </label>
                                                    <Field
                                                        className={
                                                            errors.customerEmail &&
                                                            touched.customerEmail
                                                                ? 'form-field-error'
                                                                : ''
                                                        }
                                                        id={'customerEmail'}
                                                        name={'customerEmail'}
                                                        autoComplete={'off'}
                                                    />
                                                    {errors.customerEmail &&
                                                    touched.customerEmail ? (
                                                        <span className={'form-error'}>
                                                            {errors.customerEmail}
                                                        </span>
                                                    ) : null}
                                                </div>
                                                <div>
                                                    <label htmlFor={'employeeId'}>
                                                        {'Serwisant'}
                                                    </label>
                                                    <Field
                                                        as={'select'}
                                                        className={''}
                                                        id={'employeeId'}
                                                        name={'employeeId'}
                                                        defaultValue={id}
                                                    >
                                                        {users.map((user: TOrderEmployees) => (
                                                            <option key={user.id} value={user.id}>
                                                                {user.firstName} {user.lastName}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                </div>
                                            </div>
                                            <div className={'form-group'}>
                                                <div>
                                                    <label htmlFor={'details'}>
                                                        {'Szczegóły dotyczące sprzetu'}
                                                    </label>
                                                    <Field
                                                        as={'textarea'}
                                                        className={
                                                            errors.details && touched.details
                                                                ? 'form-field-error'
                                                                : ''
                                                        }
                                                        id={'details'}
                                                        name={'details'}
                                                        autoComplete={'details'}
                                                        rows={8}
                                                    />
                                                    {errors.details && touched.details ? (
                                                        <span className={'form-error'}>
                                                            {errors.details}
                                                        </span>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className={'form-group'}>
                                                <div>
                                                    <label htmlFor={'issueTime'}>
                                                        {'Data wystąpienia usterki'}
                                                    </label>
                                                    <DatePicker
                                                        selected={values.issueTime}
                                                        dateFormat="dd-MM-yyyy"
                                                        name="issueTime"
                                                        onChange={(date: Date) => {
                                                            console.log(date)
                                                            setFieldValue('issueTime', date)
                                                        }}
                                                    />
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
                                                            {'Tworzenie'}
                                                        </>
                                                    ) : (
                                                        'Utwórz'
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
