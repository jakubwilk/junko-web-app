import { Component } from 'react';
import { IAdminDashboardProps, IAdminDashboardState } from '../../interfaces/dashboard.interface';
import { Helmet } from 'react-helmet';
import { AppContext } from '../../context/AppContext';
import { getUserData } from '../../api/user';
import { HTTP_CODE } from '../../constants/http';
import AddUser from '../../components/users/shared/AddUser';
import Navbar from '../../components/shared/navbar/Navbar';
import logo from '../../../assets/images/logo-site.png';
import Menu from '../../components/shared/menu/Menu';
import { adminMenu } from '../../constants/menu';
import MenuItem from '../../components/shared/menu/MenuItem';
import { TMenuItem } from '../../types/menu.types';
import './dashboard.scss';

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

        // What should be on dashboard:
        // Users list
        // Orders list
        // Last active order
        // Previous order
        // Add user

        return (
            <>
                {isLoading ? null : (
                    <div className={"admin"}>
                        <Helmet>
                            <title>Junko | Panel zarządzania</title>
                        </Helmet>

                        <Navbar logoUrl={logo}>
                            <div className={"navbar-menu"}>
                                <Menu>
                                    {adminMenu.links.map((item: TMenuItem) =>
                                        <MenuItem
                                            key={item.key}
                                            href={item.href}
                                            title={item.title}
                                            name={item.name}
                                            isActive={item.isActive}
                                            isDisabled={item.isDisabled}
                                        />
                                    )}
                                </Menu>
                                <div className={"navbar-user"}>
                                    <p className={"navbar-user-data"}>
                                        {"Witaj, "}
                                        <strong>{this.displayUserName()}</strong>
                                    </p>
                                    <button className={"button navbar-button-logout"}>{"Wyloguj się"}</button>
                                </div>
                            </div>
                        </Navbar>
                        <h2>Admin page</h2>
                        <AddUser isModal={false} />
                    </div>
                )}
            </>
        );
    }
}

export default AdminPage;
