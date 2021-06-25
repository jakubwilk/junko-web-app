import { TSingleUserData } from '../../types/user.types';
import Moment from 'react-moment';

export const UserCard = ({ id, email, firstName, lastName, photo, isActivate, createdAt }: TSingleUserData) => {
    return (
        <div className={"user-card"}>
            {photo.length > 0 ? (
                <div className={"user-card-photo"}>
                    <img src={photo} alt={firstName} />
                </div>
            ) : null}
            <div className={"user-card-data"}>
                {firstName.length > 0 && lastName.length > 0 ? (
                    <h2 className={"user-card-name"}>
                        {firstName + ' ' + lastName}
                        {isActivate ? (
                            <span className={"user-card-status user-card-status-active"}>{"Aktywny"}</span>
                        ) : (
                            <span className={"user-card-status user-card-status-inactive"}>{"Nieaktywny"}</span>
                        )}
                    </h2>
                ) : (
                    <h2 className={"user-card-name"}>{email}</h2>
                )}
                <p className={"user-card-date"}>
                    {"Konto utworzone: "}
                    <Moment className={"user-card-time"} fromNow={true} locale={"pl"}>{createdAt}</Moment>
                    <Moment className={"user-card-detail-time"} format={"DD/MM/YYYY"}>{createdAt}</Moment>
                </p>
            </div>
        </div>
    )
}
