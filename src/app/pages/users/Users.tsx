import { MouseEvent, useContext, useEffect, useState } from 'react'
import { getAllUsers, toggleUserActivate } from '../../api/user'
import { TSingleUserData } from '../../types/user.types'
import { UserCard } from '../../components/users/UserCard'
import './users.scss'
import { AddUser } from '../../components/users/AddUser'
import { AuthContext } from '../../context/auth-context'
import { ROLES } from '../../constants/roles'
import { HTTP_CODE } from '../../constants/http'

const UsersPage = () => {
    const { role } = useContext(AuthContext)
    const [isReady, setReady] = useState<boolean>(false)
    const [isLoading, setLoading] = useState<boolean>(false)
    const [users, setUsers] = useState<TSingleUserData[]>([])

    const setUserActiiveStatus = (
        e: MouseEvent<HTMLButtonElement>,
        userId: string,
        isActivate: boolean
    ) => {
        e.preventDefault()

        toggleUserActivate(userId, isActivate)
            .then((res) => {
                if (res.statusCode === HTTP_CODE.OK) {
                    window.location.reload()
                }

                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }

    const getUsersList = () => {
        getAllUsers()
            .then((res) => {
                const data: TSingleUserData[] = res.data
                setUsers(data)
                setReady(true)
            })
            .catch((err) => {
                setReady(true)
            })
    }

    useEffect(() => {
        getUsersList()
    }, [])

    return isReady ? (
        <section className={'users-list'}>
            <div className={'container'}>
                <div className={'users-list-grid'}>
                    <div className={'users-list-grid-item users-list-grid-main'}>
                        <AddUser />
                    </div>
                    {users.map((user: TSingleUserData, index: number) => (
                        <div key={index} className={'users-list-grid-item'}>
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
                            {role === ROLES.OWNER ? (
                                <button
                                    className={`button-card ${
                                        user.isActive ? 'button-card-danger' : 'button-card-success'
                                    } ${isLoading ? 'button-card-loading' : ''}`}
                                    onClick={(e) =>
                                        setUserActiiveStatus(e, user.id, !user.isActive)
                                    }
                                >
                                    {user.isActive ? 'Dezaktywuj konto' : 'Aktywuj konto'}
                                </button>
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    ) : null
}

export default UsersPage
