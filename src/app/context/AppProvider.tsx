import { Component } from 'react';
import { IAppContextProps, IAppContextState } from '../interfaces/context.interface';
import { AppContext } from './AppContext';

class AppProvider extends Component<IAppContextProps, IAppContextState> {
    // static context = AppContext;

    constructor(props: IAppContextProps) {
        super(props);

        this.state = {
            userId: '',
            userRole: 0
        }
    }

    updateUserId = (userId: string): void => {
        this.setState({ userId: userId });
    }

    updateUserRole = (role: number): void => {
        this.setState({ userRole: role });
    }

    render = () => {
        const { children } = this.props;
        const { userId, userRole } = this.state;

        return (
            <AppContext.Provider value={{
                userId: userId,
                userRole: userRole,
                updateUserId: this.updateUserId,
                updateUserRole: this.updateUserRole
            }}>
                {children}
            </AppContext.Provider>
        );
    }
}

export default AppProvider;
