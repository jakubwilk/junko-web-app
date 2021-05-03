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

    updateUserId = (userId: string) => {
        this.setState({ userId: userId });
    }

    updateUserRole = (role: number) => {
        this.setState({ userRole: role });
    }

    render = () => {
        const { children } = this.props;
        const { userId, userRole } = this.state;
        const { updateUserId, updateUserRole } = this;

        return (
            <AppContext.Provider value={{ userId, userRole, updateUserId, updateUserRole }}>
                {children}
            </AppContext.Provider>
        );
    }
}

export default AppProvider;
