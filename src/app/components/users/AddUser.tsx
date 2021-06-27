import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import './add-user.scss';
import { IAddUserInitialValues } from '../../interfaces/register.interface';
import { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { TAddUserData, TResponseRegisterUser } from '../../types/auth.types';
import { addUser } from '../../api/auth';
import { HTTP_CODE } from '../../constants/http';
import { getValidationRegisterMessage } from '../../utils/validation';

const addUserSchema = Yup.object().shape({
    email: Yup.string()
        .email('Podano niepoprawny adres')
        .required('Email jest wymagany'),
    password: Yup.string()
        .required('Hasło jest wymagane'),
});

const roles = [
    {
        id: 1,
        name: "Właściciel"
    },
    {
        id: 2,
        name: "Pracownik"
    },
    {
        id: 3,
        name: "Użytkownik"
    }
]

export const AddUser = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [validationMessage, setValidationMessage] = useState<string>('');
    const [statusCode, setStatusCode] = useState<number>(0);

    const initialValues: IAddUserInitialValues = {
        email: '',
        role: 2,
        password: ''
    }

    return (
        <div className={"add-user"}>
            <h2 className={"add-user-title"}>{"Dodaj użytkownika"}</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={addUserSchema}
                onSubmit={async (values, actions) => {
                    const userData: TAddUserData = {
                        email: values.email,
                        password: values.password,
                        role: values.role
                    }

                    setLoading(true);
                    const response: TResponseRegisterUser = await addUser(userData);

                    const message: string = getValidationRegisterMessage(response.statusCode);
                    setValidationMessage(message);
                    setStatusCode(response.statusCode);
                    setLoading(false);
                }
            }>
                {({ errors, touched }) => (
                    <>
                        {validationMessage === '' ? null : (
                            <span className={statusCode === HTTP_CODE.CREATED ? "validation-success" : "validation-error"}>{validationMessage}</span>
                        )}
                        <Form className={"form"}>
                            <div className={"form-group"}>
                                <label htmlFor={"role"}>{"Rola użytkownika"}</label>
                                <Field as={"select"} name={"role"}>
                                    {roles.map(role => (
                                        <option key={role.id} value={role.id}>{role.name}</option>
                                    ))}
                                </Field>
                            </div>
                            <div className={"form-group"}>
                                <div>
                                    <label htmlFor={"email"}>{"Email użytkownika"}</label>
                                    <Field className={errors.email && touched.email ? "form-field-error" : ""} id={"email"} name={"email"} placeholder={"johndoe@localhost"} autoComplete={"off"} />
                                    {errors.email && touched.email ? (
                                        <span className={"form-error"}>{errors.email}</span>
                                    ) : null}
                                </div>
                                <div>
                                    <label htmlFor={"password"}>{"Hasło użytkownika"}</label>
                                    <Field className={errors.password && touched.password ? "form-field-error" : ""} type={"password"} id={"password"} name={"password"} autoComplete={"off"} />
                                    {errors.password && touched.password ? (
                                        <span className={"form-error"}>{errors.password}</span>
                                    ) : null}
                                </div>
                            </div>
                            <button className={`button form-button ${isLoading ? "disabled" : ""}`} type={"submit"}>{isLoading ? (
                                <>
                                    <ClipLoader color={"#ffffff"} loading={isLoading} size={15} />
                                    {"Dodawanie"}
                                </>
                            ) : "Dodaj użytkownika"}</button>
                        </Form>
                    </>
                )}
            </Formik>
        </div>
    );
}
