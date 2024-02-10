import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <>
            {/* Footer */}
            <footer className="home-footer">
                <div class="footer-container">
                    <div class="row">
                        <div class="col-md-3">
                            <Link to="/home" className="logo">
                            </Link>
                            <div class="footer-about">
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,  </p>
                            </div>

                        </div>
                        <div class="col-md-3">
                            <div class="useful-link">
                                <h2>Useful Links</h2>
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
        </>
    );
};

export default Footer;