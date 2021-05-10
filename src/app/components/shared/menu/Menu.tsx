import { Component } from 'react';
import { IMenuProps, IMenuState } from '../../../interfaces/navbar.interface';

class Menu extends Component<IMenuProps, IMenuState> {
    render = () => {
        const { children } = this.props;

        return (
            <ul className={"menu"}>
                {children}
            </ul>
        );
    }
}

export default Menu;
