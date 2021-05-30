import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import { ILoginInitialValues } from '../../interfaces/login.interface';

const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Podano niepoprawny adres')
        .required('Email jest wymagany'),
    password: Yup.string()
        .required('Hasło jest wymagane'),
});

const LoginForm = () => {
    const initialValues: ILoginInitialValues = {
        email: '',
        password: '',
        rememberMe: []
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={(values, actions) => {
                console.log(values);
                console.log(actions);
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
                    <button className={"button form-button"} type={"submit"}>{"Zaloguj się"}</button>
                </Form>
            )}
        </Formik>
    );
}

export default LoginForm;
