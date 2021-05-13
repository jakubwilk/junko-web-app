import { Component } from 'react';
import { IAdminDashboardProps, IAdminDashboardState } from '../../interfaces/dashboard.interface';
import { Helmet } from 'react-helmet';
import AddUser from '../../components/users/shared/AddUser';
import './dashboard.scss';

class AdminPage extends Component<IAdminDashboardProps, IAdminDashboardState> {
    render = () => {
        return (
            <div className={"admin"}>
                <Helmet>
                    <title>Junko | Panel zarządzania</title>
                </Helmet>

                <h2>Admin page</h2>
                <AddUser isModal={false} />
            </div>
        );
    }
}

export default AdminPage;
