import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Search.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import * as tf from '@tensorflow/tfjs';
import { useAuth } from '../AuthContext';
import TopMenu from './TopMenu';
function Search() {
    const navigate = useNavigate();

    const [level, setLevel] = useState('');
    const [subject, setSubjects] = useState([]);
    const [location, setLocation] = useState('');
    const [language, setLanguage] = useState([]);
    const [duration, setDuration] = useState('');
    const [priceRange, setPriceRange] = React.useState([])
    const [onSale, setOnSale] = useState(false);
    const [certification, setCertification] = useState(false);
    const [rating, setRating] = useState('');
    const [selectedLocationType, setSelectedLocationType] = useState('town');
    const [selectedTown, setSelectedTown] = useState('');
    const [customLocation, setCustomLocation] = useState('');
    const [selectedCourseFormat, setSelectedCourseFormat] = useState('asynchronous');
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [otherSubjectInput, setOtherSubjectInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [rnnModel, setRNNModel] = useState(null);
    const [predictedCourses, setPredictedCourses] = useState([]);
    const [courses, setCourses] = useState([]);
    const [errors, setErrors] = useState({
        level: '',
        subjects: '',
        location: '',
        language: '',
        duration: '',
        priceRange: '',
    });
    const maxPredictionsToShow = 5;
    const { getAuthenticatedUser } = useAuth();

    const greekTowns = ['Athens', 'Thessaloniki', 'Patras', 'Heraklion', 'Larissa', 'Volos', 'Ioannina'];

    // List of possible subjects
    const possibleSubjects = ['Mathematics', 'Physics', 'Chemistry', 'History', 'Literature',
        'Biology', 'Philosophy', 'Languages', 'Jurisprudence', 'Medicine',
        'Business Administration', 'Artificial Intelligence (AI)', 'Finance',
        'Marketing', 'Human Resources(HR)', 'Psychology', 'Sports', 'Health and Wellness',
        'Political Science', 'Data Science', 'Web Development', 'Cybersecurity', 'Engineering',
        'Information Technology (IT)', 'Other'];

    const modelPath = process.env.PUBLIC_URL + '/model/model.json';

    const applyUserFilters = (course) => {
        // Example User Filter Logic
        // Filter courses based on selected subjects
        if (selectedSubjects.length > 0 && !selectedSubjects.every((interest) => course.subject.includes(interest))) {
            return false;
        }

        // Add more user filter conditions as needed
        // ...

        return true;
    };

    const applyModelFilters = (course) => {
        // Example Model Filter Logic
        // Placeholder logic, modify based on your model's predictions
        // Return true if the course passes the model's filters, false otherwise
        return Math.random() > 0.5; // Placeholder condition
    };

    const handleExploreClick = (course) => {
        console.log(`Explore clicked for ${course}`);

        // Construct dummy data similar to the searchResults format in order to retrieve the courseTitle info in results page
        const searchResults = [{
            title: course.trim(),
            subject: "",
            level: "",
            duration: "",
            language: "",
            courseFormat: "",
            certification: "",
            onSale: "",
            price: "",
            rating: "",
            location: "",
            town: ""
        }];

        navigate('/results', { state: { searchResults: searchResults } });
    };

    const resetForm = () => {
        setLevel('');
        setSubjects([]);
        setLocation('');
        setDuration([]);
        setLanguage([]);
        setPriceRange([]);
        setOnSale(false);
        setCertification(false);
        setRating('');
        setSelectedLocationType('');
        setSelectedTown('');
        setCustomLocation('');
        setSelectedCourseFormat('');
        setOtherSubjectInput('');

        setTimeout(() => {
            setErrors({});
        }, 5000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear any previous error messages
        setErrors({});

        // Perform filtering based on selected filters and model predictions
        const filteredCourses = courses.filter((course) => {
            // Apply filter conditions based on user input
            const passesUserFilters = applyUserFilters(course);

            // Apply filter conditions based on model predictions
            const passesModelFilters = applyModelFilters(course);

            // Combine user and model filter results
            const passesAllFilters = passesUserFilters && passesModelFilters;

            return passesAllFilters;
        });

        // Check for empty fields
        const newErrors = {
            level: !level.trim() ? 'Define your level please' : '',
            subjects: selectedSubjects.length === 0 ? 'Select at least one subject' : '',
            duration: typeof duration !== 'string' || !duration.trim() ? 'The field cannot be empty' : '',
        };

        // Combine all error messages into an object
        const allErrors = { ...errors, ...newErrors };

        // Check if any field has an error
        if (Object.values(allErrors).some((error) => error !== '')) {
            setErrors(allErrors);
            return;
        }

        const sanitizedPriceRange = priceRange.map(value => (value === null ? [null, null] : parseFloat(value)));

        const payload = {
            Level: level,
            Subject: selectedSubjects,
            Duration: duration,
            OnSale: onSale,
            Rating: rating !== '' ? parseFloat(rating) : null,
            PriceRange: sanitizedPriceRange,
            Certification: certification,
            Language: language,
            CourseFormat: selectedCourseFormat,
            Location: selectedLocationType,
            Town: selectedLocationType === 'town' ? selectedTown : customLocation,
        };

        try {
            // Get the JWT token from localStorage
            const jwtToken = localStorage.getItem('jwtToken');

            // Send the search query and filters to the backend API
            const response = await fetch('http://localhost:5194/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                if (response.status === 500) {
                    // Handle 500 Internal Server Error
                    console.error('Internal Server Error. No matched results.');
                    setErrors({ internalServerError: 'No matched results. Please provide new filters to search for a course.' });
                } else if (response.status === 400) {
                    console.error('Bad Request. Invalid search criteria.');
                } else {
                    console.error('Failed to fetch data. Unexpected error.');
                }
                return;
            }

            const data = await response.json();
            console.log('Search results:', data);

            const matchedResults = data.similarMatchedResults || data.actualMatchedResults;

            const searchResults = matchedResults.$values.map(result => ({
                title: result.title.trim(), 
                subject: result.subject,
                level: result.level,
                duration: result.duration,
                language: result.language,
                courseFormat: result.courseFormat,
                certification: result.certification,
                onSale: result.onSale,
                price: result.price,
                rating: result.rating,
                location: result.location,
                town: result.town
            }));

            console.log('Formatted Search Results:', searchResults);

            navigate('/results', { state: { searchResults: searchResults } });
        } catch (error) {
            console.error('Error during search query:', error);
        } finally {
            resetForm();
        }
    };

    // Perform filtering based on various filters
    const filteredCourses = courses.filter((course) => {
        if (level && course.level !== level) {
            return false;
        }
        if (subject.length > 0 && !subject.every((interest) => course.subject.includes(interest))) {
            return false;
        }
        if (location && course.location !== location) {
            return false;
        }
        if (language.length > 0 && !language.includes(course.language)) {
            return false;
        }
        if (duration && course.duration !== duration) {
            return false;
        }
        if (priceRange && (course.price < 10 || course.price > 100)) {
            return false;
        }
        if (certification && !course.certification) {
            return false;
        }
        if (rating && course.rating < parseFloat(rating)) {
            return false;
        }
        return true;
    });

    const handleLocationTypeChange = (e) => {
        setSelectedLocationType(e.target.value);
        setSelectedTown(''); // Clear the selected town when changing location type
    };

    const handleTownChange = (e) => {
        setSelectedTown(e.target.value);
    };

    const handleCustomLocationChange = (e) => {
        setCustomLocation(e.target.value);
    };

    const handleCourseFormatChange = (e) => {
        setSelectedCourseFormat(e.target.value);

        setLocation('');
        setSelectedLocationType('town');
        setSelectedTown('');
        setCustomLocation('');
    };

    const handleLevelChange = (e) => {
        const value = e.target.value;
        setLevel(value);

        // Clear the error message for duration when user provides a valid value
        setErrors((prevErrors) => ({
            ...prevErrors,
            level: !value.trim() ? 'Define your level please' : '',
        }));

        if (value.trim()) {
            makePredictions();
        }
    };

    const handleSubjectsChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);

        // Check if 'Other' is selected
        if (selectedOptions.includes('Other')) {
            // Clear otherSubjectInput when 'Other' is not selected
            setOtherSubjectInput('');
        }

        setSelectedSubjects(selectedOptions);

        // Clear the error message for subjects when user provides a valid value
        setErrors((prevErrors) => ({
            ...prevErrors,
            subjects: selectedOptions.length === 0 ? 'Select at least one subject' : '',
        }));
    };

    const handleDurationChange = (e) => {
        const value = e.target.value.toString();  // Ensure value is a string
        setDuration(value);

        // Clear the error message for duration when the user provides a valid value
        setErrors((prevErrors) => ({
            ...prevErrors,
            duration: !value.trim() ? 'The field cannot be empty' : '',
        }));
    };

    const handleOtherSubjectChange = (e) => {
        setOtherSubjectInput(e.target.value);
    };


    const handleRatingChange = (e) => {
        setRating(parseFloat(e.target.value));
    };

    const handlePriceRangeChange = (values) => {
        setPriceRange(values);
    };

    async function loadModel() {
        const model = await tf.loadLayersModel(modelPath);
        return model;
    }

    const tokenToNumericValue = (token) => {
        const tokenDictionary = {
            'exampleToken1': 1,
            'exampleToken2': 2,
            // Add more tokens as needed
        };

        return tokenDictionary[token] || 0; // Return 0 if token not found in the dictionary
    };

    const preprocessUserInput = (inputText) => {
        // Implement your preprocessing logic here
        // Example: Tokenization
        const tokens = inputText.split(' ');

        // Convert tokens to a numeric tensor (example)
        const inputTensor = tf.tensor2d([tokens.map(tokenToNumericValue)]);

        return inputTensor;
    };

    const handlePredictedData = async (userInput) => {
        try {
            const authenticatedUser = await getAuthenticatedUser();
            let username = authenticatedUser?.username || null; // Initialize as null

            // Preprocess the input tensor to a format that the backend can handle (convert to string)
            const preprocessedInputTensor = preprocessInputTensor(userInput);

            const response = await fetch('http://localhost:5194/api/predictions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    UserInput: preprocessedInputTensor,
                    Username: username,
                }),
            });

            if (response.ok) {
                console.log('User input and username sent for predictions successfully');
            } else {
                console.error('Failed to send user input and username for predictions');
            }
        } catch (error) {
            console.error('Error sending user input and username for predictions:', error);
        }
    };

    const makePredictions = async () => {
        try {
            if (rnnModel) {
                // Preprocess input data based on user input
                const inputTensor = preprocessUserInput(searchQuery);

                // Fetch predictions from the backend
                const prediction = await fetchPredictions(inputTensor);

                // Process and display the prediction
                const predictedData = prediction.predictions || [];
                setPredictedCourses(predictedData.$values);

                console.log('Prediction:', predictedData);

                // Call handlePredictedData only once after setting the state
                if (predictedData.length > 0) {
                    await handlePredictedData(searchQuery);
                }
            } else {
                console.warn('RNN model not yet loaded');
            }
        } catch (error) {
            console.error('Error making predictions:', error);
        }
    };


    const fetchPredictions = async (inputTensor) => {
        try {
            const authenticatedUser = await getAuthenticatedUser();
            let username = authenticatedUser?.username || null;

            // user might not be authenticated
            if (authenticatedUser && authenticatedUser.username) {
                username = authenticatedUser.username;
            }

            // Preprocess the input tensor to a format that the backend can handle (convert to string)
            const userInput = preprocessInputTensor(inputTensor);

            const response = await fetch('http://localhost:5194/api/predictions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    UserInput: userInput,
                    Username: username,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.error('Failed to fetch predictions from the backend');
                return {};
            }
        } catch (error) {
            console.error('Error fetching predictions:', error);
            return {};
        }
    };

    const preprocessInputTensor = (inputTensor) => {
        // Convert the tensor to a 1D array and then join its elements into a string
        const userInput = inputTensor.dataSync().join(',');
        return userInput;
    };

        // Load the RNN model when the component mounts
        useEffect(() => {
            async function loadRNNModel() {
                try {
                    const loadedModel = await loadModel();
                    setRNNModel(loadedModel);
                } catch (error) {
                    console.error('Error loading RNN model:', error);
                }
            }

            loadRNNModel();
        }, []);

        return (
            <div className="home-container">
                {/* Header */}
                <header className="home-header">
                    {/* Logo and navigation */}
                    {/* Top Menu Bar */}
                    <TopMenu />
                </header>
                <div className="left-column">
                    <h2>Search for Courses</h2>
                    <form onSubmit={handleSubmit} className="search-form">
                        <select
                            value={level}
                            onChange={(e) => {
                                handleLevelChange(e);
                            }}
                        >
                            <option value="">Select Level</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                        <div>
                            {/* Display individual error messages for level */}
                            {errors.level && <div style={{ color: 'red' }}>{errors.level}</div>}
                            <label>Select Subjects:</label>
                            <select
                                multiple
                                value={selectedSubjects}
                                onChange={handleSubjectsChange}
                            >
                                {possibleSubjects.map((subject, index) => (
                                    <option key={index} value={subject}>
                                        {subject}
                                    </option>
                                ))}
                            </select>

                            {/* Conditionally render the text field for 'Other' option */}
                            {selectedSubjects.includes('Other') && (
                                <div>
                                    <label>Other Subjects:</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Gaming, Crypto"
                                        value={otherSubjectInput}
                                        onChange={handleOtherSubjectChange}
                                    />
                                </div>
                            )}
                        </div>
                        {/* Display individual error messages for subjects */}
                        {errors.subjects && <div style={{ color: 'red' }}>{errors.subjects}</div>}
                        <div>
                            <label>Select Course Format:</label>
                            <select
                                value={selectedCourseFormat}
                                onChange={handleCourseFormatChange}
                            >
                                <option value="asynchronous">Asynchronous (video-based)</option>
                                <option value="synchronous">Synchronous (live with instructor)</option>
                            </select>
                        </div>
                        {/* Conditionally render location fields based on course format */}
                        {selectedCourseFormat === 'synchronous' && (
                            <div>
                                <div>
                                    <label>Select Location:</label>
                                    <select
                                        value={selectedLocationType}
                                        onChange={handleLocationTypeChange}
                                    >
                                        <option value="town">Main Town</option>
                                        <option value="custom">Other Town</option>
                                    </select>
                                </div>

                                {selectedLocationType === 'town' ? (
                                    <div>
                                        <label>Select Town:</label>
                                        <select
                                            value={selectedTown}
                                            onChange={handleTownChange}
                                        >
                                            <option value="">Select Town</option>
                                            {greekTowns.map((town, index) => (
                                                <option key={index} value={town}>
                                                    {town}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ) : (
                                    <div>
                                        <label>Other Location:</label>
                                        <input
                                            type="text"
                                            placeholder="Enter Other Location e.g. Trikala"
                                            value={customLocation}
                                            onChange={handleCustomLocationChange}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                        <div >
                            <label>Languages:</label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="English"
                                    checked={language.includes('English')}
                                    onChange={(e) =>
                                        e.target.checked
                                            ? setLanguage([...language, 'English'])
                                            : setLanguage(language.filter((lang) => lang !== 'English'))
                                    }
                                />
                                English
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="Greek"
                                    checked={language.includes('Greek')}
                                    onChange={(e) =>
                                        e.target.checked
                                            ? setLanguage([...language, 'Greek'])
                                            : setLanguage(language.filter((lang) => lang !== 'Greek'))
                                    }
                                />
                                Greek
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="German"
                                    checked={language.includes('German')}
                                    onChange={(e) =>
                                        e.target.checked
                                            ? setLanguage([...language, 'German'])
                                            : setLanguage(language.filter((lang) => lang !== 'German'))
                                    }
                                />
                                German
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="French"
                                    checked={language.includes('French')}
                                    onChange={(e) =>
                                        e.target.checked
                                            ? setLanguage([...language, 'French'])
                                            : setLanguage(language.filter((lang) => lang !== 'French'))
                                    }
                                />
                                French
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="Other"
                                    checked={language.includes('Other')}
                                    onChange={(e) =>
                                        e.target.checked
                                            ? setLanguage([...language, 'Other'])
                                            : setLanguage(language.filter((lang) => lang !== 'Other'))
                                    }
                                />
                                Other
                            </label>
                        </div>
                        <select
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            onChange={handleDurationChange}
                        >
                            <option value="">Select Duration</option>
                            <option value="short-term">Short-term</option>
                            <option value="long-term">Long-term</option>
                            <option value="custom">Specific Timeframe</option>
                        </select>
                        {duration === 'custom' && (
                            <input
                                type="text"
                                placeholder="Enter Timeframe"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                            />
                        )}
                        {/* Display individual error messages for duration */}
                        {errors.duration && <div style={{ color: 'red' }}>{errors.duration}</div>}
                        <div>
                            <label>Price Range:</label>
                            <Slider
                                style={{ backgroundColor: 'grey' }}
                                range
                                min={10}
                                max={1000}
                                step={1}
                                value={priceRange}
                                onChange={handlePriceRangeChange}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>{priceRange[0]}$</span>
                                <span>{priceRange[1]}$</span>
                            </div>
                        </div>
                        <label>
                            Gain Certification/Degree
                            <input
                                type="checkbox"
                                checked={certification}
                                onChange={() => setCertification(!certification)}
                            />
                        </label>
                        <label>
                            On Sale
                            <input
                                type="checkbox"
                                checked={onSale}
                                onChange={() => setOnSale(!onSale)}
                            />
                        </label>
                        <div>
                            <label>Minumum Rating:</label>
                            <input
                                type="range"
                                min="0"
                                max="5.0"
                                step="0.1"
                                value={rating}
                                onChange={handleRatingChange}
                            />
                            <span style={{ textAlign: 'center' }}>
                                {rating}
                                <span style={{ marginLeft: '5px', color: 'goldenrod' }}>★</span>
                            </span>
                        </div>

                        <div>
{/*                            Render Recommended Courses*/}
                            <h3>Recommended Courses:</h3>
                            {predictedCourses && predictedCourses.length > 0 && (
                                <ul>
                                    {predictedCourses.slice(0, maxPredictionsToShow).map((course, index) => (
                                        <li key={index}>
                                            {course}
                                             <button onClick={() => handleExploreClick(course)}>Explore</button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Clear Form Button */}
                        <button type="button" onClick={resetForm} className="clear-button">
                            <FontAwesomeIcon icon={faTimes} /> Clear
                        </button>

                        {/* Search Button */}
                        <button type="submit" className="search-button">
                            <FontAwesomeIcon icon={faSearch} /> Search
                        </button>
                    </form>

                    {/* Display the error message for 500 Internal Server Error - no matched results with filters */}
                    {errors.internalServerError && (
                        <div className="error-message">
                            {errors.internalServerError}
                        </div>
                    )}
                </div>
                <div className="right-column">
                    <img
                        className="photo"
                        src="data:image/jpeg;base64,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"  // Adjust dimensions as needed
                        alt="Courses/Books/Videos"
                    />
                </div>
            </div>
        );
    }

export default Search;
