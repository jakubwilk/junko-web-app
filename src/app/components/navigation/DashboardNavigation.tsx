import { FC, ReactElement } from 'react';
import logo from './../../../assets/images/logo-site.png';

const DashboardNavigation: FC<{
    children: ReactElement | ReactElement[]
}> = (props) => {
    return (
        <nav className={"navigation"}>
            <div className={"container-fluid"}>

                <div className={"navigation-content"}>
                    <img className={"site-logo"} src={logo} alt={""} />

                    {props.children}
                </div>

            </div>
        </nav>
    );
}

export default DashboardNavigation;
