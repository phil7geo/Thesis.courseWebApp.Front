import React from 'react';
import '../styles/Profile.css';
import { useAuth } from '../AuthContext';
import TopMenu from './TopMenu';
import Footer from './Footer';

const Profile = () => {
    const { isLoggedIn, userInfo } = useAuth();

    const userPopularityData = [
        { id: 1, firstName: 'John', revenue: '$5000' },
        { id: 2, firstName: 'Alice', revenue: '$3000' },
        { id: 3, firstName: 'Bob', revenue: '$7000' },
    ];

    const skillsData = ['ReactJS', 'C#', 'JavaScript', 'HTML', 'CSS'];

    const experienceData = [
        { id: 1, title: 'Software Developer', company: 'Tech Co.', year: '2019-2022' },
        { id: 2, title: 'QA Tester', company: 'Testing Inc.', year: '2017-2019' },
    ];

    const educationData = [
        { id: 1, degree: 'Bachelor of Science in Computer Science', school: 'University ABC', year: '2013-2017' },
    ];

    const accomplishmentsData = ['Certified React Developer', 'CodeJam Winner'];

    const mediaLinksData = [
        { id: 1, link: 'https://twitter.com/johndoe', platform: 'Twitter' },
        { id: 2, link: 'https://linkedin.com/in/johndoe', platform: 'LinkedIn' },
    ];

    const generateLeadDescription = (userInfo) => {
        if (!userInfo) {
            return 'Welcome to our platform!';
        }

        const { username, email } = userInfo || {};

        // Create a personalized description based on user data
        return `Hi, I'm ${username}. I have a passion for learning and exploring new opportunities. Feel free to connect with me at ${email}. With 6 years of experience, I bring a wealth of knowledge. My education background includes 1 important degree. I'm proud of my accomplishments, having achieved notable milestones.`;
    };

    // Function to get a random location
    const getRandomLocation = () => {
        const cities = ['New York', 'London', 'Tokyo', 'Paris', 'Berlin'];
        const countries = ['USA', 'UK', 'Japan', 'France', 'Germany'];
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        const randomCountry = countries[Math.floor(Math.random() * countries.length)];
        return `${randomCity}, ${randomCountry}`;
    };

    const getRandomInterests = () => {
        const interests = ['Web Development', 'Machine Learning', 'Gaming', 'Photography', 'Travel'];
        return interests.slice(0, Math.floor(Math.random() * interests.length) + 1).join(', ');
    };

    // Function to get random programming languages
    const getRandomProgrammingLanguages = () => {
        const languages = ['JavaScript', 'C#', 'Python', 'Java', 'TypeScript'];
        return languages.slice(0, Math.floor(Math.random() * languages.length) + 1).join(', ');
    };

    // Function to get random hobbies
    const getRandomHobbies = () => {
        const hobbies = ['Cooking', 'Playing Music', 'Fitness', 'Gardening', 'Painting'];
        return hobbies.slice(0, Math.floor(Math.random() * hobbies.length) + 1).join(', ');
    };

    // Function to get random interests
    const additionalContent = (
        <div className="additional-content">
            <h3>Additional Information</h3>
            <p>
                I'm an enthusiastic developer and QA tester with a passion for creating efficient and robust applications.
                Currently based in {getRandomLocation()}, I enjoy exploring various technologies and contributing to open-source projects.
                My diverse interests include {getRandomInterests()}.
            </p>
            <ul>
                <li><strong>Location:</strong> {getRandomLocation()}</li>
                <li><strong>Interests:</strong> {getRandomInterests()}</li>
                <li><strong>Favorite Programming Languages:</strong> {getRandomProgrammingLanguages()}</li>
                <li><strong>Hobbies:</strong> {getRandomHobbies()}</li>
                {/* Add more content as needed */}
            </ul>
        </div>
    );

    return (
        <div>
            <link
                href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
                rel="stylesheet"
            />
            <div className="home-container">
                {/* Header */}
                <header className="home-header">
                    {/* Logo and navigation */}
                    {/* Top Menu Bar */}
                    <TopMenu />
                </header>
                <section id="content" className="container">
                    <div className="page-heading">
                        <div className="media clearfix">
                            <div className="media-left pr30">
                                <a href="#">
                                    <img className="media-object mw150" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="..." />
                                </a>
                            </div>
                            <div className="media-body va-m">
                                <h2 className="media-heading">
                                    {isLoggedIn && userInfo ? userInfo.username : 'Guest'}
                                    <small> - Profile</small>
                                </h2>
                                <p className="lead">{generateLeadDescription(userInfo)}</p>
                                <div className="media-links">
                                    <ul className="list-inline list-unstyled">
                                        {mediaLinksData.map((linkItem) => (
                                            <li key={linkItem.id}>
                                                <a href={linkItem.link} target="_blank" rel="noopener noreferrer">
                                                    {linkItem.platform}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="panel">
                                    <div className="panel-heading">
                                        <span className="panel-icon">
                                            <i className="fa fa-star"></i>
                                        </span>
                                        <span className="panel-title"> User Popularity</span>
                                    </div>
                                    <div className="panel-body pn">
                                        <table className="table mbn tc-icon-1 tc-med-2 tc-bold-last">
                                            <thead>
                                                <tr className="hidden">
                                                    <th className="mw30">#</th>
                                                    <th>First Name</th>
                                                    <th>Revenue</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {userPopularityData.map((user) => (
                                                    <tr key={user.id}>
                                                        <td>{user.id}</td>
                                                        <td>{user.firstName}</td>
                                                        <td>{user.revenue}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {/* My Skills Panel */}
                                <div className="panel">
                                    <div className="panel-heading">
                                        <span className="panel-icon">
                                            <i className="fa fa-trophy"></i>
                                        </span>
                                        <span className="panel-title"> My Skills</span>
                                    </div>
                                    <div className="panel-body pb5">
                                        {skillsData.map((skill, index) => (
                                            <span key={index} className="label label-success mr5">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                                {/* About Me Panel */}
                                <div className="panel">
                                    <div className="panel-heading">
                                        <span className="panel-icon">
                                            <i className="fa fa-pencil"></i>
                                        </span>
                                        <span className="panel-title">About Me</span>
                                    </div>
                                    <div className="panel-body pb5">
                                        <h6>Email</h6>
                                        {isLoggedIn && userInfo ? <p>{userInfo.email}</p> : null}

                                        <h6>Favorite Courses</h6>
                                        {isLoggedIn && userInfo ? <p>{userInfo.favouriteCourses}</p> : null}

                                        <h6>Experience</h6>
                                        <ul>
                                            {experienceData.map((exp) => (
                                                <li key={exp.id}>
                                                    <strong>{exp.title}</strong> at {exp.company}, {exp.year}
                                                </li>
                                            ))}
                                        </ul>
                                        <hr className="short br-lighter" />

                                        <h6>Education</h6>
                                        <ul>
                                            {educationData.map((edu) => (
                                                <li key={edu.id}>
                                                    {edu.degree} at {edu.school}, {edu.year}
                                                </li>
                                            ))}
                                        </ul>
                                        <hr className="short br-lighter" />

                                        <h6>Accomplishments</h6>
                                        <ul>
                                            {accomplishmentsData.map((acc, index) => (
                                                <li key={index}>{acc}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                {/* Additional Content Placement */}
                                {additionalContent}
                            </div> 
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;