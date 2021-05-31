import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth-context';
import { ROLES } from '../../constants/roles';
import AdminDashboard from './Admin';
import UserDashboard from './User';

const DashboardWrapper = () => {
    const [isReady, setReady] = useState<boolean>(false);
    const { role } = useContext(AuthContext);

    useEffect(() => {
        setReady(true);

        return () => {
            setReady(false);
        }
    }, [])

    return isReady ? (
        <>
            {role === ROLES.OWNER ? <AdminDashboard /> : <UserDashboard />}
        </>
    ) : null;
}

export default DashboardWrapper;
