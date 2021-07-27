import './orders.scss'
import { MouseEvent, useContext, useEffect, useState } from 'react'
import { ordersTableFakeData, ordersTableHeaderMenu } from '../../constants/orders'
import { TOrdersTableData } from '../../types/order.types'
import { ClipLoader } from 'react-spinners'
import { UserContext } from '../../context/user-context'

export const OrdersPage = () => {
    const { setOrderEnable } = useContext(UserContext)
    const [isReady, setReady] = useState<boolean>(false)
    const [data, setData] = useState<TOrdersTableData[]>([])

    const displayOrderStatus = (status: number) => {
        switch (status) {
            case 1:
                return <span className={'active'}>{'Aktywne'}</span>
            case 2:
                return <span className={'in-progress'}>{'W trakcie'}</span>
            case 3:
                return <span className={'completed'}>{'Zakończone'}</span>
            default:
                return <span className={'active'}>{'Aktywne'}</span>
        }
    }

    const openModal = (e: MouseEvent<HTMLButtonElement>, value: boolean) => {
        setOrderEnable(value)
    }

    useEffect(() => {
        setTimeout(() => {
            setData(ordersTableFakeData)
            setReady(true)
        }, 5000)

        return () => {}
    }, [])

    return (
        <section className={'orders'}>
            <div className={'container'}>
                <header className={'orders-header'}>
                    <h2 className={'orders-title'}>{'Zlecenia'}</h2>
                    <button
                        className={'button orders-button-add'}
                        onClick={(e) => openModal(e, true)}
                    >
                        {'Dodaj zlecenie'}
                    </button>
                </header>
                <div className={'orders-list'}>
                    <div className={'orders-table'}>
                        <header className={'orders-table-head'}>
                            <div className={'orders-table-header'}>
                                {ordersTableHeaderMenu.map((item, index) => (
                                    <div key={index} className={'orders-table-cell'}>
                                        <span>{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </header>
                        {isReady ? (
                            <main className={'orders-table-body'}>
                                {data.length > 0 ? (
                                    <>
                                        {data.map((item, index) => (
                                            <div key={index} className={'orders-table-body-row'}>
                                                <div className={'orders-table-cell'}>
                                                    <span>{item.id}</span>
                                                </div>
                                                <div className={'orders-table-cell'}>
                                                    <span>{item.client}</span>
                                                </div>
                                                <div className={'orders-table-cell'}>
                                                    <span>{item.createdAt}</span>
                                                </div>
                                                <div className={'orders-table-cell'}>
                                                    <span>{item.updatedAt}</span>
                                                </div>
                                                <div className={'orders-table-cell'}>
                                                    <span>{item.owner}</span>
                                                </div>
                                                <div className={'orders-table-cell'}>
                                                    <strong>
                                                        {displayOrderStatus(item.status)}
                                                    </strong>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <div className={'orders-table-body-no-row'}>
                                        <div className={'orders-table-cell'}>
                                            <span>
                                                {'Żadne zlecenia nie zostały dodane do bazy danych'}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </main>
                        ) : (
                            <main className={'orders-table-body'}>
                                <div className={'orders-table-body-loading-row'}>
                                    <div className={'orders-table-cell'}>
                                        <ClipLoader
                                            loading={!isReady}
                                            size={120}
                                            color={'rgba(0, 123, 255, 1)'}
                                        />
                                    </div>
                                </div>
                            </main>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
