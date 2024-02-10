import React from 'react';
import '../styles/About.css';
import TopMenu from './TopMenu';
import Footer from './Footer';

const contactInfoStyle = {
    width: '50%',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', 
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', 
};

const mapStyle = {
    width: '50%',
    height: '400px',
    border: '0',
};

function About() {
    return (
        <div className="home-container">
            {/* Header */}
            <header className="home-header">
                {/* Logo and navigation */}
                {/* Top Menu Bar */}
                <TopMenu />
            </header>
            <div className="about-page" style={{ display: 'flex', padding: '20px' }}>
                <div className="contact-info" style={contactInfoStyle}>
                    <h2>Contact Us</h2>
                    <p>
                        Thank you for your interest in skillsmentorhub, the premier e-learning site for individuals looking to enhance their skills and knowledge. If you have any questions, suggestions, or concerns, please do not hesitate to contact us. You can reach us through our email at <a href="mailto:georgantzosphil@gmail.com">georgantzosphil@gmail.com</a> or by filling out the contact form on our website. Our team is dedicated to providing prompt and helpful responses to all inquiries.
                    </p>
                    <div>
                        <p>skillsmentorhub</p>
                        <p>Mystra 133A, 16561</p>
                        <p>6985620274</p>
                    </div>
                    <div>
                        <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                            Facebook
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                            Instagram
                        </a>
                    </div>
                </div>
                <div className="google-map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.67890!2d23.769124341058337!3d37.88680618659849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2zMzfCsDA3JzA0LjQiTiA3NMKwMjUnNTkuMiJX!5e0!3m2!1sen!2us!4v1234567890123!5m2!1sen!2us"
                        style={mapStyle}
                        title="Google Map"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default About;
