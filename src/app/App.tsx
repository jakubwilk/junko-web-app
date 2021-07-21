import { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import PrivateRoute from './components/router/PrivateRoute'
import { getUserSession } from './api/auth'
import { TResponseCheckUserRole } from './types/auth.types'
import { AuthContext } from './context/auth-context'
import AdminDashboard from './pages/dashboard/Dashboard'
import NoMatch from './pages/no-match/NoMatch'
import { HTTP_CODE } from './constants/http'
import { TUserBasicResponseData } from './types/user.types'
import { getUserData } from './api/user'
import { Redirect } from 'react-router'
import ActiveAccount from './pages/active/ActiveAccount'

const App = () => {
    const [isReady, setReady] = useState<boolean>(false)
    const { setId, setRole, setEmail, setFirstName, setLastName } = useContext(AuthContext)

    useEffect(() => {
        ;(async () => {
            const userSession: TResponseCheckUserRole = await getUserSession()
            if (userSession.statusCode === HTTP_CODE.OK) {
                setId(userSession.userId)
                setRole(userSession.userRole)

                const userBasicData: TUserBasicResponseData = await getUserData(userSession.userId)
                setEmail(userBasicData.data.email)
                setFirstName(userBasicData.data.firstName)
                setLastName(userBasicData.data.lastName)
            }

            setReady(true)
        })()

        return () => {
            setReady(false)
        }
    }, [setEmail, setFirstName, setId, setLastName, setRole])

    return isReady ? (
        <Router>
            <Switch>
                <Route exact path={'/'}>
                    <Redirect to={'/sign-in'} />
                </Route>
                <Route path={'/sign-in'}>
                    <Login />
                </Route>
                <Route path={'/sign-up'}>
                    <Register />
                </Route>
                <Route path={'/auth/active/:token'}>
                    <ActiveAccount />
                </Route>
                <PrivateRoute component={AdminDashboard} path={'/dashboard'} exact={false} />
                <Route path={'*'}>
                    <NoMatch />
                </Route>
            </Switch>
        </Router>
    ) : null
}

export default App
