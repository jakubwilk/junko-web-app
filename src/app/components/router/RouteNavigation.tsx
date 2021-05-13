import { Component, MouseEvent } from 'react';
import { IRouteNavigationProps, IRouteNavigationState } from '../../interfaces/private-route.interface';
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
import { MoonLoader } from 'react-spinners';

class RouteNavigation extends Component<IRouteNavigationProps, IRouteNavigationState> {
    constructor(props: IRouteNavigationProps) {
        super(props);

        this.state = {
            isLoading: false,
            isRedirect: false
        }
    }

    handleLogout = async (event: MouseEvent<HTMLButtonElement>) => {
        try {
            const { userId } = this.props;
            this.setState({ isLoading: true });

            const response = await deleteUserSession(userId);
            if (response.statusCode === HTTP_CODE.OK) {
                await this.setState({ isRedirect: true });
            }

            this.setState({ isLoading: false });
        } catch (err: unknown) {
            this.setState({ isLoading: false });
        }
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
        const { isLoading, isRedirect } = this.state;
        const { userRole } = this.props;

        return (
            <>
                {isRedirect ? (
                    <Redirect push to={'/'} />
                ) : (
                    <>
                        {isLoading ? (
                            <div className={"page-loader"}>
                                <MoonLoader color={'#007bff'} loading={isLoading} size={150} />
                            </div>
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
                )}
            </>
        );
    }
}

export default RouteNavigation;
