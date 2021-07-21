import UserGreetings from '../../components/dashboard/UserGreetings'
import AdminStatistics from '../../components/dashboard/AdminStatistics'

export const AdminMainPage = () => {
    return (
        <div className={'grid'}>
            <div className={'orders'}></div>
            <div className={'main'}>
                <UserGreetings />
                <AdminStatistics />
            </div>
        </div>
    )
}
