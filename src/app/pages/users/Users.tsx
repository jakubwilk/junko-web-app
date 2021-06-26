import { useEffect, useState } from 'react';
import { getAllUsers } from '../../api/user';
import { TSingleUserData } from '../../types/user.types';
import { UserCard } from '../../components/users/UserCard';
import './users.scss';
import { AddUser } from '../../components/users/AddUser';

const UsersPage = () => {
    const [isReady, setReady] = useState<boolean>(false);
    const [users, setUsers] = useState<TSingleUserData[]>([]);

    useEffect(() => {
       getAllUsers()
           .then(res => {
               console.log(res);
               const data: TSingleUserData[] = res.data;
               setUsers(data);
               setReady(true);
           })
           .catch(err => {
               console.log(err);
               setReady(true);
           });
    }, []);

    return isReady ? (
        <section className={"users-list"}>
            <div className={"container"}>
                <div className={"users-list-grid"}>

                    <div className={"users-list-grid-item users-list-grid-main"}>
                        <AddUser />
                    </div>
                    {users.map((user: TSingleUserData, index: number) => (
                        <div key={index} className={"users-list-grid-item"}>
                            <UserCard
                                id={user.id}
                                email={user.email}
                                firstName={user.firstName}
                                lastName={user.lastName}
                                role={user.role}
                                photo={user.photo}
                                isActive={user.isActive}
                                createdAt={user.createdAt}
                            />
                        </div>
                    ))}

                </div>
            </div>
        </section>
    ) : null;
}

export default UsersPage;
