import { Component } from 'react';
import { ILoginHeadingProps, ILoginHeadingState } from '../../interfaces/login.interface';

class LoginHeading extends Component<ILoginHeadingProps, ILoginHeadingState> {
    render = () => {
        const { image, alt, imageClassName, title, titleClassName } = this.props;

        return (
            <header className={"login-header"}>
                <img className={imageClassName} src={image} alt={alt} />
                <h1 className={titleClassName}>{title}</h1>
            </header>
        );
    }
}

export default LoginHeading;
