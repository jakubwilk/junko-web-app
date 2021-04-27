import React from 'react';
import { Helmet } from 'react-helmet';
import LoginCard from '../../components/login/LoginCard';
import logo from '../../../assets/images/logo-site.png';
import './login-page.scss';
import LoginForm from '../../components/login/LoginForm';
import { TLoginPageProps } from '../../utils/types/login.types';

const LoginPage = ({ title }: TLoginPageProps) => {
    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>

            <div className={'login-page'}>
                <div className={'container'}>

                    <LoginCard
                        logo={logo}
                        alt={'Błękitny ptak na niebieskim tle obok napisu Junko'}
                        title={'Uzyskaj dostęp'}
                        subtitle={'Zaloguj się do panelu zarządzania za pomocą swoich danych.'}
                    >
                        <LoginForm/>
                    </LoginCard>

                </div>
            </div>
        </>
    );
}

export default LoginPage;
