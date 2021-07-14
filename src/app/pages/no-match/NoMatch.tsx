import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import './no-match.scss'

const NoMatch = () => {
    return (
        <>
            <Helmet>
                <title>{'Junko | Strona nie została odnaleziona'}</title>
            </Helmet>

            <div className={'no-match'}>
                <h1 className={'no-match-title'}>404</h1>
                <p className={'no-match-description'}>
                    Strona na którą próbujesz się dostać nie została odnaleziona
                </p>
                <Link className={'no-match-link'} to={'/sign-in'}>
                    Powrót do strony głównej
                </Link>
            </div>
        </>
    )
}

export default NoMatch
