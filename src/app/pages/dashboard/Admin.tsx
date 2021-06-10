import { useContext, useEffect, useState, MouseEvent } from 'react';
import { Helmet } from 'react-helmet';
import { NavLink, Route, Switch } from 'react-router-dom';
import DashboardNavigation from '../../components/navigation/DashboardNavigation';
import { adminMenu } from '../../constants/nav';
import { TDashboardNavigation } from '../../types/navigation';
import UsersPage from '../users/Users';
import Greetings from '../../components/navigation/Greetings';
import { AuthContext } from '../../context/auth-context';
import './dashboard.scss';
import { deleteUserSession } from '../../api/auth';
import { TResponseLogoutUser } from '../../types/auth.types';
import { HTTP_CODE } from '../../constants/http';
import { useHistory } from 'react-router';
import UserGreetings from '../../components/dashboard/UserGreetings';
import AdminStatistics from '../../components/dashboard/AdminStatistics';

const AdminMainPage = () => {
    return (
        <div className={"grid"}>
            <div className={"orders"}>

            </div>
            <div className={"main"}>
                <UserGreetings />
                <AdminStatistics />
            </div>
        </div>
    );
}

const AdminDashboard = () => {
    const { id, email, firstName, lastName, clearAuthContext } = useContext(AuthContext);
    const [isReady, setReady] = useState<boolean>(false);
    const history = useHistory();

    const handleLogout = async (e: MouseEvent<HTMLButtonElement>) => {
        const response: TResponseLogoutUser = await deleteUserSession(id);

        if (response.statusCode === HTTP_CODE.OK) {
            clearAuthContext();
            history.push('/sign-in');
        }
    }

    useEffect(() => {
        setReady(true);

        return () => {
            setReady(false);
        }
    }, []);

    return isReady ? (
        <div className={"admin-page"}>
            <Helmet>
                <title>{"Junko | Panel pracownika"}</title>
            </Helmet>

            <DashboardNavigation>
                <ul className={"navigation-menu"}>
                    {adminMenu.map((item: TDashboardNavigation) => (
                        <li key={item.key} className={"navigation-item"}>
                            <NavLink
                                className={"navigation-link"}
                                activeClassName={"navigation-active"}
                                to={item.url}
                                title={item.title}
                            >
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <Greetings email={email} firstName={firstName} lastName={lastName} handleLogout={handleLogout} />
            </DashboardNavigation>

            <Switch>
                <Route exact path={"/dashboard"}>
                    <AdminMainPage />
                </Route>
                <Route path={"/dashboard/users"}>
                    <UsersPage />
                </Route>
            </Switch>
        </div>
    ) : null;
}

export default AdminDashboard;
