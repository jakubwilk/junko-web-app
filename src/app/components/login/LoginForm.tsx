import React from 'react';
import { useFormik } from 'formik';
import { TLoginFormState } from "../../utils/types/login.types";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { LoginSchema } from "../../utils/validation/login-form.validation";
import { Message } from "primereact/message";
import { Checkbox } from "primereact/checkbox";

const LoginForm = () => {

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			isRemember: false
		},
		validationSchema: LoginSchema,
		onSubmit: (formData: TLoginFormState) => {
			alert(JSON.stringify(formData, null, 2));
		}
	})

	// @ts-ignore
	return (
		<form className={"login-form"} onSubmit={formik.handleSubmit}>
			<div className={"p-field login-form-group"}>
				<label className={"login-form-label"} htmlFor={"email"}>Email użytkownika</label>
				<span className={" p-input-icon-left login-form-input-group"}>
					<i className={"pi pi-envelope"} aria-hidden={"true"} />
					<InputText
						className={`login-form-input ${formik.errors.email ? "login-form-input-error" : null}`}
						id={"email"}
						name={"email"}
						value={formik.values.email}
						placeholder={"jankowalski@gmail.com"}
						autoComplete={"off"}
						onChange={formik.handleChange}
					/>
				</span>
				{formik.errors.email && formik.touched.email
					? <Message className={"login-form-error"} severity={"error"} text={formik.errors.email} />
					: null}
			</div>
			<div className={"p-field login-form-group"}>
				<label className={"login-form-label"} htmlFor={"password"}>Hasło użytkownika</label>
				<span className={"p-input-icon-left login-form-input-group"}>
					<i className={"pi pi-lock"} aria-hidden={true} />
					<InputText
						className={`login-form-input ${formik.errors.password ? "login-form-input-error" : null}`}
						type={"password"}
						id={"password"}
						name={"password"}
						value={formik.values.password}
						placeholder={"Hasło"}
						feedback={"false"}
						autoComplete={"off"}
						onChange={formik.handleChange}
					/>
				</span>
				{formik.errors.password && formik.touched.password
					? <Message className={"login-form-error"} severity={"error"} text={formik.errors.password} />
					: null}
			</div>
			<div className={"login-form-group"}>
				<div className={"p-field-checkbox login-form-checkbox"}>
					<Checkbox id={"remember"} name={"isRemember"} checked={formik.values.isRemember} onChange={formik.handleChange} />
					<label className={"login-form-label"} htmlFor={"isRemember"}>Zapamiętaj mnie</label>
				</div>
			</div>
			<Button className={"login-form-button"} label={"Zaloguj się"} icon={"pi pi-angle-right"} iconPos={"right"} type={"submit"} />
		</form>
	);
}

export default LoginForm;
