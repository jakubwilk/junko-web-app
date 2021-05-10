import { Component } from 'react';
import { Link } from 'react-router-dom';
import { IMenuItemProps, IMenuItemState } from '../../../interfaces/navbar.interface';

class MenuItem extends Component<IMenuItemProps, IMenuItemState> {
    render = () => {
        const { href, title, name, isActive, isDisabled } = this.props;

        return (
            <>
                {isActive ? (
                    <li className={"menu-item"}>
                        <Link className={isDisabled ? "disabled" : ""} to={href} title={title}>{name}</Link>
                    </li>
                ) : null}
            </>
        );
    }
}

export default MenuItem;
