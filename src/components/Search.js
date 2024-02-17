import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Search.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import * as tf from '@tensorflow/tfjs';
import { useAuth } from '../AuthContext';
import TopMenu from './sub/TopMenu';
import Footer from './sub/Footer';
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

    // List of possible main greek towns for sychronous courses (Main Town field)
    const greekTowns = ['Athens', 'Thessaloniki', 'Patras', 'Heraklion', 'Larissa', 'Volos', 'Ioannina'];

    // List of possible subjects (Subjects field)
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

        // Construct dummy data similar to the searchResults format in order to retrieve the courseTitle info in results page after clicking recommended course link
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
            <div>
            <div className="search-home-container">
                {/* Header */}
                <header className="home-header">
                    {/* Logo and navigation */}
                    {/* Top Menu Bar */}
                    <TopMenu />
                </header>
                    <h2>Search for Courses</h2>
                    <form onSubmit={handleSubmit} className="search-form">
                        <legend>Level:</legend>
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
                            <legend>Select Subjects:</legend>
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
                                    <legend>Other Subjects:</legend>
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
                            <legend>Select Course Format:</legend>
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
                                    <legend>Select Location:</legend>
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
                                        <legend>Select Town:</legend>
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
                                            <legend>Other Location:</legend>
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
                            <legend>Languages:</legend>
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
                        <legend>
                            Gain Certification/Degree
                            <input
                                type="checkbox"
                                checked={certification}
                                onChange={() => setCertification(!certification)}
                            />
                        </legend>
                        <legend>
                            On Sale
                            <input
                                type="checkbox"
                                checked={onSale}
                                onChange={() => setOnSale(!onSale)}
                            />
                        </legend>
                        <div>
                            <legend>Minumum Rating:</legend>
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

                    {/* Render Recommended Courses*/}
                        <div>
                            <h3>Recommended Courses:</h3>
                            {predictedCourses && predictedCourses.length > 0 && (
                                <ul className="course-list">
                                    {predictedCourses.slice(0, maxPredictionsToShow).map((course, index) => (
                                        <li key={index} className="course-item">
                                            {course}
                                            <button onClick={() => handleExploreClick(course)} className="explore-button">Explore</button>
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
                <Footer />
            </div>
        );
    }

export default Search;
