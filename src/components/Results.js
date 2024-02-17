import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMoneyCheckDollar, faStar, faVideo, faMapPin, faHeart as faHeartRegular } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegularEmpty } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import '../styles/Results.css';
import TopMenu from './sub/TopMenu';
import Footer from './sub/Footer'; 

const Results = ({ location: propLocation, initialToken }) => {
    const realLocation = useLocation();
    const { state } = realLocation || {};

    const searchResults = state ? state.searchResults : [];
    console.log('Search Results:', searchResults);

    const [favourites, setFavourites] = useState([]);
    const [username, setUsername] = useState(null);

    const navigate = useNavigate();

    // call check-auth get request to retrieve the username and handle the favourite courses based on the displayed courses in the results page
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch('http://localhost:5194/api/check-auth', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${initialToken}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsername(data.username);
                } else {
                    console.error(`Error fetching authentication status. Status: ${response.status}, Message: ${response.statusText}`);
                }
            } catch (error) {
                console.error(error.message);
            }
        };

        checkAuthStatus();
    }, [initialToken]);

    // call get-favourites call to retrieve the existing favourite courses of the user from the Database
    useEffect(() => {
        if (username) {
            axios.post('http://localhost:5194/api/get-favourites', { username })
                .then(response => {
                    const favoritesArray = response.data.favorites.$values || [];
                    console.log('Fetched Favorites:', favoritesArray);
                    setFavourites(favoritesArray);
                })
                .catch(error => console.error('Error fetching favourites:', error));
        }
    }, [username]);

    const listStyle = {
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
        margin: '20px',
    };

    const heartButtonStyle = {
        cursor: 'pointer',
        marginLeft: '10px',
        color: 'red',
        height: '30px'

    };

    // call to add or remove a course from the user's favourite courses
    const toggleFavourite = (courseTitle) => {
        if (username) {
            const isFavourite = favourites.includes(courseTitle);
            const apiEndpoint = isFavourite ? 'remove-favourite' : 'add-favourite';

            const payload = {
                courseTitle,
                username,
            };

            axios.post(`http://localhost:5194/api/${apiEndpoint}`, payload)
                .then(response => {
                    const updatedFavorites = response.data.favorites;

                    if (updatedFavorites !== undefined) {
                        setFavourites(updatedFavorites.$values || updatedFavorites);
                    } else {
                        console.error('Invalid response format for favorites. Response:', response.data);
                    }
                })
                .catch(error => console.error(`Error ${isFavourite ? 'removing' : 'adding'} favourite:`, error));
        } else {
            console.error('Username not available. Cannot perform favourite operation.');
        }
    };

    // display the information of the given course that is returned after submitting search form
    const renderCourseSection = (courses) => {
        return (  
                <>
                <h3>Results (Courses):</h3>
                    {courses.map((course, index) => (
                        <div key={index} className="course-card">
                            <div className="course-header">
                            <h4>{course.title}</h4>
                            {/* Heart icon for adding/removing from favorites */}
                            {favourites && (
                                <FontAwesomeIcon
                                    icon={favourites && favourites.includes(course.title) ? faHeartRegular : faHeartRegularEmpty}
                                         style={heartButtonStyle}
                                        className="fa-icon heart-icon"
                                    onClick={() => toggleFavourite(course.title)}
                                />
                                )}
                            </div>
                            {/* Youtube video of the given course based on it's title */}
                            {/* ToDo: Need fix. No access using Youtube API */}
                            <iframe
                                className="course-video"
                                src={`https://www.youtube.com/embed/${getVideoIdFromYouTube(course.title)}`}
                                title={course.title}
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                            <div className="course-body">
                                <div className="course-info">
                                    <p>Level: {`${course.level}`}</p>
                                    <p>Duration: {`${course.duration}`} <FontAwesomeIcon icon={faClock} className="fa-icon fa-clock" /></p>
                                    <p>Sale: {course.onSale ? 'On Sale 50%. Please hurry up' : 'Not on sale'}</p>
                                    <p>Price: {`${course.price}`} <FontAwesomeIcon icon={faMoneyCheckDollar} className="fa-money-check-dollar" /></p>
                                    <p>Rating: {`${course.rating}`} <FontAwesomeIcon icon={faStar} className="fa-star" /></p>
                                    <p>Language: {`In ${course.language}`}</p>
                                    <p>Course Method: {`${course.courseFormat} method (via google meet)`} <FontAwesomeIcon icon={faVideo} className="fa-video" /></p>
                                    <p>{`Location: ${course.location || 'Unknown'} (${course.town || 'Unknown'})`} <FontAwesomeIcon icon={faMapPin} className="fa-map-pin" /></p>
                                </div>
                            </div>
                            <div className="course-action">
                                <p><a href={"/home"} rel="noopener noreferrer">Click here to purchase the course</a></p>
                            </div>
                        </div>
                    ))}
                </>
        );
    };

    const getVideoIdFromYouTube = async (courseTitle) => {
        try {
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${courseTitle}&type=video&key=AIzaSyANYBJzWaK77LRwjFOSTav3X6YTQ7V4ssg`);
            // Extract video ID from the API response
            const videoId = response.data.items[0]?.id.videoId;
            console.log('YouTube Video ID:', videoId);
            return videoId || 'NO_VIDEO_ID';
        } catch (error) {
            if (error.response && error.response.status === 403) {
                // Handle 403 Forbidden error by returning a random VIDEO_ID
                console.error('YouTube API Error: 403 Forbidden. Returning a random VIDEO_ID.');
                return 'RANDOM_VIDEO_ID';
            } else {
                console.error('Error fetching video ID from YouTube API:', error.message);
                throw error;
            }
        }
    };

    const handleBackToSearchClick = async (e) => {
        e.preventDefault();
        navigate('/search');
    }

    return (
        <div>
            <div className="results-home-container">
                <header className="home-header">
                    <TopMenu />
                </header>
                <div className="results-main">
                    <div style={listStyle}>
                        {searchResults && (
                            <>
                                {renderCourseSection(searchResults)}
                            </>
                        )}
                    </div>
                </div>
                <button onClick={handleBackToSearchClick} class="back-to-search"><i class="fa fa-arrow-left"></i> Back to Search</button>
            </div>
            <Footer />
        </div>
    );
}

export default Results;
