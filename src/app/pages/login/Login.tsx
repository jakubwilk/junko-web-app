import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo-site.png';
import LoginForm from '../../components/login/LoginForm';
import './login.scss';

const Login = () => {
    return (
        <>
            <Helmet>
                <title>{"Junko | Zaloguj się"}</title>
            </Helmet>

            <div className={"login"}>
                <div className={"login-content"}>
                    <h1 className={"login-title"}>
                        <img src={logo} alt={"Czarne logo junko z niebieskiem logotypem"} />
                    </h1>
                    <p className={"login-subtitle"}>{"By kontynuować zaloguj się na swoje konto"}</p>
                    <LoginForm />
                    <Link to={"/sign-up"} className={"login-link"}>{"Nie masz konta? Załóż je"}</Link>
                </div>
            </div>
        </>
    );
}

export default Login;
