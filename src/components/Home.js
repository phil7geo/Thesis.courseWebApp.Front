// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import '../styles/Home.css';

const basicLogoStyle = {
    width: '50px', // Adjust the width as needed
    height: 'auto',
    marginRight: '10px', // Add some spacing between the logo and text
};

const Home = () => {
    return (
        <div className="container">
            {/* Top Menu Bar */}
            <nav>
                <Link to="/home">
                    <img src="/basic_logo.svg" alt="hyper" className="mb-3" style={basicLogoStyle} />
                </Link>
                <form action="/search/" className="search-form">
                    <input
                        type="hidden"
                        name="src"
                        value="ukw"
                    />
                    <input
                        type="text"
                        aria-invalid="false"
                        name="q"
                        placeholder="Search for anything"
                        autoComplete="off"
                        value=""
                        role="combobox"
                        aria-autocomplete="both"
                        aria-haspopup="true"
                        aria-expanded="false"
                        className="ud-text-input ud-text-input-small ud-text-sm ud-search-form-autocomplete-input js-header-search-field"
                    />
                    <button
                        type="submit"
                        disabled=""
                        className="ud-btn ud-btn-large ud-btn-ghost ud-heading-md ud-btn-disabled ud-btn-icon ud-btn-icon-large"
                        tabIndex="-1"
                    >
                        <svg
                            aria-label="Submit search"
                            role="img"
                            focusable="false"
                            className="ud-icon ud-icon-medium ud-icon-color-neutral"
                        >
                            <use xlinkHref="#icon-search"></use>
                        </svg>
                    </button>
                </form>
                <div>
                    <Link to="/login" className="button login-button">Login</Link>
                    <Link to="/registration" className="button registration-button">Registration</Link>
                </div>
            </nav>

            {/* Main Content */}
            <div className="content1">
                {/* Sections */}
                <div className="section">
                    <h2>Section 1</h2>
                    <p>Your content goes here.</p>
                </div>
                <div className="section">
                    <h2>Section 2</h2>
                    <p>Your content goes here.</p>
                </div>
            </div>
            <div className="content2">
                {/* Sections */}
                <div className="section">
                    <h2>Courses in High school</h2>
                    <p>Math</p>
{/*                    Video with a course - description,price,rating*/}
                </div>
                <div className="section">
                    <h2>Courses in University</h2>
                    <p>Programming</p>
{/*                    Video with a course - description,price,rating*/}
                </div>
            </div>
            {/* Call to Action */}
            <div className="mt-8">
                <h4>Are you ready to explore new courses?</h4>
                <Button label="Get Started" className="p-button-primary" />
            </div>
            <footer className="ud-footer" style={{ backgroundColor: 'black', color: 'white' }}>
                <div className="footer-section footer-section-main">
                    <div className="links-and-language-selector">
                        <ul className="ud-unstyled-list link-column">
                            <li><Link to="/link1">Link 1</Link></li>
                            <li><Link to="/link2">Link 2</Link></li>
                            <li><Link to="/link3">Link 3</Link></li>
                            <li><Link to="/link4">Link 4</Link></li>
                            <li><Link to="/link5">Link 5</Link></li>
                        </ul>
                        <div className="logo-container">
                            <img src="/basic_logo.svg" alt="hyper" className="mb-3" style={basicLogoStyle} />
                        </div>
                        <div className="copyright-container ud-text-xs">
                            © 2023 SkillsMentorHub, Inc.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
