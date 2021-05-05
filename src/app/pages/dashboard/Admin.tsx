import { Component } from 'react';
import { IAdminDashboardProps, IAdminDashboardState } from '../../interfaces/admin-dashboard.interface';
import { Helmet } from 'react-helmet';

class AdminPage extends Component<IAdminDashboardProps, IAdminDashboardState> {
    render = () => {
        return (
            <>
                <Helmet>
                    <title>Junko | Panel zarządzania</title>
                </Helmet>
                <h2>Admin page</h2>
            </>
        );
    }
}

export default AdminPage;
