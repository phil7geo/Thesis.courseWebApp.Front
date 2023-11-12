import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';

const Profile = () => {
    return (
        <div>
            <h1>Profile Page</h1>
            <Link to="/home">Go to Home Page</Link>
            <Button label="Profile" className="p-button-primary" />
            {/* Add other PrimeReact components and Tailwind CSS classes as needed */}
        </div>
    );
};

export default Profile