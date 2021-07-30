import { IOrderContext } from '../interfaces/context.interface'
import { createContext, useState } from 'react'
import { TContextBody } from '../types/context.types'

const initialValues: IOrderContext = {
    id: '',
    isAddOrderEnable: false,
    isEditOrderEnable: false,
    setId: (id: string) => {},
    setAddOrderEnable: (value: boolean) => {},
    setEditOrderEnable: (value: boolean) => {},
    clearOrderContext: () => {},
}

export const OrderContext = createContext<IOrderContext>(initialValues)

export const OrderContextProvider = (props: TContextBody) => {
    const [id, setId] = useState<string>('')
    const [isAddOrderEnable, setAddOrderEnable] = useState<boolean>(false)
    const [isEditOrderEnable, setEditOrderEnable] = useState<boolean>(false)

    const clearOrderContext = () => {
        setId('')
        setAddOrderEnable(false)
        setEditOrderEnable(false)
    }

    return (
        <OrderContext.Provider
            value={{
                id,
                isAddOrderEnable,
                isEditOrderEnable,
                setId,
                setAddOrderEnable,
                setEditOrderEnable,
                clearOrderContext,
            }}
        >
            {props.children}
        </OrderContext.Provider>
    )
}
