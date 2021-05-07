import { ChangeEvent, Component, FormEvent } from 'react';
import { IAddUserProps, IAddUserState } from '../../../interfaces/users.interface';
import { ROLES } from '../../../constants/roles';
import { TAddUserData } from '../../../types/auth.types';
import { addUser } from '../../../api/auth';

class AddUser extends Component<IAddUserProps, IAddUserState> {
    constructor(props: IAddUserProps) {
        super(props);

        this.state = {
            email: '',
            role: 0,
            isLoading: false
        }
    }

    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.setState({ isLoading: true });
        const { reloadList } = this.props;
        const { email, role } = this.state;
        const data: TAddUserData = {
            email: email,
            role: role
        };

        addUser(data)
            .then(res => {
                console.log(res);

                if (reloadList !== undefined) {
                    reloadList();
                }
            })
            .catch(err => console.log(err));

        this.setState({ isLoading: false });
    }

    handleChecked = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target as HTMLInputElement;

        this.setState({
            role: Number(input.value)
        });
    }

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const input = event.target as HTMLInputElement;

        this.setState({
            ...this.state,
            [input.name]: input.value
        });
    }

    render = () => {
        const { role, email, isLoading } = this.state;

        return (
            <div className={"add-user"}>
                <h2 className={"add-user-title"}>{"Dodaj użytkownika"}</h2>
                <form className={"form"} onSubmit={(e) => this.handleSubmit(e)}>
                    <div className={"form-group"}>
                        <label className={"form-label"} htmlFor={"user"}>{"Użytkownik"}</label>
                        <input
                            type={"checkbox"}
                            name={"role"}
                            id={"user"}
                            checked={role === ROLES.USER}
                            value={ROLES.USER}
                            onChange={(e) => this.handleChecked(e)}
                        />
                    </div>
                    <div className={"form-group"}>
                        <label className={"form-label"} htmlFor={"employee"}>{"Pracownik"}</label>
                        <input
                            type={"checkbox"}
                            name={"role"}
                            id={"employee"}
                            checked={role === ROLES.EMPLOYEE}
                            value={ROLES.EMPLOYEE}
                            onChange={(e) => this.handleChecked(e)}
                        />
                    </div>
                    <div className={"form-group"}>
                        <label className={"form-label"} htmlFor={"email"}>{"Email użytkownika"}</label>
                        <input
                            type={"text"}
                            name={"email"}
                            id={"email"}
                            value={email}
                            placeholder={"johndoe@localhost"}
                            disabled={role === ROLES.NONE}
                            onChange={(e) => this.handleChange(e)}
                        />
                    </div>
                    <div className={"form-group"}>
                        <button
                            className={"form-button"}
                            disabled={isLoading}
                        >{"Dodaj"}</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddUser;
