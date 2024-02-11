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
import Footer from './Footer';
import CustomCarousel from './Carousel';

library.add(faFacebookF, faInstagram, faLinkedinIn);

const carouselItems = [
    {
        src: "/programming.jpg",
        alt: "First slide",
        title: "Become a professional programmer",
        description: "Are you interested to write code and be a master in one programming language?"
    },
    {
        src: "/psychology.jpg",
        alt: "Second slide",
        title: "Gain a certification in psychology",
        description: "Learn Psychology or improve your skills online today. Choose from a wide range of Psychology courses offered from top universities and industry leaders!"
    },
    {
        src: "/math.jpg",
        alt: "Third slide",
        title: "Enhance your mathematics skills",
        description: "Attend these courses and try to be become a specialist in Maths!"
    },
]

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
                <CustomCarousel items={carouselItems} />
                {/* Course highlights */}

                <section className="course-highlights">
                    {/* Featured courses */}
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
            <div className="additional-sections">
                <div className="section-card">
                        <h2>Student Testimonials</h2>
                        <div className="testimonial">
                            <p>"I learned so much from the Programming course. The instructors are fantastic!"</p>
                            <p className="author">- John Doe</p>
                    </div>
                    <div className="testimonial">
                        <p>"So happy to gain my certificate in Web Development. Lovely application!"</p>
                        <p className="author">- George Georgiou</p>
                    </div>

                        <div className="section">
                            <h2>Subscribe to Our Newsletter</h2>
                            <form className="subscription-form">
                                <input type="email" placeholder="Enter your email" />
                                <Button label="Subscribe" className="p-button-primary" />
                            </form>
                        </div>
                        {/* call to action */}
                    <div className="cta-section">
                        <h2>Are you ready to explore new courses?</h2>
                        <p>Find the perfect course for you and start learning today.</p>
                        <Link to="/search" className="btn-get-started">Get Started</Link>
                    </div>
                </div>
              </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};


export default Home;
