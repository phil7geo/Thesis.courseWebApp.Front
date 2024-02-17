import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; 

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
import Logout from './components/sub/Logout';

const App = () => {

    // Assume storing of the JWT token in localStorage after a successful login
    const token = localStorage.getItem('jwtToken');

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
                    <Route path="/results" element={<Results initialToken={token} />} />
                    <Route path="/password-reset" element={<PasswordReset />} />
                    <Route path="/logout" element={<Logout/>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
