import React, { useState } from 'react';
import '../styles/Search.css';

function Search() {
    const [level, setLevel] = useState('');
    const [subject, setSubjects] = useState([]);
    const [location, setLocation] = useState('');
    const [language, setLanguage] = useState([]);
    const [duration, setDuration] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [certification, setCertification] = useState(false);
    const [rating, setRating] = useState('');
    const [selectedLocationType, setSelectedLocationType] = useState('town');
    const [selectedTown, setSelectedTown] = useState('');
    const [customLocation, setCustomLocation] = useState('');
    const [selectedSubjects, setSelectedSubjects] = useState([]);

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
    const possibleSubjects = ['Programming', 'Data Science', 'Web Development', 'Mathematics', 'Physics', 'Chemistry'];

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

    const handleSubjectsChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        setSelectedSubjects(selectedOptions);
    };

    const handleRatingChange = (e) => {
        setRating(parseFloat(e.target.value));
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
                    </div>
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

                    {/* Greek Towns Dropdown or Custom Location Input */}
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

                    <div>
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
                    <label>Price Range:</label>
                    <input
                        type="range"
                        min={10}
                        max={1000}
                        step={1}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value, 10)])}
                    />
                    <span>{priceRange[0]}$</span>
                    <span>{priceRange[1]}$</span>
                    <label>
                        Certification/Degree/Subject
                        <input
                            type="checkbox"
                            checked={certification}
                            onChange={() => setCertification(!certification)}
                        />
                    </label>
                    <div>
                        <label>Minumum Rating:</label>
                        <input
                            type="range"
                            min="0"
                            max="5"
                            step="0.1"
                            value={rating}
                            onChange={handleRatingChange}
                        />
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
