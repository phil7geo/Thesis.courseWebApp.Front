import React, { useState } from 'react';
import '../styles/PasswordReset.css';
import { Button } from 'primereact/button';
import TopMenu from './sub/TopMenu';
import Footer from './sub/Footer';

const PasswordReset = () => {

    const [formData, setFormData] = useState({
        email: '',
        oldPassword: '',
        newPassword: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (!formData.email || !formData.oldPassword || !formData.newPassword) {
            console.error('Please fill out all fields');
            return;
        }

        if (formData.email && formData.oldPassword && formData.newPassword)
        {
            try {
                const response = await fetch('http://localhost:5194/api/password-reset', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    console.log('Password reset successful');
                    setSuccessMessage('Password reset successful. Check your email for the reset link');
                    setErrorMessage('');

                } else {
                    console.error('Password reset failed');
                }
            } catch (error) {
                console.error('Error resetting password:', error);
                setSuccessMessage('');
                setErrorMessage('Error resetting password');
            }
        }

    };

    return (
        <div className="home-container">
            {/* Header */}
            <header className="home-header">
                {/* Logo and navigation */}
                {/* Top Menu Bar */}
                <TopMenu />
            </header>
            <div>
                <div className="background-container"></div>
                <div className="container form-container">
                    <h1>You can reset your password here</h1>

                    {/* Password Reset Form */}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email" className="label">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email" 
                                className="input-field"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="oldPassword" className="label">
                                Old Password:
                            </label>
                            <input
                                type="password"
                                id="oldPassword"
                                name="oldPassword" 
                                className="input-field"
                                placeholder="Enter your old password"
                                value={formData.oldPassword}
                                onChange={handleInputChange}
                            />

                        </div>

                        <div className="form-group">
                            <label htmlFor="newPassword" className="label">
                                New Password:
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword" 
                                className="input-field"
                                placeholder="Enter your new password"
                                value={formData.newPassword}
                                onChange={handleInputChange}
                            />
                        </div>

                        <Button label="Reset Password" className="button p-button-primary" />

                        {/* Display success or error message depends on the given credentials for password-reset */}
                        {successMessage && <div className="success-message" aria-live="assertive">{successMessage}</div>}
                        {errorMessage && <div className="error-message" aria-live="assertive">{errorMessage}</div>}
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PasswordReset;
