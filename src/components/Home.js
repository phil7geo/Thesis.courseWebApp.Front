import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import '../styles/Home.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import TopMenu from './TopMenu';

library.add(faFacebookF, faInstagram, faLinkedinIn);

const Home = () => {
    return (

        <div className="home-container">
            {/* Header */}
            <header className="home-header">
                {/* Logo and navigation */}
                {/* Top Menu Bar */}
                <TopMenu />
            </header>
            {/* Main content */}
            <main className="home-main">
                <div id="carouselexampleindicators" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselexampleindicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselexampleindicators" data-slide-to="1"></li>
                        <li data-target="#carouselexampleindicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100" src="/math.jpg" alt="first slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="/programming.jpg" alt="second slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="/psychology.jpg" alt="third slide" />
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselexampleindicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselexampleindicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </main>
                {/* Course highlights */}

                <section className="course-highlights">
                    {/* Featured courses */}
                    <h2>Featured Courses</h2>
                    <div className="course">
                        <h3>Math</h3>
                        <p>Description: Learn fundamental mathematical concepts with engaging video lessons.</p>
                        <p>Price: $99.99</p>
                        <p>Rating: ★★★★☆</p>
                        <video width="320" height="240" controls>
                            <source src="math_course.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>

                    <div className="course">
                        <h3>Programming</h3>
                        <p>Description: Master programming skills with hands-on coding exercises.</p>
                        <p>Price: $129.99</p>
                        <p>Rating: ★★★★★</p>
                        <video width="320" height="240" controls>
                            <source src="programming_course.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </section>

                {/* Additional sections */}
                <section className="additional-sections">
                    <h2>Student Testimonials</h2>
                    <div className="testimonial">
                        <p>"I learned so much from the Programming course. The instructors are fantastic!"</p>
                        <p className="author">- John Doe</p>
                    </div>

                    <div className="section">
                        <h2>Subscribe to Our Newsletter</h2>
                        <form className="subscription-form">
                            <input type="email" placeholder="Enter your email" />
                            <Button label="Subscribe" className="p-button-primary" />
                        </form>
                    </div>
                    {/* call to action */}
                    <div classname="cta-section">
                        <h4>are you ready to explore new courses?</h4>
                        <Link to="/search" classname="p-button-primary">get started </Link>
                    </div>
                </section>
{/*            </main>*/}

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
        </div>
    );
};


export default Home;
