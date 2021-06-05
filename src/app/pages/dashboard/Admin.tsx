import { useContext, useEffect, useState } from 'react';
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
    const { email, firstName, lastName } = useContext(AuthContext);
    const [isReady, setReady] = useState<boolean>(false);

    useEffect(() => {
        setReady(true);

        return () => {
            setReady(false);
        }
    }, []);

    return isReady ? (
        <>
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
                <Greetings email={email} firstName={firstName} lastName={lastName} />
            </DashboardNavigation>

            <Switch>
                <Route exact={true} path={"/dashboard"}>
                    <AdminMainPage />
                </Route>
                <Route path={"/dashboard/users"}>
                    <UsersPage />
                </Route>
            </Switch>
        </>
    ) : null
}

export default AdminDashboard;
