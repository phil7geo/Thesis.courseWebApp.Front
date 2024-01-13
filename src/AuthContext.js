import { createContext, useContext, useState, useEffect, useRef } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children, initialToken }) => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [isLoggedOut, setLoggedOut] = useState(false); // Add isLoggedOut state
    const isMounted = useRef(true);
    const [userInfo, setUserInfo] = useState();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch('http://localhost:5194/api/check-auth', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${initialToken}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setLoggedIn(data.isLoggedIn);
                    setUserInfo(data.username);
                } else {
                    console.error(`Error fetching authentication status. Status: ${response.status}, Message: ${response.statusText}`);
                    throw new Error('Authentication failed');
                }
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        // Only run the authentication check if the component is mounted for the first time
        if (isMounted.current) {
            checkAuthStatus();
            isMounted.current = false; // Update the ref to indicate that the component has been mounted
        }

        // Update authentication status whenever initialToken or isLoggedOut changes
        if (initialToken && !isLoggedOut) {
            checkAuthStatus();
        }

    }, [initialToken, isLoggedOut]);

    if (isLoading) {
        // You can render a loading indicator here if needed
        return <div>Loading...</div>;
    }

    const contextValue = { isLoggedIn, setLoggedIn, initialToken, isLoggedOut, setLoggedOut, userInfo }; 

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
