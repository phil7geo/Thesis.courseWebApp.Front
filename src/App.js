import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

//Components
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import Profile from './components/Profile';
import Contact from './components/Contact';
import Search from './components/Search';
import Results from './components/Results';
import PasswordReset from './components/PasswordReset';
import About from './components/About';

const App = () => {
    const [backendResponse, setBackendResponse] = useState('');

    useEffect(() => {
        // Fetch data from the backend
        fetch('http://localhost:5194/api/sample')
            .then(response => response.text())
            .then(data => setBackendResponse(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        //Redirecting to all the pages with Routes in Basic App
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
            </Routes>
        </Router>
    );
};

export default App;
