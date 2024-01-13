import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AuthProvider } from './AuthContext'; // Import AuthProvider

// Components
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import Profile from './components/Profile';
import Contact from './components/Contact';
import Search from './components/Search';
import Results from './components/Results';
import PasswordReset from './components/PasswordReset';
import About from './components/About';
import Logout from './components/Logout';

const App = () => {
    const [backendResponse, setBackendResponse] = useState('');
    // Assume storing of the JWT token in localStorage after a successful login
    const token = localStorage.getItem('jwtToken');

    useEffect(() => {
        // Fetch data from the backend
        fetch('http://localhost:5194/api/sample')
            .then(response => response.text())
            .then(data => setBackendResponse(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        // Wrap the main application component with AuthProvider
        <AuthProvider initialToken={token}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/results" element={<Results />} />
                    <Route path="/password-reset" element={<PasswordReset />} />
                    <Route path="/logout" element={<Logout/>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
