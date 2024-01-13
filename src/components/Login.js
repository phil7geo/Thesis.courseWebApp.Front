import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { useAuth } from '../AuthContext';

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [validation, setValidation] = useState({
        usernameValid: false,
        passwordValid: false,
    });

    const [loginSuccess, setLoginSuccess] = useState(null);
    const { setLoggedIn } = useAuth();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === 'username') {
            const isValid = validateUsername(value);
            setValidation({ ...validation, usernameValid: isValid });
        } else if (name === 'password') {
            const isValid = validatePassword(value);
            setValidation({ ...validation, passwordValid: isValid });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.username && formData.password) {
            try {
                const response = await fetch('http://localhost:5194/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    const data = await response.json();
                    const { token } = data;

                    // Store the token securely (consider alternatives like HTTP-only cookies)
                    localStorage.setItem('jwtToken', token);
                    console.log('Stored token:', token);

                    setLoggedIn(true);
                    setLoginSuccess(true);
                    navigate('/home');
                } else {
/*                    setLoggedIn(false);*/
                    setLoginSuccess(false);
                    throw new Error(`Error logging in: ${response.statusText}`);
                }
            } catch (error) {
                console.error('Login failed:', error);
                setLoginSuccess(false);
            }
        } else {
            setLoginSuccess(false);
        }
    };

    const validateUsername = (value) => {
        const regex = /^(?=.*\d)[a-zA-Z0-9]{5,}$/;
        return regex.test(value);
    };

    const validatePassword = (value) => {
        const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,}$/;
        return regex.test(value);
    };

    const responseGoogle = (response) => {
        // Handle Google Sign-In response here
        console.log(response);

        if (response && response.profileObj) {
            // Implement your login logic here
            // For now, let's just log the form data
            console.log('Login form submitted:', response.profileObj);
            setLoginSuccess(true); // Set login success to true
            // Redirect to the "/home" page
            navigate('/home');
        } else {
            setLoginSuccess(false); // Set login success to false
        }
    };

    //Other CSS styles
    const inputStyleUsername = {
        width: '100%',
        padding: '5px',
        border: '2px solid #ccc',
        borderRadius: '5px',
        borderColor: validation.usernameValid ? 'green' : 'red',
    };

    const inputStylePassword = {
        width: '100%',
        padding: '5px',
        border: '2px solid #ccc',
        borderRadius: '5px',
        borderColor: validation.usernameValid ? 'green' : 'red',
    };

    const passwordResetStyle = {
        marginTop: '10px',
        textAlign: 'center',
    };

    const passwordResetLinkStyle = {
        color: '#007bff',
        textDecoration: 'none',
    };

    const RegistrationTitleStyle = {
        textDecoration: 'none',
        marginTop: '5px',
        textAlign: 'center'
    };

    const RegistrationLinkStyle = {
        color: '#007bff',
        textDecoration: 'none',
        marginTop: '5px',
        textAlign: 'center'
    };

    const messageStyle = {
        textAlign: 'center',
        margin: '10px 0',
        color: loginSuccess ? 'green' : 'red', // Set the text color based on login success
    };

    const basicLogoStyle = {
        textAlign: 'center',
        margin: '-30px 175px',
        width: '40%'
    };

    const LoginBtnStyle = {
        textAlign: 'center',
        margin: '0px 150px',
        width: '200px'
    };

    const containerStyle = {
        padding: '50px'
    };

    const leftColumnStyle = {
        paddingRight: '0px',
    };

    const rightColumnStyle = {
        paddingLeft: '80px',
    };

    const imageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover', // Ensures the image covers the entire container
    };


    return (
        <div className="container" style={containerStyle}>
            <div className="row">
                <div className="col-md-6" style={leftColumnStyle}>
                    <img src="/login_img.jpg" alt="Login" style={imageStyle} />
                </div>
                <div className="col-md-6" style={rightColumnStyle}>
                    <img src="/basic_logo.svg" alt="hyper" className="mb-3" style={basicLogoStyle} />
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h4>Login</h4>
                        </div>
                        <span className="text-600 font-medium line-height-3" style={RegistrationTitleStyle}>Don't have an account?</span>
                        <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" href="/registration" style={RegistrationLinkStyle}>Create today!</a>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
{/*                                 Google Sign-In Button */}
                                <GoogleLogin
                                    clientId="388649358661-crn3rvemlmcvjr0tdi29jrj89artvrkd.apps.googleusercontent.com"
                                    buttonText="Sign in with Google"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle} // Optional: Handle failure
                                    cookiePolicy={'single_host_origin'}
                                />
                                <h6>or</h6>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <InputText
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        style={inputStyleUsername}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <InputText
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        style={inputStylePassword}
                                        required />
                                </div>
                                <div className="mb-3 form-check">
                                    <InputText type="checkbox" className="form-check-input" id="remember" />
                                    <label className="form-check-label" htmlFor="remember">Remember me</label>
                                </div>
                                <Button type="submit" className="btn btn-primary" style={LoginBtnStyle}>Login</Button>
                            </form>
                            <div style={messageStyle}>
                                {loginSuccess === true && 'Login successful. Redirecting...'}
                                {loginSuccess === false && 'Login failed. Please check your inputs.'}
                            </div>
                            <div style={passwordResetStyle}>
                                <a href="/password-reset" style={passwordResetLinkStyle}>
                                    Forgot your password?
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
