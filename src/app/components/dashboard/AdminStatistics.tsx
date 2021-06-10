import { useEffect, useState } from 'react';

const AdminStatistics = () => {
    const [isReady, setReady] = useState<boolean>(false);

    useEffect(() => {
        setReady(true);

        return () => {
            setReady(false);
        }
    }, []);

    return isReady ? (
        <div className={"statistics"}>
            <ul className={"statistics-grid"}>
                <li className={"statistics-item"}>
                    <span className={"statistics-number"}>{"483"}</span>
                    <p className={"statistics-title"}>{"Użytkownicy"}</p>
                </li>
                <li className={"statistics-item"}>
                    <span className={"statistics-number"}>{"12"}</span>
                    <p className={"statistics-title"}>{"Pracownicy"}</p>
                </li>
                <li className={"statistics-item"}>
                    <span className={"statistics-number"}>{"3111"}</span>
                    <p className={"statistics-title"}>{"Wszystkie zlecenia"}</p>
                </li>
                <li className={"statistics-item"}>
                    <span className={"statistics-number"}>{"34"}</span>
                    <p className={"statistics-title"}>{"Aktywne zlecenia"}</p>
                </li>
                <li className={"statistics-item"}>
                    <span className={"statistics-number"}>{"10"}</span>
                    <p className={"statistics-title"}>{"Moje zlecenia"}</p>
                </li>
            </ul>
        </div>
    ) : null;
}

export default AdminStatistics;
