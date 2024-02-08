import React, { useState, useEffect } from 'react';
import '../styles/Contact.css';
import TopMenu from './TopMenu';

const Contact = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({
        FullName: '',
        Email: '',
        PhoneNumber: '',
        Message: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    useEffect(() => {
        let error = '';

        if (formData.Email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.Email)) {
                error = 'Invalid email format';
            }
        }

        if (formData.PhoneNumber) {
            const phoneRegex = /^69\d{8}$/;
            if (!phoneRegex.test(formData.PhoneNumber)) {
                error = 'Invalid mobile number format';
            }
        }

        setErrorMessage(error);
    }, [formData.Email, formData.PhoneNumber]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if any of the fields are empty
        if (!formData.FullName || !formData.Email || !formData.PhoneNumber || !formData.Message) {
            setErrorMessage('All the fields are required in order to send the message');
            return;
        }

        try {
            const response = await fetch('http://localhost:5194/api/contact/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Message sent successfully, handle accordingly
                console.log('Message sent successfully');

                // Clear error message
                setErrorMessage('');

                // Show the custom pop-up message
                setShowPopup(true);

                // Set success message
                setSuccessMessage('Message sent successfully');

                // Reset the form fields after submitting
                setFormData({
                    FullName: '',
                    Email: '',
                    PhoneNumber: '',
                    Message: '',
                });
            } else {
                // Message sending failed, handle accordingly
                console.error('Message sending failed');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setErrorMessage('');
        }
    };

    useEffect(() => {
        // Clear success message after 3 seconds (adjust as needed)
        const timer = setTimeout(() => {
            setSuccessMessage('');
        }, 3000);

        // Cleanup the timer on component unmount or when dependencies change
        return () => clearTimeout(timer);
    }, [successMessage]);

    return (
            <html>
                <div className="home-container">
                    {/* Header */}
                    <header className="home-header">
                        {/* Logo and navigation */}
                        {/* Top Menu Bar */}
                        <TopMenu />
                    </header>
                    <head>
                        <title>Contact form</title>
                        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous" />
                        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet" />
                    </head>
                    <body>
                        <div class="main-block">
                            <div class="left-part">
                                <i class="fas fa-envelope"></i>
                                <i class="fas fa-at"></i>
                                <i class="fas fa-mail-bulk"></i>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <h1>Contact Us</h1>
                                <div class="info">
                                    <input
                                        className="fname"
                                        type="text"
                                        name="FullName"
                                        id="FullName"
                                        placeholder="Full name"
                                        value={formData.FullName}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        id="Email"
                                        name="Email"
                                        placeholder="Email"
                                        value={formData.Email}
                                        onChange={handleInputChange}
                                    />
                                    {/* Display email validation error message */}
                                    {errorMessage && errorMessage.includes('Email') && <div className="error-message">{errorMessage}</div>}
                                    <input
                                        type="text"
                                        id="PhoneNumber"
                                        name="PhoneNumber"
                                        placeholder="Phone number"
                                        value={formData.PhoneNumber}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                {/* Display mobile number validation error message */}
                                {errorMessage && errorMessage.includes('PhoneNumber') && <div className="error-message">{errorMessage}</div>}
                                <p>Message</p>
                                <div>
                                    <textarea
                                        rows="4"
                                        id="Message"
                                        name="Message"
                                        value={formData.Message}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                                <button type="submit" disabled={!!errorMessage}>Submit</button>
                                {/* Display error message in case of submitting error */}
                                {errorMessage && <div className="error-message">{errorMessage}</div>}
                                {/* Custom pop-up message */}
                                {showPopup && (
                                    <div className="overlay">
                                        <div className="custom-popup">
                                            <h2>Thank You!</h2>
                                            <p>We appreciate your message. We'll get back to you soon.</p>
                                            <button onClick={() => setShowPopup(false)}>Close</button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </body>
                 </div>
            </html>
    )
}

export default Contact;
