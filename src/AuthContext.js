import { createContext, useContext, useState, useEffect, useRef } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children, initialToken }) => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [isLoggedOut, setLoggedOut] = useState(false); 
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
                    setUserInfo(data); 
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
        // render a loading indicator
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
    const context = useContext(AuthContext);

    // retrieve the authenticated user
    const getAuthenticatedUser = async () => {
        // If userInfo is not available, fetch it from the backend by calling check-auth get request
        if (!context.userInfo) {
            try {
                const response = await fetch('http://localhost:5194/api/check-auth', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${context.initialToken}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    context.setUserInfo(data);
                    return data;
                } else {
                    console.error(`Error fetching user info. Status: ${response.status}, Message: ${response.statusText}`);
                    throw new Error('Failed to fetch user info');
                }
            } catch (error) {
                console.error(error.message);
                throw error;
            }
        }

        return context.userInfo;
    };

    return { ...context, getAuthenticatedUser };
};
