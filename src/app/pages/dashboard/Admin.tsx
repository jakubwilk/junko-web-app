import { useContext, useEffect, useState, MouseEvent } from 'react';
import { Helmet } from 'react-helmet';
import { NavLink, Route, Switch } from 'react-router-dom';
import DashboardNavigation from '../../components/navigation/DashboardNavigation';
import { adminMenu } from '../../constants/nav';
import { TDashboardNavigation } from '../../types/navigation';
import UsersPage from '../users/Users';
import Greetings from '../../components/navigation/Greetings';
import { AuthContext } from '../../context/auth-context';

const AdminMainPage = () => {
    return (
        <h2>Admin</h2>
    );
}

const AdminDashboard = () => {
    const { id, email, firstName, lastName } = useContext(AuthContext);
    const [isReady, setReady] = useState<boolean>(false);

    const handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
        console.log(id);
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
                <Route exact={true} path={"/dashboard"}>
                    <AdminMainPage />
                </Route>
                <Route exact={true} path={"/dashboard/users"}>
                    <UsersPage />
                </Route>
            </Switch>
        </div>
    ) : null
}

export default AdminDashboard;
