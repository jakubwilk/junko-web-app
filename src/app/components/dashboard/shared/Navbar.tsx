import { Component } from 'react';
import { INavbarProps, INavbarState } from '../../../interfaces/navbar.interface';

class Navbar extends Component<INavbarProps, INavbarState> {
    render = () => {
        const { logoUrl, alt, children } = this.props;

        return (
            <header className={"navbar"}>
                <div className={"container-fluid"}>
                    <div className={"navbar-row"}>
                        <h1 className={"navbar-logo"}>
                            <img className={"navbar-image"} src={logoUrl} alt={alt} />
                        </h1>
                    </div>

                    {children}
                </div>
            </header>
        );
    }
}

export default Navbar;
