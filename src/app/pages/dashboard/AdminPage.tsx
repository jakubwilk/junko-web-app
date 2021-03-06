import UserGreetings from '../../components/dashboard/UserGreetings'
import AdminStatistics from '../../components/dashboard/AdminStatistics'
import { useEffect, useState } from 'react'
import { TOrdersTableData } from '../../types/order.types'
import { getOrdersList } from '../../api/order'
import { ClipLoader } from 'react-spinners'
import { format } from 'date-fns'
import { pl } from 'date-fns/locale'

export const AdminMainPage = () => {
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

    useEffect(() => {
        getOrdersList()
            .then((data) => {
                const orders: TOrdersTableData[] = data.data
                setData(orders)
                setReady(true)
            })
            .catch((err) => {
                console.log(err)
                setReady(true)
            })

        return () => {}
    }, [])

    return (
        <div className={'grid'}>
            <div className={'orders'}>
                {isReady ? (
                    <>
                        {data.map((item: TOrdersTableData) => (
                            <div key={item.orderId} className={'orders-item'}>
                                <div>
                                    <h2 className={'orders-title'}>
                                        {'Klient: '}
                                        <span>{item.client}</span>
                                    </h2>
                                    <h2 className={'orders-title'}>
                                        {'Serwisant: '}
                                        <span>{item.employee}</span>
                                    </h2>
                                    <p className={'orders-time'}>
                                        <time dateTime={String(item.startDate)}>
                                            {'Data rozpoczęcia: '}
                                            <span>
                                                {format(new Date(item.startDate), 'dd-MM-yyyy', {
                                                    locale: pl,
                                                })}
                                            </span>
                                        </time>
                                        <time dateTime={String(item.modifyDate)}>
                                            {'Data ostatniej modyfikacji: '}
                                            <span>
                                                {format(new Date(item.modifyDate), 'dd-MM-yyyy', {
                                                    locale: pl,
                                                })}
                                            </span>
                                        </time>
                                    </p>
                                </div>
                                <div>
                                    <span className={'orders-status'}>
                                        {displayOrderStatus(item.status)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <div className={'orders-loader'}>
                        <ClipLoader loading={!isReady} size={120} color={'rgba(0, 123, 255, 1)'} />
                    </div>
                )}
            </div>
            <div className={'main'}>
                <UserGreetings />
                <AdminStatistics />
            </div>
        </div>
    )
}
