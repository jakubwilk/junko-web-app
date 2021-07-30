import './edit-order.scss'
import { useEffect, useState } from 'react'

export const EditOrder = () => {
    const [isReady, setReady] = useState<boolean>(false)

    useEffect(() => {
        setReady(true)

        return () => {}
    }, [])

    return (
        <div className={'overlay'}>
            <div className={'overlay-content'}>
                <section className={'modal edit-order'}>
                    {isReady ? (
                        <>
                            <h2 className={'edit-order-title'}>{'Edytuj zlecenie'}</h2>
                        </>
                    ) : null}
                </section>
            </div>
        </div>
    )
}
