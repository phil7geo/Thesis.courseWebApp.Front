import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import TopMenu from './sub/TopMenu';
import Footer from './sub/Footer';

const Registration = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [registrationSuccess, setRegistrationSuccess] = useState(false);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Validation checks
        if (name === 'username') {
            const usernameRegex = /^(?=.*\d)[a-zA-Z0-9]{5,}$/;
            const isValid = usernameRegex.test(value);
            setErrors({
                ...errors,
                username: isValid ? '' : 'Username must be at least 5 characters and contain at least one digit.',
            });
        } else if (name === 'email') {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            const isValid = emailRegex.test(value);
            setErrors({
                ...errors,
                email: isValid ? '' : 'Enter a valid email address.',
            });
        } else if (name === 'password') {
            const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
            const isValid = passwordRegex.test(value);
            setErrors({
                ...errors,
                password: isValid
                    ? ''
                    : 'Password must contain at least 8 characters with at least one letter and one digit.',
            });
        } else if (name === 'confirmPassword') {
            // password and confirmPassword no match
            if (formData.password !== value) {
                setErrors({
                    ...errors,
                    confirmPassword: 'Passwords do not match.',
                });
            } else {
                setErrors({
                    ...errors,
                    confirmPassword: '',
                });
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await fetch('http://localhost:5194/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const responseData = await response.json();

                if (response.ok) {
                    setRegistrationSuccess(true);
                    navigate('/home');
                } else {
                    // Check the response data for specific error messages
                    if (responseData && responseData.Message) {
                        const fieldError = responseData.Message.toLowerCase(); // Assuming the error message contains the field name
                        setErrors({ ...errors, [fieldError]: responseData.Message, registration: '' });
                    } else {
                        setErrors({ ...errors, registration: responseData.message || 'Registration failed' });
                    }
                }
            } catch (error) {
                console.error('Registration failed:', error);
                setRegistrationSuccess(false);
            }
        } else {
            setRegistrationSuccess(false);
        }
    };



    const validateForm = () => {
        const { username, email, password, confirmPassword } = formData;
        let isFormValid = true;

        // Username validation
        if (!/^(?=.*\d)[a-zA-Z0-9]{5,}$/.test(username)) {
            // Username should have at least 5 characters, including at least one digit
            isFormValid = false;
            setErrors({ ...errors, username: 'Username is invalid' });
        }

        // Email validation
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            // Basic email format validation
            isFormValid = false;
            setErrors({ ...errors, email: 'Email is invalid' });
        }

        // Password validation
        if (password.length < 8) {
            isFormValid = false;
            setErrors({ ...errors, password: 'Password must be at least 8 characters' });
        }

        // Confirm password validation
        if (password !== confirmPassword) {
            isFormValid = false;
            setErrors({ ...errors, confirmPassword: 'Passwords do not match' });
        }

        return isFormValid;
    };

    // apply dynamic styles based on validation results
    const getInputStyle = (fieldName) => {
        if (errors[fieldName]) {
            return {
                borderColor: 'red',
            };
        }

        return {};
    };

    // ToDo fix: 400 error with google api  - no access
    const responseGoogle = (response) => {
        // Handle Google Sign-In response
        console.log(response);

        if (response.isFormValid) {
            console.log('Registration form submitted:', formData);
            setRegistrationSuccess(true); 
            navigate('/home');
        } else {
            setRegistrationSuccess(false);
        }
    };

    //Other CSS styles

    const leftColumnStyle = {
        paddingRight: '0px',
    };

    const rightColumnStyle = {
        paddingLeft: '80px',
    };

    const basicLogoStyle = {
        textAlign: 'center',
        margin: '130px 300px',
        width: '25%'
    };

    const imageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover', 
    };

    const inputGroupStyle = {
        marginBottom: '10px',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    };

    const RegistrationbuttonStyle = {
        width: '100%',
        padding: '10px',
        background: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    return (
        <div className="home-container">
            {/* Header */}
            <header className="home-header">
                {/* Logo and navigation */}
                {/* Top Menu Bar */}
                <TopMenu />
            </header>
                <div className="row">
                    <div className="col-md-6" style={leftColumnStyle}>
                        <img src="/login_img.jpg" alt="Login" style={imageStyle} />
                    </div>
                    <div className="col-md-6" style={rightColumnStyle}>
                        <img src="/basic_logo.svg" alt="hyper" className="mb-3" style={basicLogoStyle} />
                        <div className="card">
                            <div className="card-header bg-primary text-white">
                                <h4>Registration</h4>
                            </div>
                    <form onSubmit={handleSubmit}>
                        <GoogleLogin
                            clientId="388649358661-crn3rvemlmcvjr0tdi29jrj89artvrkd.apps.googleusercontent.com"
                            buttonText="Sign up with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                        <h6>or</h6>
                    <div className="form-group" style={inputGroupStyle}>
                        <label htmlFor="username">Username:</label>
                         <InputText
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            style={{ ...inputStyle, ...getInputStyle('username') }}
                        />
                    </div>
                   {errors.username && <div className="error-message">{errors.username}</div>}

                    <div className="form-group" style={inputGroupStyle}>
                        <label htmlFor="email">Email:</label>
                        <InputText
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            style={{ ...inputStyle, ...getInputStyle('email') }}
                        />
                    </div>
                    {errors.email && <div className="error-message">{errors.email}</div>}

                    <div className="form-group" style={inputGroupStyle}>
                        <label htmlFor="password">Password:</label>
                        <InputText
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            style={{ ...inputStyle, ...getInputStyle('password') }}
                        />
                    </div>
                    {errors.password && <div className="error-message">{errors.password}</div>}

                    <div className="form-group" style={inputGroupStyle}>
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <InputText
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            style={{ ...inputStyle, ...getInputStyle('confirmPassword') }}
                        />
                    </div>
                    {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}

                      <Button type="submit" className="btn btn-primary" style={RegistrationbuttonStyle}>
                        Create Account
                     </Button>
                            </form>
                            {errors.registration && <div className="error-message">{errors.registration}</div>}
                            {registrationSuccess && <div className="success-message">Registration successful!</div>}
                        </div>
                    </div>
                </div>
                <Footer />
        </div>
    );
}

export default Registration;