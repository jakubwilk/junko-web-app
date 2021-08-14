import { MouseEvent, useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { NavLink, Route, Switch } from 'react-router-dom'
import DashboardNavigation from '../../components/navigation/DashboardNavigation'
import { adminMenu, userMenu } from '../../constants/nav'
import { TDashboardNavigation } from '../../types/navigation'
import UsersPage from '../users/Users'
import Greetings from '../../components/navigation/Greetings'
import { AuthContext } from '../../context/auth-context'
import './dashboard.scss'
import { deleteUserSession } from '../../api/auth'
import { TResponseLogoutUser } from '../../types/auth.types'
import { HTTP_CODE } from '../../constants/http'
import { useHistory } from 'react-router'
import { EditUser } from '../../components/users/EditUser'
import { UserContext } from '../../context/user-context'
import { ROLES } from '../../constants/roles'
import { AdminMainPage } from './AdminPage'
import { UserMainPage } from './UserPage'
import { OrdersPage } from '../orders/Orders'
import { AddOrder } from '../../components/orders/AddOrder'
import { EditOrder } from '../../components/orders/EditOrder'
import { OrderHistory } from '../../components/orders/OrderHistory'
import { OrderContext } from '../../context/order-context'
import { MyOrders } from '../orders/MyOrders'
import { HistoryPage } from '../orders/OrdersHistory'

const AdminDashboard = () => {
    const { id, email, role, firstName, lastName, clearAuthContext } = useContext(AuthContext)
    const { isEditEnable } = useContext(UserContext)
    const { isEditOrderEnable, isAddOrderEnable, isOrderHistoryEnable } = useContext(OrderContext)
    const [isReady, setReady] = useState<boolean>(false)
    const history = useHistory()

    const handleLogout = async (e: MouseEvent<HTMLButtonElement>) => {
        const response: TResponseLogoutUser = await deleteUserSession(id)

        if (response.statusCode === HTTP_CODE.OK) {
            clearAuthContext()
            history.push('/sign-in')
        }
    }

    useEffect(() => {
        setReady(true)

        return () => {
            setReady(false)
        }
    }, [])

    return isReady ? (
        <div className={role === ROLES.USER ? 'user-page' : 'admin-page'}>
            <Helmet>
                <title>{'Junko | Panel pracownika'}</title>
            </Helmet>

            <DashboardNavigation>
                <ul className={'navigation-menu'}>
                    {role === ROLES.EMPLOYEE || role === ROLES.OWNER ? (
                        <>
                            {adminMenu.map((item: TDashboardNavigation) => (
                                <li key={item.key} className={'navigation-item'}>
                                    <NavLink
                                        className={'navigation-link'}
                                        activeClassName={'navigation-active'}
                                        to={item.url}
                                        title={item.title}
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}
                        </>
                    ) : (
                        <>
                            {userMenu.map((item: TDashboardNavigation) => (
                                <li key={item.key} className={'navigation-item'}>
                                    <NavLink
                                        className={'navigation-link'}
                                        activeClassName={'navigation-active'}
                                        to={item.url}
                                        title={item.title}
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}
                        </>
                    )}
                </ul>
                <Greetings
                    email={email}
                    firstName={firstName}
                    lastName={lastName}
                    handleLogout={handleLogout}
                />
            </DashboardNavigation>

            <Switch>
                <Route exact path={'/dashboard'}>
                    {role === ROLES.OWNER || role === ROLES.EMPLOYEE ? <AdminMainPage /> : null}
                    {role === ROLES.USER ? <UserMainPage /> : null}
                </Route>
                <Route path={'/dashboard/users'}>
                    {role === ROLES.OWNER || role === ROLES.EMPLOYEE ? <UsersPage /> : null}
                    {role === ROLES.USER ? <UsersPage /> : null}
                </Route>
                <Route path={'/dashboard/orders'}>
                    {role === ROLES.OWNER || role === ROLES.EMPLOYEE ? <OrdersPage /> : null}
                    {role === ROLES.USER ? <UserMainPage /> : null}
                </Route>
                <Route path={'/dashboard/my-orders'}>
                    {role === ROLES.OWNER || role === ROLES.EMPLOYEE ? <MyOrders /> : null}
                    {role === ROLES.USER ? <UserMainPage /> : null}
                </Route>
                <Route path={'/dashboard/history'}>
                    {role === ROLES.USER ? <HistoryPage /> : null}
                </Route>
            </Switch>

            {isEditEnable ? <EditUser /> : null}
            {isAddOrderEnable ? <AddOrder /> : null}
            {isEditOrderEnable ? <EditOrder /> : null}
            {isOrderHistoryEnable ? <OrderHistory /> : null}
        </div>
    ) : null
}

export default AdminDashboard
