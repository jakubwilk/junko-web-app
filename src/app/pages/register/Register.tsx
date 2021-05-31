import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo-site.png';
import './register.scss';
import RegisterForm from '../../components/register/RegisterForm';

const Register = () => {
    return (
        <>
            <Helmet>
                <title>{"Junko | Utwórz konto"}</title>
            </Helmet>

            <div className={"register"}>
                <div className={"register-content"}>
                    <h1 className={"register-title"}>
                        <img src={logo} alt={"Czarne logo junko z niebieskiem logotypem"} />
                    </h1>
                    <p className={"register-subtitle"}>{"Utwórz konto by móc zarządzac swoimi zamówieniami"}</p>
                    <RegisterForm />
                    <Link to={"/"} className={"register-link"}>{"Powrót do strony głównej"}</Link>
                </div>
            </div>
        </>
    );
}

export default Register;
