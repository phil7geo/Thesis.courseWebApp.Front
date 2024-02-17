import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import { useAuth } from '../../AuthContext';
import '../../styles/TopMenu.css';

const basicLogoStyle = {
    width: '80px',
    height: 'auto',
    marginRight: '10px',
};

const TopMenu = () => {
    const { isLoggedIn } = useAuth();

    return (
        <div className="top-menu">
            <div className="logo-container">
                <Link to="/home" className="logo">
                    <img src="/basic_logo.svg" alt="hyper" className="mb-3" style={basicLogoStyle} />
                    SkillsMentorHub
                </Link>
            </div>

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
