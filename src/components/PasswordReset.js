import React from 'react';
import '../styles/PasswordReset.css';

import { Button } from 'primereact/button';

const PasswordReset = () => {
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
                        />
                    </div>

                    <Button label="Reset Password" className="button p-button-primary" />
                </form>s
            </div>
        </div>
    );
};

export default PasswordReset;
