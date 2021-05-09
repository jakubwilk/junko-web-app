import { Component } from 'react';
import { IFormProps, IFormState } from '../../interfaces/forms.interface';

class Form extends Component<IFormProps, IFormState> {
    render = () => {
        const { className, onSubmit, children } = this.props;

        return (
            <form
                className={className}
                onSubmit={(e) => onSubmit ? onSubmit(e) : null}
            >
                {children}
            </form>
        );
    }
}

export default Form;
