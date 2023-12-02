import React from 'react';

function Results({ filterOptions }) {
    // Sample data (replace with actual data)
    const courses = [
        { title: 'Course 1', link: 'https://www.udemy.com/course1' },
        { title: 'Course 2', link: 'https://www.udemy.com/course2' },
        // Add more course data
    ];

    const teachers = [
        { name: 'Teacher 1', profile: 'https://teacher1profile.com' },
        { name: 'Teacher 2', profile: 'https://teacher2profile.com' },
        // Add more teacher data
    ];

    const seminars = [
        { title: 'Seminar 1', link: 'https://seminar1.com' },
        { title: 'Seminar 2', link: 'https://seminar2.com' },
        // Add more seminar data
    ];

    const filteredCourses = courses; // Apply filtering logic based on filterOptions
    const filteredTeachers = teachers; // Apply filtering logic based on filterOptions
    const filteredSeminars = seminars; // Apply filtering logic based on filterOptions

    const resultsStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f4f4',
    };

    const listStyle = {
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
        margin: '20px',
    };

    return (
        <div style={resultsStyle}>
            <h2>Filtered Results</h2>
            <div style={listStyle}>
                <h3>Udemy Courses:</h3>
                <ul>
                    {filteredCourses.map((course, index) => (
                        <li key={index}>
                            <a href={course.link} target="_blank" rel="noopener noreferrer">
                                {course.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div style={listStyle}>
                <h3>Teachers:</h3>
                <ul>
                    {filteredTeachers.map((teacher, index) => (
                        <li key={index}>
                            <a href={teacher.profile} target="_blank" rel="noopener noreferrer">
                                {teacher.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div style={listStyle}>
                <h3>Related Seminars:</h3>
                <ul>
                    {filteredSeminars.map((seminar, index) => (
                        <li key={index}>
                            <a href={seminar.link} target="_blank" rel="noopener noreferrer">
                                {seminar.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Results;
