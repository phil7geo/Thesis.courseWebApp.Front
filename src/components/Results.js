import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMoneyCheckDollar, faStar, faVideo, faMapPin, faHeart as faHeartRegular } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegularEmpty } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

const Results = ({ location: propLocation, initialToken }) => {
    const realLocation = useLocation();
    const { state } = realLocation || {};

    const searchResults = state ? state.searchResults : [];
    console.log('Search Results:', searchResults);

    const [favourites, setFavourites] = useState([]);
    const [username, setUsername] = useState(null);

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

    const courseStyle = {
        marginBottom: '20px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
    };

    const videoStyle = {
        width: '100%',
        height: '315px',
        marginBottom: '15px',
        borderRadius: '8px',
    };

    const heartButtonStyle = {
        cursor: 'pointer',
        marginLeft: '10px',
        color: 'red',
        height: '30px'

    };

    const toggleFavourite = (courseTitle) => {
        if (username) {
            const isFavourite = favourites.includes(courseTitle);
            const apiEndpoint = isFavourite ? 'remove-favourite' : 'add-favourite';

            // Constructing the payload similar to the search API request
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

    const renderCourseSection = (courses) => {
        return (
            <>
                <h3>Courses:</h3>
                {courses.map((course, index) => (
                    <div key={index} style={courseStyle}>
                        <h4>{course.title}</h4>
                        {/* Heart icon for adding/removing from favorites */}
                        {favourites && (
                            <FontAwesomeIcon
                                icon={favourites && favourites.includes(course.title) ? faHeartRegular : faHeartRegularEmpty}
                                style={heartButtonStyle}
                                onClick={() => toggleFavourite(course.title)}
                            />
                        )}
                        <iframe
                            style={videoStyle}
                            src={`https://www.youtube.com/embed/${getVideoIdFromYouTube(course.title)}`}
                            title={course.title}
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                        <p>{`${course.level} Level`}</p>
                        <p>{`${course.duration}`} <FontAwesomeIcon icon={faClock} /></p>
                        <p>{course.onSale ? 'On Sale 50%. Please hurry up' : 'Not on sale'}</p>
                        <p>{`${course.price}`} <FontAwesomeIcon icon={faMoneyCheckDollar} /></p>
                        <p>{`${course.rating}`} <FontAwesomeIcon icon={faStar} /></p>
                        <p>{`In ${course.language}`}</p>
                        <p>{`${course.courseFormat} method (via google meet)`} <FontAwesomeIcon icon={faVideo} /></p>
                        <p>{`Location: ${course.location || 'Unknown'} (${course.town || 'Unknown'})`} <FontAwesomeIcon icon={faMapPin} /></p>

                        <p><a href={"/home"} rel="noopener noreferrer">Click here to purchase the course</a></p>
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

    return (
        <div style={resultsStyle}>
            <h2>Results (Courses)</h2>
            <div style={listStyle}>
                {searchResults && (
                    <>
                        {renderCourseSection(searchResults)}
                    </>
                )}
            </div>
        </div>
    );
}

export default Results;
