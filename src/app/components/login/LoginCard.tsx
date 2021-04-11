import React from 'react';
import { ILoginCardProps } from '../../utils/interfaces/login';

const LoginCard = (props: ILoginCardProps) => {
    const {logo, alt, title, subtitle, children} = props;

    return (
        <>
            <img className={'page-logo'} src={logo} alt={alt}/>
            <div className={'login-card'}>
                <h1 className={'login-card-title'}>{title}</h1>
                <p className={'login-card-subtitle'}>{subtitle}</p>
                {children}
            </div>
        </>
    );
}

export default LoginCard;
