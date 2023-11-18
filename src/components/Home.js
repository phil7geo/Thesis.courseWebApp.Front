// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import '../styles/Home.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faFacebookF, faInstagram, faLinkedinIn);

const basicLogoStyle = {
    width: '50px',
    height: 'auto',
    marginRight: '10px',
};

const Home = () => {
    return (
        <div className="container">
            {/* Top Menu Bar */}
            <nav className="fixed-nav">
                <Link to="/home" className="logo">
                    <img src="/basic_logo.svg" alt="hyper" className="mb-3" style={basicLogoStyle} />
                    SkillsMentorHub
                </Link>
                <form action="/results/" className="search-form">
                    <input
                        type="hidden"
                        name="src"
                        value="ukw"
                    />
                    <input
                        type="text"
                        name="q"
                        placeholder="Search for anything"
                        autoComplete="off"
                        className="ud-text-input ud-text-input-small ud-text-sm ud-search-form-autocomplete-input js-header-search-field"
                    />
                    <button
                        type="submit"
                        className="search-button"
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
                <div className="nav-buttons">
                    <Link to="/login" className="button login-button">Login</Link>
                    <Link to="/registration" className="button registration-button">Register</Link>
                </div>
            </nav>

            {/* Main Content */}
            <div className="content">
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

            <div className="content">
                {/* Sections */}
                <div className="section">
                    <h2>Courses in High school</h2>
                    <div className="course">
                        <h3>Math</h3>
                        <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.</p>
                        <p>Price: $99.99</p>
                        <p>Rating: ★★★★☆</p>
                        {/* Add video player for the Math course */}
                        <video width="320" height="240" controls>
                            <source src="math_course.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>

                <div className="section">
                    <h2>Courses in University</h2>
                    <div className="course">
                        <h3>Programming</h3>
                        <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.</p>
                        <p>Price: $129.99</p>
                        <p>Rating: ★★★★★</p>
                        {/* Add video player for the Programming course */}
                        <video width="320" height="240" controls>
                            <source src="programming_course.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="cta-section">
                <h4>Are you ready to explore new courses?</h4>
                <Link to="/search" className="p-button-primary">Get Started</Link>
            </div>

            {/* Footer*/}
            <footer id="footer" className="ud-footer">
                <div class="container">
                    <div class="row">
                        <div class="col-md-3">
                            <Link to="/home" className="logo">
                                <img src="/basic_logo.svg" alt="hyper" class="img-fluid logo-footer" />
                            </Link>
                            {/*                            <div class="footer-about">
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,  </p>
                            </div>*/}

                        </div>
                        <div class="col-md-3">
                            <div class="useful-link">
                                <h2>Useful Links</h2>
                                {/*                                <img src="./assets/images/about/home_line.png" alt="" class="img-fluid"> </img>*/}
                                <div class="use-links">
                                    <li><a href="/home"><i class="fa-solid fa-angles-right"></i><strong>Home</strong></a></li>
                                    <li><a href="/about"><i class="fa-solid fa-angles-right"></i> <strong>About us</strong></a></li>
                                    <li><a href="/contact"><i class="fa-solid fa-angles-right"></i> <strong>Contact</strong></a></li>
                                </div>
                            </div>

                        </div>
                        <div class="col-md-3">

                            <div className="social-links">
                                <h2>Follow Us</h2>
                                <div className="social-icons">
                                    <li>
                                        <a href="https://www.facebook.com/phil7geo/" target="_blank" rel="noopener noreferrer">
                                            <FontAwesomeIcon icon={faFacebookF} />
                                            <strong>Facebook</strong>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.instagram.com/philippos_georgantzos/" target="_blank" rel="noopener noreferrer">
                                            <FontAwesomeIcon icon={faInstagram} />
                                            <strong>Instagram</strong>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.linkedin.com/in/filippos-georgantzos-4a9283130/" target="_blank" rel="noopener noreferrer">
                                            <FontAwesomeIcon icon={faLinkedinIn} />
                                            <strong>LinkedIn</strong>
                                        </a>
                                    </li>
                                </div>
                            </div>


                        </div>
                        <div class="col-md-3">
                            <div class="address">
                                <h2>Address</h2>
                                {/*                                <img src="./assets/images/about/home_line.png" alt="" class="img-fluid"> </img>*/}
                                <div class="address-links">
                                    <li class="address1"><i class="fa-solid fa-location-dot"></i> Mystra 133A 16561</li>
                                    <li><i class="fa-solid fa-phone"></i> +30 6985620274</li>
                                    <li><i class="fa-solid fa-envelope"></i> georgantzosphil@gmail.com</li>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </footer>
            <section id="copy-right">
                <div className="copyright-container ud-text-xs"><i class="fa-solid fa-copyright"></i>
                    Copyright 2023 @SkillsMentorHub. All rights are reserved.
                </div>
            </section>
        </div>
    );
};

export default Home;
