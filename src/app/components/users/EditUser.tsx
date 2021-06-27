import { useState } from 'react';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import './edit-user.scss';
import { HTTP_CODE } from '../../constants/http';

const editSchema = Yup.object().shape({
    firstName: Yup.string(),
    lastName: Yup.string(),
    password: Yup.string()
        .min(16, 'Podane hasło jest za krótkie, powinno mieć minimum 16 znaków')
        .trim('Hasło nie może zawierać spacji')
        .oneOf([Yup.ref('repeatPassword'), null], 'Hasła muszą być takie same')
        .required('Hasło jest wymagane'),
    photo: Yup.object(),
    city: Yup.string(),
    phoneNumber: Yup.string(),
    role: Yup.number()
})

export const EditUser = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [validationMessage, setValidationMessage] = useState<string>('');
    const [statusCode, setStatusCode] = useState<number>(0);

    const initialValues = {
        firstName: '',
        lastName: '',
        password: '',
        photo: '',
        city: '',
        phoneNumber: '',
        role: 0
    }

    return (
        <div className={"overlay"}>
            <div className={"overlay-content"}>

                <section className={"modal edit-user"}>
                    <h2 className={"edit-user-title"}>{"Edytuj użytkownika"}</h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={editSchema}
                        onSubmit={async (values, actions) => {
                            console.log(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <>
                                {validationMessage === '' ? null : (
                                    <span className={statusCode === HTTP_CODE.CREATED ? "validation-success" : "validation-error"}>{validationMessage}</span>
                                )}
                            </>
                        )}
                    </Formik>
                </section>

            </div>
        </div>
    );
}
