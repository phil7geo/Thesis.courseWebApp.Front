import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';

const Results = () => {
    return (
        <div>
            <h1>Results Page</h1>
            <Link to="/home">Go to Home Page</Link>
            <Button label="Results" className="p-button-primary" />
            {/* Add other PrimeReact components and Tailwind CSS classes as needed */}
        </div>
    );
};

export default Results;