import { MouseEvent, useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { NavLink, Route, Switch } from 'react-router-dom'
import DashboardNavigation from '../../components/navigation/DashboardNavigation'
import { adminMenu } from '../../constants/nav'
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

const AdminDashboard = () => {
    const { id, email, role, firstName, lastName, clearAuthContext } = useContext(AuthContext)
    const { isEditEnable } = useContext(UserContext)
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
        <div className={'admin-page'}>
            <Helmet>
                <title>{'Junko | Panel pracownika'}</title>
            </Helmet>

            <DashboardNavigation>
                <ul className={'navigation-menu'}>
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
                    <UsersPage />
                </Route>
                <Route path={'/dashboard/orders'}>
                    {role === ROLES.OWNER || role === ROLES.EMPLOYEE ? <OrdersPage /> : null}
                    {role === ROLES.USER ? <UserMainPage /> : null}
                </Route>
            </Switch>

            {isEditEnable ? <EditUser /> : null}
        </div>
    ) : null
}

export default AdminDashboard
