import './orders.scss'
import { MouseEvent, useContext, useEffect, useState } from 'react'
import { ordersTableHeaderMenu } from '../../constants/orders'
import { TOrdersTableData } from '../../types/order.types'
import { ClipLoader } from 'react-spinners'
import { getOrdersList } from '../../api/order'
import { format } from 'date-fns'
import { pl } from 'date-fns/locale'
import { OrderContext } from '../../context/order-context'

export const OrdersPage = () => {
    const { setAddOrderEnable, setEditOrderEnable } = useContext(OrderContext)
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

    const openAddOrderModal = (e: MouseEvent<HTMLButtonElement>, value: boolean) => {
        setAddOrderEnable(value)
    }

    const openEditOrderModal = (e: MouseEvent<HTMLButtonElement>, value: boolean) => {
        setEditOrderEnable(value)
    }

    useEffect(() => {
        getOrdersList()
            .then((data) => {
                const orders: TOrdersTableData[] = data.data
                console.log(orders)
                setData(orders)
                setReady(true)
            })
            .catch((err) => {
                console.log(err)
                setReady(true)
            })

        return () => {}
    }, [])

    console.log(data)

    return (
        <section className={'orders'}>
            <div className={'container'}>
                <header className={'orders-header'}>
                    <h2 className={'orders-title'}>{'Zlecenia'}</h2>
                    <button
                        className={'button orders-button-add'}
                        onClick={(e) => openAddOrderModal(e, true)}
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
                                                    <span>{index + 1}</span>
                                                </div>
                                                <div className={'orders-table-cell'}>
                                                    <span>{item.client}</span>
                                                </div>
                                                <div className={'orders-table-cell'}>
                                                    <span>
                                                        {format(
                                                            new Date(item.startDate),
                                                            'dd-MM-yyyy',
                                                            { locale: pl }
                                                        )}
                                                    </span>
                                                </div>
                                                <div className={'orders-table-cell'}>
                                                    <span>
                                                        {format(
                                                            new Date(item.modifyDate),
                                                            'dd-MM-yyyy',
                                                            { locale: pl }
                                                        )}
                                                    </span>
                                                </div>
                                                <div className={'orders-table-cell'}>
                                                    <span>{item.employee}</span>
                                                </div>
                                                <div className={'orders-table-cell'}>
                                                    <strong>
                                                        {displayOrderStatus(item.status)}
                                                    </strong>
                                                </div>
                                                <div className={'orders-table-buttons'}>
                                                    <button
                                                        className={'button orders-table-button'}
                                                        onClick={(e) => openEditOrderModal(e, true)}
                                                    >
                                                        {'Edytuj'}
                                                    </button>
                                                    <button
                                                        className={'button orders-table-button'}
                                                    >
                                                        {'Historia'}
                                                    </button>
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
