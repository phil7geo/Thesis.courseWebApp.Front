import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        fetch("/api/check-auth")
            .then(response => response.json())
            .then(data => setLoggedIn(data.isLoggedIn))
            .catch(error => console.error('Error fetching authentication status:', error));
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
