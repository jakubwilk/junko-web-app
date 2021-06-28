import { useState, MouseEvent, useContext, useEffect } from 'react';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import './edit-user.scss';
import { HTTP_CODE } from '../../constants/http';
import ClipLoader from 'react-spinners/ClipLoader';
import { UserContext } from '../../context/user-context';
import { TEditUserData, TSaveEditUserResponse } from '../../types/auth.types';
import { getEditUserData, saveEditUserData } from '../../api/user';

const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
];

const editSchema = Yup.object().shape({
    firstName: Yup.string(),
    lastName: Yup.string(),
    password: Yup.string()
        .min(16, 'Podane hasło jest za krótkie, powinno mieć minimum 16 znaków')
        .trim('Hasło nie może zawierać spacji'),
    city: Yup.string(),
    phoneNumber: Yup.string(),
    role: Yup.number()
});

const initialState: TEditUserData = {
    firstName: '',
    lastName: '',
    password: '',
    city: '',
    phoneNumber: '',
    role: 0
}

export const EditUser = () => {
    const { id, clearUserContext } = useContext(UserContext);
    const [data, setData] = useState<TEditUserData>(initialState);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [validationMessage, setValidationMessage] = useState<string>('');
    const [statusCode, setStatusCode] = useState<number>(0);

    const handleClose = (e: MouseEvent) => {
        clearUserContext();
    }

    const initialValues: TEditUserData = {
        firstName: data.firstName,
        lastName: data.lastName,
        password: '',
        city: data.city,
        phoneNumber: data.phoneNumber,
        role: data.role
    }

    useEffect(() => {
        getEditUserData(id)
            .then(res => {
                console.log(res);
                setData(res.data);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className={"overlay"}>
            <div className={"overlay-content"}>

                <section className={"modal edit-user"}>
                    {isLoading ? null : (
                        <>
                            <h2 className={"edit-user-title"}>{"Edytuj użytkownika"}</h2>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={editSchema}
                                onSubmit={async (values, actions) => {
                                    const userData: TEditUserData = {
                                        firstName: values.firstName,
                                        lastName: values.lastName,
                                        password: values.password,
                                        city: values.city,
                                        phoneNumber: values.phoneNumber,
                                        role: values.role
                                    }

                                    setLoading(true);
                                    const response: TSaveEditUserResponse = await saveEditUserData(id, userData);
                                    console.log(response);
                                    setLoading(false);
                                }}
                            >
                                {({ errors, touched }) => (
                                    <>
                                        {validationMessage === '' ? null : (
                                            <span className={statusCode === HTTP_CODE.CREATED ? "validation-success" : "validation-error"}>{validationMessage}</span>
                                        )}
                                        <Form className={"form"}>
                                            <div className={"form-group"}>
                                                <div>
                                                    <label htmlFor={"firstName"}>{"Imię"}</label>
                                                    <Field className={errors.firstName && touched.firstName ? "form-field-error" : ""} id={"firstName"} name={"firstName"} autoComplete={"off"} />
                                                    {errors.firstName && touched.firstName ? (
                                                        <span className={"form-error"}>{errors.firstName}</span>
                                                    ) : null}
                                                </div>
                                                <div>
                                                    <label htmlFor={"lastName"}>{"Nazwisko"}</label>
                                                    <Field className={errors.lastName && touched.lastName ? "form-field-error" : ""} id={"lastName"} name={"lastName"} autoComplete={"off"} />
                                                    {errors.lastName && touched.lastName ? (
                                                        <span className={"form-error"}>{errors.lastName}</span>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className={"form-group"}>
                                                <label htmlFor={"password"}>{"Hasło użytkownika"}</label>
                                                <Field className={errors.password && touched.password ? "form-field-error" : ""} type={"password"} id={"password"} name={"password"} autoComplete={"off"} />
                                                {errors.password && touched.password ? (
                                                    <span className={"form-error"}>{errors.password}</span>
                                                ) : null}
                                            </div>
                                            <div className={"form-group"}>
                                                <div>
                                                    <label htmlFor={"city"}>{"Miasto"}</label>
                                                    <Field className={errors.city && touched.city ? "form-field-error" : ""} id={"city"} name={"city"} autoComplete={"off"} />
                                                    {errors.city && touched.city ? (
                                                        <span className={"form-error"}>{errors.city}</span>
                                                    ) : null}
                                                </div>
                                                <div>
                                                    <label htmlFor={"phoneNumber"}>{"Numer telefonu"}</label>
                                                    <Field className={errors.phoneNumber && touched.phoneNumber ? "form-field-error" : ""} id={"phoneNumber"} name={"phoneNumber"} autoComplete={"off"} />
                                                    {errors.phoneNumber && touched.phoneNumber ? (
                                                        <span className={"form-error"}>{errors.phoneNumber}</span>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className={"button-group"}>
                                                <button className={`button form-button ${isLoading ? "disabled" : ""}`} type={"submit"}>{isLoading ? (
                                                    <>
                                                        <ClipLoader color={"#ffffff"} loading={isLoading} size={15} />
                                                        {"Zapisywanie"}
                                                    </>
                                                ) : "Zapisz"}</button>
                                                <button
                                                    className={"button form-button form-button-cancel"}
                                                    type={"button"}
                                                    onClick={(e) => handleClose(e)}
                                                >
                                                    {"Anuluj"}
                                                </button>
                                            </div>
                                        </Form>
                                    </>
                                )}
                            </Formik>
                        </>
                    )}
                </section>

            </div>
        </div>
    );
}
