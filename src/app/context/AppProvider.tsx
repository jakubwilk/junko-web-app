import { Component } from 'react';
import { IAppContextProps, IAppContextState } from '../interfaces/context.interface';
import { AppContext } from './AppContext';

class AppProvider extends Component<IAppContextProps, IAppContextState> {
    constructor(props: IAppContextProps) {
        super(props);

        this.state = {
            userId: '',
            userRole: 0,
            firstName: '',
            lastName: '',
            email: '',
            url: '',
            isRedirectAllowed: false
        }
    }

    updateUserId = (userId: string): void => {
        this.setState({ userId: userId });
    }

    updateUserRole = (role: number): void => {
        this.setState({ userRole: role });
    }

    redirectUserToDashboard = (role: number) => {
        switch (role) {
            case 1:
                this.setState({ url: '/dashboard', isRedirectAllowed: true });
                break;
            case 2:
                this.setState({ url: '/dashboard', isRedirectAllowed: true });
                break;
            case 3:
                this.setState({ url: '/panel', isRedirectAllowed: true });
                break;
            default:
                this.setState({ url: '/', isRedirectAllowed: false });
                break;
        }
    }

    setBasicUserData = (userId: string, userRole: number) => {
        this.updateUserId(userId);
        this.updateUserRole(userRole);
        this.redirectUserToDashboard(userRole);
    }

    setPersonalUserData = (firstName: string, lastName: string, email: string) => {
        this.setState({ firstName: firstName, lastName: lastName, email: email });
    }

    resetContextState = () => {
        this.setState({
            userId: '',
            userRole: 0,
            firstName: '',
            lastName: '',
            email: '',
            url: '',
            isRedirectAllowed: false
        });
    }

    render = () => {
        const { children } = this.props;
        const { userId, userRole, firstName, lastName, email, url, isRedirectAllowed } = this.state;

        return (
            <AppContext.Provider value={{
                userId: userId,
                userRole: userRole,
                firstName: firstName,
                lastName: lastName,
                email: email,
                url: url,
                isRedirectAllowed: isRedirectAllowed,
                updateUserId: this.updateUserId,
                updateUserRole: this.updateUserRole,
                redirectUserToDashboard: this.redirectUserToDashboard,
                resetContextState: this.resetContextState,
                setBasicUserData: this.setBasicUserData,
                setPersonalUserData: this.setPersonalUserData
            }}>
                {children}
            </AppContext.Provider>
        );
    }
}

export default AppProvider;
