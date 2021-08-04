import { MouseEvent, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth-context'
import { Form, Formik, Field } from 'formik'
import './order-history.scss'
import { THistoryOrderData } from '../../types/order.types'
import { ClipLoader } from 'react-spinners'
import { OrderContext } from '../../context/order-context'
import DatePicker from 'react-datepicker'
import * as Yup from 'yup'
import { parse, isDate } from 'date-fns'

const parseDateString = (value: Date, originalValue: string) => {
    return isDate(originalValue) ? originalValue : parse(originalValue, 'dd-MM-yyyy', new Date())
}

const historySchema = Yup.object().shape({
    title: Yup.string().required('Tytuł jest wymagany'),
    date: Yup.date()
        .transform(parseDateString)
        .max(new Date())
        .required('Wymagana jest poprawna data wystapienia usterki'),
    description: Yup.string().required('Opis jest wymagany'),
})

const initial: THistoryOrderData = {
    title: '',
    description: '',
    date: new Date(),
}

export const OrderHistory = () => {
    const { role } = useContext(AuthContext)
    const { setOrderHistoryEnable } = useContext(OrderContext)
    const [isLoading, setLoading] = useState<boolean>(false)
    const [isReady, setReady] = useState<boolean>(false)

    const handleClose = (e: MouseEvent<HTMLButtonElement>) => {
        setOrderHistoryEnable(false)
    }

    useEffect(() => {
        setReady(true)

        return () => {}
    }, [])

    return (
        <div className={'overlay'}>
            <div className={'overlay-content'}>
                <section className={'modal order-history'}>
                    {isReady ? (
                        <>
                            <h2 className={'edit-order-title'}>{'Historia zlecenia'}</h2>
                            <Formik
                                initialValues={initial}
                                validationSchema={historySchema}
                                onSubmit={async (values, actions) => {
                                    setLoading(true)
                                }}
                            >
                                {({ values, errors, touched, setFieldValue }) => (
                                    <>
                                        <Form className={'form'}>
                                            <h3>Dodaj nową historię</h3>
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
                                                        dateFormat="dd-MM-yyyy"
                                                        name="date"
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
                                                            errors.description &&
                                                            touched.description
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
                                        <div className={'button-group'}>
                                            <button
                                                className={'button form-button form-button-cancel'}
                                                type={'button'}
                                                onClick={(e) => handleClose(e)}
                                            >
                                                {'Zamknij'}
                                            </button>
                                        </div>
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
