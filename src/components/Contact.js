import React, { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:5194/api/contact/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    phoneNumber,
                    message,
                }),
            });

            if (response.ok) {
                // Message sent successfully, handle accordingly
                console.log('Message sent successfully');
            } else {
                // Message sending failed, handle accordingly
                console.error('Message sending failed');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }

        // Show the custom pop-up message
        setShowPopup(true);

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
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="text"
                                name="phoneNumber"
                                placeholder="Phone number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                        <p>Message</p>
                        <div>
                            <textarea
                                rows="4"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                        </div>
                        <button type="submit">Submit</button>
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
