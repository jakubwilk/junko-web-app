import { Component } from 'react';
import { IAdminDashboardProps, IAdminDashboardState } from '../../interfaces/admin-dashboard.interface';

class AdminPage extends Component<IAdminDashboardProps, IAdminDashboardState> {
    render() {
        return (
            <h2>Admin page</h2>
        );
    }
}

export default AdminPage;
