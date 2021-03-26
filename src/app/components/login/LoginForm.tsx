import React from 'react';
import { useFormik } from 'formik';
import { TLoginFormState } from "../../utils/types/login.types";
import { InputText } from "primereact/inputtext";

const LoginForm = () => {
	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		onSubmit: (formData: TLoginFormState) => {
			alert(JSON.stringify(formData, null, 2));
		}
	})

	return (
		<form className={"login-form"} onSubmit={formik.handleSubmit}>
			<div className={"p-inputgroup login-form-group"}>
				<span className={"p-inputgroup-addon login-form-addon"}>
					<i className={"pi pi-envelope"} aria-hidden={"true"} />
				</span>
				<span className={"p-float-label login-form-input-group"}>
					<InputText
						id={"email"}
						name={"email"}
						value={formik.values.email}
						autoComplete={"off"}
						onChange={formik.handleChange}
					/>
					<label className={"login-form-label"} htmlFor={"email"}>Email użytkownika</label>
				</span>
			</div>
			<div className={"p-inputgroup login-form-group"}>
				<span className={"p-inputgroup-addon login-form-addon"}>
					<i className={"pi pi-lock"} aria-hidden={true} />
				</span>
				<span className={"p-float-label login-form-group"}>
					<InputText
						type={"password"}
						id={"password"}
						name={"password"}
						value={formik.values.password}
						feedback={"false"}
						autoComplete={"off"}
						onChange={formik.handleChange}
					/>
					<label className={"login-form-label"} htmlFor={"password"}>Hasło użytkownika</label>
				</span>
			</div>
			<button type={"submit"}>Zaloguj się</button>
		</form>
	);
}

export default LoginForm;
