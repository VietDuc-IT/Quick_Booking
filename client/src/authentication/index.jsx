import { createContext, useContext, useState } from 'react';
import { Header } from '~/components/public/Header';
import { RenderRoutes } from './structure/RenderRoutes';

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const Authentication = () => {
    const [user, setUser] = useState({
        name: '',
        role: 'user',
        isAuthenticated: false,
    });

    const ROLES = {
        ADMIN: 'admin',
        MANAGER: 'manager',
        USER: 'user',
    };

    const passwords = '1';

    const login = (userName, password, role) => {
        // Make a call to the authentication API to check the username

        return new Promise((resolve, reject) => {
            if (password === passwords) {
                if (role === ROLES.ADMIN) {
                    setUser({ name: userName, role: ROLES.ADMIN, isAuthenticated: true });
                } else if (role === ROLES.MANAGER) {
                    setUser({
                        name: userName,
                        role: ROLES.MANAGER,
                        isAuthenticated: true,
                    });
                } else {
                    setUser({ name: userName, role: ROLES.USER, isAuthenticated: true });
                }
                resolve('success');
            } else {
                reject('Incorrect password');
            }
        });
    };
    const logout = () => {
        setUser({ ...user, isAuthenticated: false });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            <>
                <Header />
                {/* <RenderMenu /> */}
                <RenderRoutes />
            </>
        </AuthContext.Provider>
    );
};
