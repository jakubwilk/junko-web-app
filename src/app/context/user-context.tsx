import { createContext, useState } from 'react'
import { TContextBody } from '../types/context.types'
import { IUserContext } from '../interfaces/context.interface'

const initialValue: IUserContext = {
    id: '',
    isEditEnable: false,
    isOrderEnable: false,
    isEditOrderEnable: false,
    setId: (id: string) => {},
    setEditEnable: (value: boolean) => {},
    setOrderEnable: (value: boolean) => {},
    setEditOrderEnable: (value: boolean) => {},
    clearUserContext: () => {},
}

export const UserContext = createContext<IUserContext>(initialValue)

export const UserContextProvider = (props: TContextBody) => {
    const [id, setId] = useState<string>('')
    const [isEditEnable, setEditEnable] = useState<boolean>(false)
    const [isOrderEnable, setOrderEnable] = useState<boolean>(false)
    const [isEditOrderEnable, setEditOrderEnable] = useState<boolean>(false)

    const clearUserContext = () => {
        setId('')
        setEditEnable(false)
        setOrderEnable(false)
        setEditOrderEnable(false)
    }

    return (
        <UserContext.Provider
            value={{
                id,
                isEditEnable,
                isOrderEnable,
                isEditOrderEnable,
                setId,
                setEditEnable,
                setOrderEnable,
                setEditOrderEnable,
                clearUserContext,
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}
