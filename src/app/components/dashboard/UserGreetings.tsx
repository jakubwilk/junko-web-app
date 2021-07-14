import { useContext } from 'react'
import { AuthContext } from '../../context/auth-context'
import { ROLES } from '../../constants/roles'

const UserGreetings = () => {
    const { role, email, firstName, lastName } = useContext(AuthContext)

    return (
        <div className={'greetings'}>
            <h2 className={'greetings-title'}>{`Cześć, ${
                firstName === '' && lastName === ''
                    ? email
                    : firstName + ' ' + lastName
            }`}</h2>
            {role === ROLES.OWNER || role === ROLES.EMPLOYEE ? (
                <>
                    <p
                        className={'greetings-text'}
                    >{`Znajdujesz się w panelu zarządzania użytkownikami jak i przyjętymi zleceniami. By sprawdzić listę użytkowników wystarczy, że udasz się do zakładki "Użytkownicy" znajdującej się na górze strony. Wszystkie przyjętę przez Twoją firmę zlecenia jak i zlecenia wyłacznie wykonywane przez Ciebie znajdują się kolejno w zakładkach "Zlecenia" oraz "Moje zlecenia".`}</p>
                    <p
                        className={'greetings-text'}
                    >{`By móc edytować swój profil, wystarczy, że klikniesz przycisk poniżej, a następnie wypełnisz odpowiednie pola.`}</p>
                    <button className={'button greetings-edit-profile'}>
                        {'Edytuj profil'}
                    </button>
                </>
            ) : (
                <p className={'greetings-text'}>{``}</p>
            )}
        </div>
    )
}

export default UserGreetings
