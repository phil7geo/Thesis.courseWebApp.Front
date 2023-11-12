import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';

const Home = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <Link to="/login">Go to Login</Link>
            <Button label="Home" className="p-button-primary" />
            {/* Add other PrimeReact components and Tailwind CSS classes as needed */}
        </div>
    );
};

export default Home;