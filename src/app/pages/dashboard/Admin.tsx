import { Component } from 'react';
import { IAdminDashboardProps, IAdminDashboardState } from '../../interfaces/admin-dashboard.interface';
import { Helmet } from 'react-helmet';
import { AppContext } from '../../context/AppContext';
import { getUserData } from '../../api/user';
import { HTTP_CODE } from '../../constants/http';

class AdminPage extends Component<IAdminDashboardProps, IAdminDashboardState> {
    static contextType = AppContext;

    constructor(props: IAdminDashboardProps) {
        super(props);

        this.state = {
            isLoading: true
        }
    }

    displayUserName = (): string => {
        const { firstName, lastName, email } = this.context;

        if (firstName === null && lastName === null) {
            return `${email}`;
        } else {
            return `${firstName} ${lastName}`;
        }
    }

    componentDidMount = () => {
        const { userId, setPersonalUserData } = this.context;

        getUserData(userId)
            .then(res => {
                if (res.statusCode === HTTP_CODE.OK) {
                    setPersonalUserData(res.data.firstName, res.data.lastName, res.data.email);
                } else {
                    setPersonalUserData('', '', '');
                }
            })
            .catch(err => console.log(err));

        this.setState({ isLoading: false });
    }

    render = () => {
        const { isLoading } = this.state;

        return (
            <>
                {isLoading ? null : (
                    <>
                        <Helmet>
                            <title>Junko | Panel zarządzania</title>
                        </Helmet>
                        <h2>Witaj, {this.displayUserName()} <br />Admin page</h2>
                    </>
                )}
            </>
        );
    }
}

export default AdminPage;
