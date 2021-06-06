import { FC, ReactElement } from 'react';
import logo from './../../../assets/images/logo-site.png';
import './dashboard-navigation.scss';

const DashboardNavigation: FC<{
    children: ReactElement | ReactElement[]
}> = (props) => {
    return (
        <nav className={"navigation"}>
            <div className={"container-fluid"}>

                <div className={"navigation-content"}>
                    <img className={"site-logo"} src={logo} alt={""} />

                    <div className={"navigation-user"}>
                        {props.children}
                    </div>
                </div>

            </div>
        </nav>
    );
}

export default DashboardNavigation;
