import React, { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
    const [showPopup, setShowPopup] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        message: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.phoneNumber || !formData.message) {
            console.error('Please fill out all fields');
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

                // Show the custom pop-up message
                setShowPopup(true);
            } else {
                // Message sending failed, handle accordingly
                console.error('Message sending failed');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setErrorMessage('');
        }

        // reset the form fields after submitting
        document.getElementById('formName').value = '';
        document.getElementById('formEmail').value = '';
        document.getElementById('formMobileNumber').value = '';
        document.getElementById('formMessage').value = '';
    };

    return (
        <html>
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
                                name="name"
                                placeholder="Full name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="phoneNumber"
                                placeholder="Phone number"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                            />
                        </div>
                        <p>Message</p>
                        <div>
                            <textarea
                                rows="4"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                        <button type="submit">Submit</button>
                        {/* Display error message in case of submitting error */}
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    </form>
                    {/* Custom pop-up message */}
                    {showPopup && (
                        <div className="overlay">
                            <div className="custom-popup">
                                <h2>Thank You!</h2>
                                <p>We appreciate your message. We'll get back to you soon.</p>
                                <button onClick={() => setShowPopup(false)}>Close</button>
                            </div>
                        </div>
                    )};
                </div>
            </body>
        </html>
    );
}

export default Contact;
