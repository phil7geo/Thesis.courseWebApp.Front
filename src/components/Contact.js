import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';

const Contact = () => {
    return (
        <div>
            <h1>Contact Page</h1>
            <Link to="/login">Go to Login</Link>
            <Button label="Contact" className="p-button-primary" />
            {/* Add other PrimeReact components and Tailwind CSS classes as needed */}
        </div>
    );
};

export default Contact;