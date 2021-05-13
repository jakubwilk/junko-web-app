import { Component, MouseEvent } from 'react';
import { IRouteNavigationProps, IRouteNavigationState } from '../../interfaces/private-route.interface';
import { getUserData } from '../../api/user';
import { HTTP_CODE } from '../../constants/http';
import logo from '../../../assets/images/logo-site.png';
import Menu from '../shared/menu/Menu';
import { adminMenu } from '../../constants/menu';
import { TMenuItem } from '../../types/menu.types';
import MenuItem from '../shared/menu/MenuItem';
import Navbar from '../shared/navbar/Navbar';
import { ROLES } from '../../constants/roles';
import { deleteUserSession } from '../../api/auth';
import { Redirect } from 'react-router-dom';

class RouteNavigation extends Component<IRouteNavigationProps, IRouteNavigationState> {
    constructor(props: IRouteNavigationProps) {
        super(props);

        this.state = {
            isLoading: true,
            isRedirect: false
        }
    }

    handleLogout = (event: MouseEvent<HTMLButtonElement>) => {
        const { userId } = this.props;
        this.setState({ isLoading: true });

        deleteUserSession(userId)
            .then(res => {
                if (res.statusCode === HTTP_CODE.OK) {
                    this.setState({ isRedirect: true })
                }
            })
            .catch(err => console.log(err));

        this.setState({ isLoading: false });
    }

    displayUserName = (): string => {
        const { firstName, lastName, email } = this.props;

        if (firstName === null && lastName === null) {
            return `${email}`;
        } else {
            return `${firstName} ${lastName}`;
        }
    }

    render = () => {
        const { isRedirect } = this.state;
        const { userRole } = this.props;

        return (
            <>
                {isRedirect ? (
                    <Redirect to={'/'} />
                ) : (
                    <Navbar logoUrl={logo}>
                        <div className={"navbar-menu"}>
                            <Menu>
                                <>
                                    {userRole === ROLES.OWNER || userRole === ROLES.EMPLOYEE ? (
                                        <>
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
                                        </>
                                    ) : null}
                                </>
                            </Menu>
                            <div className={"navbar-user"}>
                                <p className={"navbar-user-data"}>
                                    {"Witaj, "}
                                    <strong>{this.displayUserName()}</strong>
                                </p>
                                <button
                                    className={"button navbar-button-logout"}
                                    onClick={(e) => this.handleLogout(e)}
                                >
                                    {"Wyloguj się"}
                                </button>
                            </div>
                        </div>
                    </Navbar>
                )}
            </>
        );
    }
}

export default RouteNavigation;
