import { useEffect, useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { useHistory, useParams } from 'react-router'
import { activeUser } from '../../api/auth'
import logo from '../../../assets/images/logo-site.png'
import { TStatusClass } from '../../types/auth.types'
import './activate.scss'

const accountActive: string =
    'Konto zostało aktywowane, za chwilę nastąpi przeniesienie na stronę logowania.'
const accountInactive: string =
    'Wystąpił problem z aktywacją konta. Klucz jest niepoprawny albo konto zostało już wcześniej aktywowane.'

const ActiveAccount = () => {
    const history = useHistory()
    const [isReady, setReady] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [statusClassName, setStatusClassName] = useState<TStatusClass>('inactive')
    const { token } = useParams<{ token: string }>()

    useEffect(() => {
        activeUser(token)
            .then((data) => {
                if (data.statusCode === 400) {
                    setMessage(accountInactive)
                } else {
                    setMessage(accountActive)
                    setStatusClassName('active')

                    setTimeout(() => {
                        history.push('/')
                    }, 3000)
                }
            })
            .catch((err) => console.log(err))

        setReady(true)

        return () => {
            setReady(false)
        }
    })

    return isReady ? (
        <>
            <Helmet>
                <title>{'Junko | Aktywacja konta'}</title>
            </Helmet>

            <div className={'activate'}>
                <div className={'activate-content'}>
                    <h1 className={'activate-title'}>
                        <img src={logo} alt={'Czarne logo junko z niebieskiem logotypem'} />
                    </h1>
                    <p className={`activate-text ${statusClassName}`}>{message}</p>
                    {statusClassName === 'inactive' ? (
                        <Link className={'activate-back'} to={'/'}>
                            {'Powrót do strony głównej'}
                        </Link>
                    ) : null}
                </div>
            </div>
        </>
    ) : (
        <div className={'page-loader'}>
            <ClipLoader color={'rgba(105, 165, 254, 1)'} loading={isReady} size={125} />
        </div>
    )
}

export default ActiveAccount
