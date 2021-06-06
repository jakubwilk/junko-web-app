import { IUserGreetings } from '../../interfaces/user.interface';

const Greetings = ({ email, firstName, lastName, handleLogout }: IUserGreetings) => {
    const displayUserName = (): string => {
        return firstName === '' && lastName === '' ? email : `${firstName} ${lastName}`;
    }

    return (
        <div className={"greetings"}>
            <p className={"greetings-text"}>
                {"Witaj, "}
                <strong>{displayUserName()}</strong>
            </p>
            <button className={"button greetings-logout"} onClick={(e) => handleLogout(e)}>
                {"Wyloguj się"}
            </button>
        </div>
    );
}

export default Greetings;
