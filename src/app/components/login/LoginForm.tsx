import { useContext, useState } from 'react';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import ClipLoader from "react-spinners/ClipLoader";
import { ILoginInitialValues } from '../../interfaces/login.interface';
import { TLoginUserData, TResponseLoginUser } from '../../types/auth.types';
import { createUserSession } from '../../api/auth';
import { HTTP_CODE } from '../../constants/http';
import { useHistory } from 'react-router';
import { AuthContext } from '../../context/auth-context';

const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Podano niepoprawny adres')
        .required('Email jest wymagany'),
    password: Yup.string()
        .required('Hasło jest wymagane'),
});

const LoginForm = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const { setId, setRole } = useContext(AuthContext);
    const history = useHistory();

    const initialValues: ILoginInitialValues = {
        email: '',
        password: '',
        rememberMe: []
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={async (values, actions) => {
                const userData: TLoginUserData = {
                    email: values.email,
                    password: values.password,
                    isRemember: values.rememberMe.length > 0
                }

                setLoading(true);
                const response: TResponseLoginUser = await createUserSession(userData);

                if (response.statusCode === HTTP_CODE.OK) {
                    setLoading(false);
                    setId(response.userId);
                    setRole(response.userRole);
                    history.push('/dashboard');
                } else {
                    setLoading(false);
                }
            }}
        >
            {({ errors, touched }) => (
                <Form className={"form"}>
                    <div className={"form-group"}>
                        <label htmlFor={"email"}>{"Email użytkownika"}</label>
                        <Field className={errors.email && touched.email ? "form-field-error" : ""} id={"email"} name={"email"} placeholder={"johndoe@localhost"} autoComplete={"off"} />
                        {errors.email && touched.email ? (
                            <span className={"form-error"}>{errors.email}</span>
                        ) : null}
                    </div>
                    <div className={"form-group"}>
                        <label htmlFor={"password"}>{"Hasło użytkownika"}</label>
                        <Field className={errors.password && touched.password ? "form-field-error" : ""} type={"password"} id={"password"} name={"password"} autoComplete={"off"} />
                        {errors.password && touched.password ? (
                            <span className={"form-error"}>{errors.password}</span>
                        ) : null}
                    </div>
                    <div className={"form-group-checkbox"}>
                        <label htmlFor={"rememberMe"}>{"Zapamiętaj mnie"}</label>
                        <Field type={"checkbox"} name={"rememberMe"} id={"rememberMe"} value={"1"} />
                    </div>
                    <button className={`button form-button ${isLoading ? "disabled" : ""}`} type={"submit"}>{isLoading ? (
                        <>
                            <ClipLoader color={"#ffffff"} loading={isLoading} size={15} />
                            {"Logowanie"}
                        </>
                    ) : "Zaloguj się"}</button>
                </Form>
            )}
        </Formik>
    );
}

export default LoginForm;
