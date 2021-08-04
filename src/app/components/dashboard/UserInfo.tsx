import { useEffect } from 'react'

export const UserInfo = () => {
    useEffect(() => {
        return () => {}
    })

    return (
        <section className={'news'}>
            <h2 className={'news-title'}>{`Uwaga - 15.08.2021`}</h2>
            <p
                className={'news-text'}
            >{`Informujemy, że dnia 18.08.2021 odbędzie się przerwa techniczna serwisu. W związku z tym wszystkie aktualizacje bieżących zleceń zostaną przeniesione na następny dzień roboczy. Tyczy się to również wszelkich terminów, które mają miejsce w placówce stacjonarnej.`}</p>
        </section>
    )
}
