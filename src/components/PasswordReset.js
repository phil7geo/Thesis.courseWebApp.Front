import React, { useState } from 'react';
import '../styles/PasswordReset.css';
import { Button } from 'primereact/button';

const PasswordReset = () => {

    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleResetPassword = async () => {
        try {
            const response = await fetch('http://localhost:5194/api/password-reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    oldPassword,
                    newPassword,
                }),
            });

            if (response.ok) {
                // Password reset successful, handle accordingly
                console.log('Password reset successful');
            } else {
                // Password reset failed, handle accordingly
                console.error('Password reset failed');
            }
        } catch (error) {
            console.error('Error resetting password:', error);
        }
    };

    return (
        <div>
            <div className="background-container"></div>
            <div className="container form-container">
                <h1>You can reset your password here</h1>

                {/* Password Reset Form */}
                <form>
                    <div className="form-group">
                        <label htmlFor="email" className="label">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="input-field"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="oldPassword" className="label">
                            Old Password:
                        </label>
                        <input
                            type="password"
                            id="oldPassword"
                            className="input-field"
                            placeholder="Enter your old password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />

                    </div>

                    <div className="form-group">
                        <label htmlFor="newPassword" className="label">
                            New Password:
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            className="input-field"
                            placeholder="Enter your new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>

                    <Button label="Reset Password" className="button p-button-primary" onClick={handleResetPassword}/>
                </form>s
            </div>
        </div>
    );
};

export default PasswordReset;
