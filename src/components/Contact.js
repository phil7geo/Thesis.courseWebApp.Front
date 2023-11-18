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
        <div className="container d-flex justify-content-center align-items-center">
            <img src="/contactIcon.svg" alt="hyper" />

            {/* <!-- FORM --> */}
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
            />
            <form onSubmit={handleSubmit}>
                <h1 className="title text-center mb-4">Talk to Us</h1>

                {/* Name */}
                <div className="form-group position-relative">
                    <label htmlFor="formName" className="d-block">
                        <i className="fas fa-user icon"></i>
                    </label>
                    <input
                        type="text"
                        id="formName"
                        className="form-control form-control-lg thick"
                        placeholder="Name"
                    />
                </div>

                {/* E-mail */}
                <div className="form-group position-relative">
                    <label htmlFor="formEmail" className="d-block">
                        <i className="fas fa-envelope icon"></i>
                    </label>
                    <input
                        type="email"
                        id="formEmail"
                        className="form-control form-control-lg thick"
                        placeholder="E-mail"
                    />
                </div>

                {/* Message */}
                <div className="form-group message">
                    <textarea
                        id="formMessage"
                        className="form-control form-control-lg"
                        rows="7"
                        placeholder="Message"
                    ></textarea>
                </div>

                {/* Submit btn */}
                <div className="text-center">
                    <button type="submit" className="btn btn-primary" tabIndex="-1">
                        Send message
                    </button>
                </div>
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
            )}

        </div>
    );
};

export default Contact;
