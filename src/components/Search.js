import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Search.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import * as tf from '@tensorflow/tfjs';

function Search() {
    const navigate = useNavigate();

    const [level, setLevel] = useState('');
    const [subject, setSubjects] = useState([]);
    const [location, setLocation] = useState('');
    const [language, setLanguage] = useState([]);
    const [duration, setDuration] = useState('');
    const [priceRange, setPriceRange] = React.useState(['min price', 'max price'])
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
    // Add a new state to store the loaded model
    const [rnnModel, setRNNModel] = useState(null);
    const [predictedCourses, setPredictedCourses] = useState([]);
    const [errors, setErrors] = useState({
        level: '',
        subjects: '',
        location: '',
        language: '',
        duration: '',
        priceRange: '',
    });


    // Sample course data (replace with actual course data)
    const courses = [
        /* {
             title: 'Course 1',
             level: 'Beginner',
             subject: ['Programming', 'Web Development'],
             location: 'Online',
             language: 'English',
             duration: '3 months',
             price: 20,
             certification: true,
             rating: 4.5,
         },
         {
             title: 'Course 2',
             level: 'Intermediate',
             subject: ['Data Science', 'Machine Learning'],
             location: 'New York',
             language: 'English',
             duration: '6 months',
             price: 30,
             certification: false,
             rating: 3.8,
         },*/
    ];

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


    // Define the handleSubmit function to handle form submissions
    const handleSubmit = (e) => {
        e.preventDefault();

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
            duration: !duration.trim() ? 'The field cannot be empty' : '',
        };

        // Combine all error messages into an object
        const allErrors = { ...errors, ...newErrors };

        // Check if any field has an error
        if (Object.values(allErrors).some((error) => error !== '')) {
            setErrors(allErrors);
            return;
        }

        // Clear errors when the user provides a value
        setErrors({});

        // Construct the URL with user input parameters
        const queryParams = new URLSearchParams({
            level,
            subjects: selectedSubjects.join(','),
            location,
            language: language.join(','),
            duration,
            priceRange: priceRange.join(','),
            certification: certification.toString(),
            onSale: onSale.toString(),
            rating,
        });

        // Clear any previous error messages
        setErrors({});

        // Redirect the user to the results page with the constructed URL
        navigate(`/results?${queryParams.toString()}`);

        // Update your state or do something with filteredCourses
        console.log(filteredCourses);

        // Make predictions and update the UI
        makePredictions();
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

        // Reset location-related states when changing course format
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
        const value = e.target.value;
        setDuration(value);

        // Clear the error message for duration when user provides a valid value
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

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
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

    const makePredictions = async () => {
        try {
            if (rnnModel) {
                // Preprocess input data based on user input
                const inputTensor = preprocessUserInput(searchQuery);
                const prediction = rnnModel.predict(inputTensor);

                // Process and display the prediction
                const predictedData = Array.from(prediction.dataSync());
                // Set the predicted courses in state
                setPredictedCourses(predictedData);

                // Process and display the prediction
                console.log(prediction.dataSync());
            } else {
                console.warn('RNN model not yet loaded');
            }
        } catch (error) {
            console.error('Error making predictions:', error);
            // Handle the error (e.g., fallback behavior)
        }
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
                <div>
                    <h2>Search for Courses</h2>
                    <form onSubmit={handleSubmit}>
                        <select
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                            onChange={handleLevelChange}
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
                            <h3>Predicted Courses:</h3>
                            <ul>
                                {predictedCourses.map((course, index) => (
                                    <li key={index}>{`Course ${index + 1}: ${course}`}</li>
                                ))}
                            </ul>
                        </div>
                        <button type="submit">Search</button>
                    </form>
                    {/* Display filtered courses here */}
                    <div>
                        {/* Display filtered courses here */}
                        {filteredCourses.map((course, index) => (
                            <div key={index}>
                                <h3>{course.title}</h3>
                                {/* Render other course details */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

export default Search;
