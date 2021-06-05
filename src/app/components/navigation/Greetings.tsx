import { IUserGreetings } from '../../interfaces/user.interface';

const Greetings = ({ email, firstName, lastName }: IUserGreetings) => {
    const displayUserName = (): string => {
        return firstName === '' && lastName === '' ? email : `${firstName} ${lastName}`;
    }

    return (
        <div className={"greetings"}>
            <p className={"greetings-text"}>
                {"Witaj, "}
                <strong>{displayUserName()}</strong>
            </p>
        </div>
    );
}

export default Greetings;
