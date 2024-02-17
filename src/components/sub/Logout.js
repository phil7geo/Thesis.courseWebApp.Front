// Logout.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const Logout = () => {
    const { setLoggedIn, initialToken, setLoggedOut } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            // Ensure initialToken is available
            if (!initialToken) {
                console.error('Logout failed: Token is missing');
                setLoading(false);
                return;
            }

            const response = await fetch('http://localhost:5194/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${initialToken}`,
                },
            });

            if (response.ok) {
                // Clear the stored JWT token on successful logout
                localStorage.removeItem('jwtToken');
                // Update the local state
                setLoggedIn(false);
                setLoggedOut(true);
                navigate('/home');
            } else {
                console.error('Logout failed:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Logout failed:', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={handleLogout} disabled={loading}>
                Logout
            </button>
            {loading && <p>Logging out...</p>}
        </div>
    );
};

export default Logout;
