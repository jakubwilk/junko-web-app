import { Helmet } from 'react-helmet';
import { TDashboardOwnerProps } from '../../utils/types/dashboard.types';

const DashboardOwnerPage = ({ title }: TDashboardOwnerProps) => {
    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>

            <h1>Dashboard owner</h1>
        </>
    );
}

export default DashboardOwnerPage;
