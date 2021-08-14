import { MouseEvent, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth-context'
import { Form, Formik, Field } from 'formik'
import './order-history.scss'
import {
    TAddOrderHistoryData,
    TAddOrderResponse,
    THistoryOrderData,
    TOrderHistoryData,
} from '../../types/order.types'
import { ClipLoader } from 'react-spinners'
import { OrderContext } from '../../context/order-context'
import DatePicker from 'react-datepicker'
import * as Yup from 'yup'
import { addOrderHistory, getOrderHistory } from '../../api/order'
import { getValidationAddOrderHistoryMessage } from '../../utils/validation'
import { ROLES } from '../../constants/roles'
import { HTTP_CODE } from '../../constants/http'
import { format } from 'date-fns'
import { pl } from 'date-fns/locale'

const historySchema = Yup.object().shape({
    title: Yup.string().required('Tytuł jest wymagany'),
    description: Yup.string().required('Opis jest wymagany'),
})

const initial: THistoryOrderData = {
    title: '',
    description: '',
    date: new Date(),
}

export const OrderHistory = () => {
    const { role } = useContext(AuthContext)
    const { id, clearOrderContext } = useContext(OrderContext)
    const [data, setData] = useState<TAddOrderHistoryData[]>([])
    const [isLoading, setLoading] = useState<boolean>(false)
    const [isReady, setReady] = useState<boolean>(false)
    const [validationMessage, setValidationMessage] = useState<string>('')
    const [statusCode, setStatusCode] = useState<number>(0)

    const handleClose = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        clearOrderContext()
    }

    const displayOrderHistory = () => {
        getOrderHistory(id)
            .then((data) => {
                const respondeData: TAddOrderHistoryData[] = []

                data.data.map((item: TOrderHistoryData) => {
                    const dataObj: TAddOrderHistoryData = {
                        id: item.id,
                        title: item.title,
                        description: item.description,
                        time: new Date(item.created_at),
                    }

                    return respondeData.push(dataObj)
                })

                setData(respondeData)
            })
            .catch((err) => console.log(err))

        setReady(true)
    }

    useEffect(() => {
        displayOrderHistory()

        return () => {}
    })

    return (
        <div className={'overlay'}>
            <div className={'overlay-content'}>
                <section className={'modal order-history'}>
                    <h2 className={'edit-order-title'}>{'Historia zlecenia'}</h2>
                    {role === ROLES.OWNER || ROLES.EMPLOYEE ? (
                        <Formik
                            initialValues={initial}
                            validationSchema={historySchema}
                            onSubmit={async (values) => {
                                setLoading(true)

                                const data: TAddOrderHistoryData = {
                                    id: id,
                                    title: values.title,
                                    description: values.description,
                                    time: values.date,
                                }

                                const response: TAddOrderResponse = await addOrderHistory(data)
                                const message: string = getValidationAddOrderHistoryMessage(
                                    response.statusCode
                                )
                                setValidationMessage(message)
                                setStatusCode(response.statusCode)
                                setLoading(false)
                                displayOrderHistory()
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
                                        </span>
                                    )}
                                    <Form className={'form'}>
                                        <h3>{'Dodaj nową historię'}</h3>
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
                                            <div>
                                                <label htmlFor={'date'}>{'Data'}</label>
                                                <DatePicker
                                                    selected={new Date(values.date)}
                                                    dateFormat="dd-MM-yyyy HH:mm"
                                                    name="date"
                                                    showTimeSelect
                                                    onChange={(date: Date) => {
                                                        setFieldValue('date', date)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className={'form-group'}>
                                            <div>
                                                <label htmlFor={'description'}>{'Opis'}</label>
                                                <Field
                                                    as={'textarea'}
                                                    className={
                                                        errors.description && touched.description
                                                            ? 'form-field-error'
                                                            : ''
                                                    }
                                                    id={'description'}
                                                    name={'description'}
                                                    autoComplete={'description'}
                                                    rows={3}
                                                />
                                                {errors.description && touched.description ? (
                                                    <span className={'form-error'}>
                                                        {errors.description}
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
                                                        {'Dodawanie'}
                                                    </>
                                                ) : (
                                                    'Dodaj'
                                                )}
                                            </button>
                                        </div>
                                    </Form>
                                </>
                            )}
                        </Formik>
                    ) : null}
                    {isReady ? (
                        <>
                            {data.length > 0 ? (
                                <div className={'order-grid'}>
                                    {data.map((item: TAddOrderHistoryData, index: number) => (
                                        <div key={index} data-id={item.id}>
                                            <h4>{item.title}</h4>
                                            <p>{item.description}</p>
                                            <time
                                                dateTime={format(
                                                    new Date(item.time),
                                                    'dd-MM-yyyy HH:mm',
                                                    {
                                                        locale: pl,
                                                    }
                                                )}
                                            >
                                                {format(new Date(item.time), 'dd-MM-yyyy HH:mm', {
                                                    locale: pl,
                                                })}
                                            </time>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className={'order-history-no-match'}>
                                    <p
                                        className={'order-history-text'}
                                    >{`Przy tym zleceniu nie zostały podjęte jeszcze ani jedne kroki`}</p>
                                </div>
                            )}
                        </>
                    ) : null}
                    <div className={'button-group'}>
                        <button
                            className={'button form-button form-button-cancel'}
                            type={'button'}
                            onClick={(e) => handleClose(e)}
                        >
                            {'Zamknij'}
                        </button>
                    </div>
                </section>
            </div>
        </div>
    )
}
