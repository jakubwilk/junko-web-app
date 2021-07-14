import './edit-user.scss'
import { ChangeEvent, MouseEvent, useContext, useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { TEditUserData } from '../../types/auth.types'
import { ROLES, SELECT_ROLES } from '../../constants/roles'
import { TUserSelectRole } from '../../types/constants.types'
import { AuthContext } from '../../context/auth-context'
import { UserContext } from '../../context/user-context'

const initialData: TEditUserData = {
    file: undefined,
    firstName: '',
    lastName: '',
    password: '',
    city: '',
    phoneNumber: '',
    role: 0,
}

export const EditUser = () => {
    const { clearUserContext } = useContext(UserContext)
    const { role } = useContext(AuthContext)
    const [data, setData] = useState<TEditUserData>(initialData)
    const [isReady, setReady] = useState<boolean>(false)
    const [isLoading, setLoading] = useState<boolean>(false)

    const handleClose = (e: MouseEvent<HTMLButtonElement>) => {
        clearUserContext()
    }

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement

        console.log(input.files)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const input = e.target as HTMLInputElement

        setData({
            ...data,
            [input.name]: input.value,
        })
    }

    useEffect(() => {
        setReady(true)
    }, [])

    return (
        <div className={'overlay'}>
            <div className={'overlay-content'}>
                <section className={'modal edit-user'}>
                    {isReady ? (
                        <>
                            <h2 className={'edit-user-title'}>{'Edytuj użytkownika'}</h2>
                            <form className={'form'}>
                                <div className={'form-group'}>
                                    <div>
                                        <label htmlFor={'file'}>{'Zdjęcie'}</label>
                                        <input
                                            type={'file'}
                                            className={''}
                                            id={'file'}
                                            name={'file'}
                                            autoComplete={'off'}
                                            onChange={(e) => handleFile(e)}
                                        />
                                    </div>
                                </div>
                                <div className={'form-group'}>
                                    <div>
                                        <label htmlFor={'firstName'}>{'Imię'}</label>
                                        <input
                                            type={'text'}
                                            className={''}
                                            id={'firstName'}
                                            name={'firstName'}
                                            value={data.firstName}
                                            autoComplete={'off'}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={'lastName'}>{'Nazwisko'}</label>
                                        <input
                                            type={'text'}
                                            className={''}
                                            id={'lastName'}
                                            name={'lastName'}
                                            value={data.lastName}
                                            autoComplete={'off'}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                </div>
                                <div
                                    className={
                                        role === ROLES.OWNER ? 'form-group multi' : 'form-group'
                                    }
                                >
                                    <div>
                                        <label htmlFor={'password'}>{'Hasło'}</label>
                                        <input
                                            type={'password'}
                                            className={''}
                                            id={'password'}
                                            name={'password'}
                                            value={data.password}
                                            autoComplete={'off'}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                    {role === ROLES.OWNER ? (
                                        <div>
                                            <label htmlFor={'role'}>{'Rola'}</label>
                                            <select
                                                className={''}
                                                id={'role'}
                                                name={'role'}
                                                value={data.role}
                                                onChange={(e) => handleChange(e)}
                                            >
                                                {SELECT_ROLES.map((role: TUserSelectRole) => (
                                                    <option key={role.id} value={role.id}>
                                                        {role.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    ) : null}
                                </div>
                                <div className={'form-group'}>
                                    <div>
                                        <label htmlFor={'city'}>{'Miasto'}</label>
                                        <input
                                            type={'text'}
                                            className={''}
                                            id={'city'}
                                            name={'city'}
                                            value={data.city}
                                            autoComplete={'off'}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={'phoneNumber'}>{'Numer telefonu'}</label>
                                        <input
                                            type={'text'}
                                            className={''}
                                            id={'phoneNumber'}
                                            name={'phoneNumber'}
                                            value={data.phoneNumber}
                                            autoComplete={'off'}
                                            onChange={(e) => handleChange(e)}
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
                                                {'Zapisywanie'}
                                            </>
                                        ) : (
                                            'Zapisz'
                                        )}
                                    </button>
                                    <button
                                        className={'button form-button form-button-cancel'}
                                        type={'button'}
                                        onClick={(e) => handleClose(e)}
                                    >
                                        {'Anuluj'}
                                    </button>
                                </div>
                            </form>
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
