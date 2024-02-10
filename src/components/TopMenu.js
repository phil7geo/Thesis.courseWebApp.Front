import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import { useAuth } from '../AuthContext';
import '../styles/TopMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const basicLogoStyle = {
    width: '80px',
    height: 'auto',
    marginRight: '10px',
};

const TopMenu = () => {
    const { isLoggedIn } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        navigate('/search');
        console.log('Searching for:', searchTerm);
    };

    return (
        <div className="top-menu">
            <div className="logo-container">
                <Link to="/home" className="logo">
                    <img src="/basic_logo.svg" alt="hyper" className="mb-3" style={basicLogoStyle} />
                    SkillsMentorHub
                </Link>
            </div>

            {/* search form-bar */}
            <form className="search-form" onSubmit={handleSearchSubmit}>
                <input
                    type="search"
                    className="search-input"
                    placeholder="Search for anything"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button type="submit" className="search-button">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </form>

            {isLoggedIn ? (
                <>
                    <div className="menu-items">
                        <Link to="/profile" className="button">Profile</Link>
                        <Logout />
                    </div>
                </>
            ) : (
                <>
                    <div className="menu-items">
                        <Link to="/login" className="button login-button">Login</Link>
                        <Link to="/registration" className="button registration-button">Register</Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default TopMenu;
