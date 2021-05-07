import { Component } from 'react';
import { IUserDashboardProps, IUserDashboardState } from '../../interfaces/dashboard.interface';

class UserPage extends Component<IUserDashboardProps, IUserDashboardState> {
    render() {
        return (
            <h2>User page</h2>
        );
    }
}

export default UserPage;
