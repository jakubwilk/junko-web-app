import { TSingleUserData } from '../../types/user.types';
import Moment from 'react-moment';
import defaultAvatar from './../../../assets/images/default_avatar.png';
import './user-card.scss';
import { ROLES } from '../../constants/roles';

export const UserCard = ({ id, email, firstName, lastName, role, photo, isActive, createdAt }: TSingleUserData) => {
    const displayRole = () => {
        switch (role) {
            case ROLES.USER:
                return <span className={"user-card-role"}>{"Użytkownik"}</span>
            case ROLES.EMPLOYEE:
                return <span className={"user-card-role"}>{"Pracownik"}</span>
            case ROLES.OWNER:
                return <span className={"user-card-role"}>{"Właściciel"}</span>
            default:
                return null;
        }
    }

    return (
        <div className={"user-card"} tabIndex={1}>
            <div className={"user-card-photo"}>
                {photo.length > 0 ? <img src={photo} alt={email} /> : <img src={defaultAvatar} alt={email} />}
            </div>
            <div className={"user-card-data"}>
                <h2 className={"user-card-name"}>
                    {firstName.length > 0 && lastName.length > 0 ? firstName + ' ' + lastName : email}
                    {isActive ? (
                        <span className={"user-card-status user-card-status-active"}>{"Aktywny"}</span>
                    ) : (
                        <span className={"user-card-status user-card-status-inactive"}>{"Nieaktywny"}</span>
                    )}
                    {displayRole()}
                </h2>
                <p className={"user-card-date"}>
                    {"Konto utworzone: "}
                    <Moment className={"user-card-time"} fromNow={true} locale={"pl"}>{createdAt}</Moment>
                    <Moment className={"user-card-detail-time"} format={"DD/MM/YYYY"}>{createdAt}</Moment>
                </p>
            </div>
        </div>
    )
}
