import React, { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        // Add your logic here to handle the form submission

        // Show the custom pop-up message
        setShowPopup(true);

        // Y reset the form fields after submitting
        document.getElementById('formName').value = '';
        document.getElementById('formEmail').value = '';
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
                            <input class="fname" type="text" name="name" placeholder="Full name" />
                            <input type="text" name="name" placeholder="Email" />
                            <input type="text" name="name" placeholder="Phone number" />
                        </div>
                        <p>Message</p>
                        <div>
                            <textarea rows="4"></textarea>
                        </div>
                        <button type="submit" href="/">Submit</button>
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
