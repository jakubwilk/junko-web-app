import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { IMenuItemProps, IMenuItemState } from '../../../interfaces/navbar.interface';

class MenuItem extends Component<IMenuItemProps, IMenuItemState> {
    render = () => {
        const { href, title, name, isActive, isDisabled } = this.props;

        return (
            <>
                {isActive ? (
                    <li className={"menu-item"}>
                        <NavLink className={`menu-link ${isDisabled ? 'disabled' : ''}`} activeClassName={"menu-link-active"} to={href} title={title}>{name}</NavLink>
                    </li>
                ) : null}
            </>
        );
    }
}

export default MenuItem;
