import React, { useState } from 'react';
import '../styles/Search.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

function Search() {
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

    // Define the handleSubmit function to handle form submissions
    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform filtering based on selected filters
        const filteredCourses = courses.filter((course) => {
            // Apply filter conditions
            // ...

            return true; // Return true for the actual filter conditions
        });

        // Update your state or do something with filteredCourses
        console.log(filteredCourses);
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

    const handleSubjectsChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);

        // Check if 'Other' is selected
        if (selectedOptions.includes('Other')) {
            // Clear otherSubjectInput when 'Other' is not selected
            setOtherSubjectInput('');
        }

        setSelectedSubjects(selectedOptions);
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

    return (
        <div>
            <div>
                <h2>Search for Courses</h2>
                <form onSubmit={handleSubmit}>
                    <select
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                    >
                        <option value="">Select Level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                    <div>
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
                                        : setLanguage(language.filter((lang) => lang !== 'French'))
                                }
                            />
                            Other
                        </label>
                    </div>
                    <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
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
                    <div>
                        <label>Price Range:</label>
{/*                        <input
                            type="range"
                            min={10}
                            max={1000}
                            step={1}
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value, 10)])}
                        />*/}
                        <Slider
                            style={{ backgroundColor:'grey' }}
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
                            <span style={{ marginLeft: '5px', color: 'goldenrod'}}>★</span>
                        </span>
{/*                        {rating.toFixed(1)}*/}
                    </div>
                    <button type="submit">Search</button>
                </form>
                {/* Display filtered courses here */}
            </div>
        </div>
    );
}

export default Search;
