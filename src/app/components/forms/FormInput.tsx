import { Component } from 'react';
import { IFormInputProps, IFormInputState } from '../../interfaces/forms.interface';

class FormInput extends Component<IFormInputProps, IFormInputState> {
    render = () => {
        const { type, label, labelClassName, id, className, name, placeholder, value, checked, onChange, onBlur } = this.props;

        return (
            <>
                <label className={labelClassName} htmlFor={id}>{label}</label>
                <input
                    type={type}
                    id={id}
                    className={className}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    checked={checked}
                    onChange={(e) => onChange ? onChange(e) : null}
                    onBlur={(e) => onBlur ? onBlur(e) : null}
                    autoComplete={"off"}
                />
            </>
        );
    }
}

export default FormInput;
