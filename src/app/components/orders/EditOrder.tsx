import './edit-order.scss'
import { MouseEvent, useContext, useEffect, useState } from 'react'
import { OrderContext } from '../../context/order-context'
import { Form, Formik, Field } from 'formik'
import * as Yup from 'yup'
import {
    TAddOrderResponse,
    TEditOrderData,
    TOrderEmployees,
    TOrderStatus,
} from '../../types/order.types'
import { addNewOrder, editOrder, saveEditOrder } from '../../api/order'
import { getValidationAddOrderMessage, getValidationEditOrderMessage } from '../../utils/validation'
import { HTTP_CODE } from '../../constants/http'
import { ClipLoader } from 'react-spinners'
import DatePicker from 'react-datepicker'
import { ordersStatus } from '../../constants/orders'

const initial: TEditOrderData = {
    clientEmail: '',
    created_at: '',
    details: '',
    employeeId: '',
    id: '',
    issueTime: '',
    status: 1,
    title: '',
    updated_at: '',
}

export const EditOrder = () => {
    const { id, setEditOrderEnable } = useContext(OrderContext)
    const [initialData, setInitialData] = useState<TEditOrderData>(initial)
    const [users, setUsers] = useState<TOrderEmployees[]>([])
    const [isEdited, setEdited] = useState<boolean>(false)
    const [isReady, setReady] = useState<boolean>(false)
    const [validationMessage, setValidationMessage] = useState<string>('')
    const [statusCode, setStatusCode] = useState<number>(0)
    const [isLoading, setLoading] = useState<boolean>(false)

    const handleClose = (e: MouseEvent<HTMLButtonElement>) => {
        setEditOrderEnable(false)

        if (isEdited) {
            window.location.reload()
        }
    }

    const reloadPage = (e: MouseEvent<HTMLButtonElement>) => {
        window.location.reload()
    }

    useEffect(() => {
        editOrder(id)
            .then((data) => {
                setInitialData(data.order)
                setUsers(data.users)
                setReady(true)
            })
            .catch((err) => {
                setReady(true)
            })

        return () => {}
    }, [])

    return (
        <div className={'overlay'}>
            <div className={'overlay-content'}>
                <section className={'modal edit-order'}>
                    {isReady ? (
                        <>
                            <h2 className={'edit-order-title'}>{'Edytuj zlecenie'}</h2>
                            <Formik
                                initialValues={initialData}
                                validationSchema={null}
                                onSubmit={async (values, actions) => {
                                    setLoading(true)
                                    const response: TAddOrderResponse = await saveEditOrder(values)
                                    const message: string = getValidationEditOrderMessage(
                                        response.statusCode
                                    )

                                    console.log(response)

                                    setValidationMessage(message)
                                    setStatusCode(response.statusCode)
                                    setLoading(false)
                                    setEdited(true)
                                }}
                            >
                                {({ values, errors, touched, setFieldValue }) => (
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
                                                {statusCode === HTTP_CODE.OK ? (
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
                                                    <label htmlFor={'clientEmail'}>
                                                        {'Email klienta'}
                                                    </label>
                                                    <Field
                                                        className={
                                                            errors.clientEmail &&
                                                            touched.clientEmail
                                                                ? 'form-field-error'
                                                                : ''
                                                        }
                                                        id={'clientEmail'}
                                                        name={'clientEmail'}
                                                        autoComplete={'off'}
                                                    />
                                                    {errors.clientEmail && touched.clientEmail ? (
                                                        <span className={'form-error'}>
                                                            {errors.clientEmail}
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
                                                        value={initialData.employeeId}
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
                                                        selected={new Date(values.issueTime)}
                                                        dateFormat="dd-MM-yyyy"
                                                        name="issueTime"
                                                        onChange={(date: Date) => {
                                                            setFieldValue('issueTime', date)
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor={'status'}>
                                                        {'Zmień status zlecenia'}
                                                    </label>
                                                    <Field
                                                        as={'select'}
                                                        className={''}
                                                        id={'status'}
                                                        name={'status'}
                                                        value={initialData.status}
                                                    >
                                                        {ordersStatus.map(
                                                            (status: TOrderStatus) => (
                                                                <option
                                                                    key={status.id}
                                                                    value={status.value}
                                                                >
                                                                    {status.name}
                                                                </option>
                                                            )
                                                        )}
                                                    </Field>
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
                                                            {'Edytowanie'}
                                                        </>
                                                    ) : (
                                                        'Edytuj'
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
                    ) : null}
                </section>
            </div>
        </div>
    )
}
