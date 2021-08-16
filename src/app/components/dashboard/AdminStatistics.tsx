import { useContext, useEffect, useState } from 'react'
import { getUsersStatistics } from '../../api/user'
import { TUsersStatistics } from '../../types/user.types'
import { AuthContext } from '../../context/auth-context'
import { getOrdersStatistics } from '../../api/order'
import { TOrdersStatistics } from '../../types/order.types'

const initialUsersData: TUsersStatistics = {
    users: 0,
    employees: 0,
}

const initialOrdersData: TOrdersStatistics = {
    orders: 0,
    activeOrders: 0,
    userOrders: 0,
}

const AdminStatistics = () => {
    const { id } = useContext(AuthContext)
    const [isReady, setReady] = useState<boolean>(false)
    const [isUsersReady, setUsersReady] = useState<boolean>(false)
    const [isOrdersReady, setOrdersReady] = useState<boolean>(false)
    const [usersData, setUsersData] = useState<TUsersStatistics>(initialUsersData)
    const [ordersData, setOrdersData] = useState<TOrdersStatistics>(initialOrdersData)

    useEffect(() => {
        getUsersStatistics()
            .then((data) => {
                console.log(data)
                const usersData: TUsersStatistics = {
                    users: data.users,
                    employees: data.employees,
                }

                setUsersData(usersData)
                setUsersReady(true)
            })
            .catch((err) => {
                console.log(err)
                setUsersReady(true)
            })

        getOrdersStatistics(id)
            .then((data) => {
                console.log(data)
                const ordersData: TOrdersStatistics = {
                    orders: data.orders,
                    activeOrders: data.activeOrders,
                    userOrders: data.userOrders,
                }

                setOrdersData(ordersData)
                setOrdersReady(true)
            })
            .catch((err) => {
                console.log(err)
                setOrdersReady(true)
            })

        setReady(true)

        return () => {
            setReady(false)
        }
    }, [])

    return isReady ? (
        <div className={'statistics'}>
            <ul className={'statistics-grid'}>
                <li className={'statistics-item'}>
                    <span className={'statistics-number'}>
                        {isUsersReady ? usersData.users : '-'}
                    </span>
                    <p className={'statistics-title'}>{'Użytkownicy'}</p>
                </li>
                <li className={'statistics-item'}>
                    <span className={'statistics-number'}>
                        {isUsersReady ? usersData.employees : '-'}
                    </span>
                    <p className={'statistics-title'}>{'Pracownicy'}</p>
                </li>
                <li className={'statistics-item'}>
                    <span className={'statistics-number'}>
                        {isOrdersReady ? ordersData.orders : '-'}
                    </span>
                    <p className={'statistics-title'}>{'Wszystkie zlecenia'}</p>
                </li>
                <li className={'statistics-item'}>
                    <span className={'statistics-number'}>
                        {isOrdersReady ? ordersData.activeOrders : '-'}
                    </span>
                    <p className={'statistics-title'}>{'Aktywne zlecenia'}</p>
                </li>
                <li className={'statistics-item'}>
                    <span className={'statistics-number'}>
                        {isOrdersReady ? ordersData.userOrders : '-'}
                    </span>
                    <p className={'statistics-title'}>{'Moje zlecenia'}</p>
                </li>
            </ul>
        </div>
    ) : null
}

export default AdminStatistics
