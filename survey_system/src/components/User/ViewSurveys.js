import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../User/ViewSurveys.css'; // Ensure you have appropriate CSS for card styling
import Header from './Header';
import Footer from './Footer';

export default function SurveyCards() {
    const user_id = localStorage.getItem("user_id");
    const [surveys, setSurveys] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [expandedSurvey, setExpandedSurvey] = useState(null);

    useEffect(() => {
        // Fetch surveys
        axios.get('http://localhost:3000/survey/getAllSurveys')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setSurveys(response.data);
                } else {
                    console.error('Unexpected response structure:', response.data);
                    setError(new Error('Unexpected response structure'));
                }
            })
            .catch(err => { 
                console.error("Error fetching surveys:", err);
                setError(err);
            });

        // Fetch categories
        axios.get('http://localhost:3000/category/getAllCategories')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setCategories(response.data);
                } else {
                    console.error('Unexpected response structure:', response.data);
                    setError(new Error('Unexpected response structure'));
                }
            })
            .catch(err => {
                console.error("Error fetching categories:", err);
                setError(err);
            });
    }, []);

    // Create a map of category IDs to category names
    const categoryMap = categories.reduce((map, category) => {
        map[category.categoryid] = category.category_name;
        return map;
    }, {});

    // Combine survey data with category names
    const surveysWithCategoryNames = surveys.map(survey => ({
        ...survey,
        category_name: categoryMap[survey.category_id] || 'Unknown Category'
    }));

    const handleViewSurvey = (surveyId) => {
        // Toggle expanded state only for the clicked survey
        setExpandedSurvey(prevExpandedSurvey =>
            prevExpandedSurvey === surveyId ? null : surveyId
        );
    };
    const handleRemoveSurvey = (surveyId) => {
        // Send delete request to the server
        axios.delete('http://localhost:3000/survey/removeSurvey')
            .then(() => {
                // Remove the survey from state
                setSurveys(surveys.filter(survey => survey.survey_id !== surveyId));
            })
            .catch(err => {
                console.error("Error removing survey:", err);
                setError(err);
            });
    };


    return (
        <>
            <Header />
            <div className='container-fluid ml-5 viewSurvey-main'>
                <div className="survey-cards-container">
                    <h1 className='mt-3' style={{ color: "#333" }}>All Surveys</h1>
                    {error && <p className="error-message">Failed to load surveys. Please try again later.</p>}
                    {surveysWithCategoryNames.length > 0 ? (
                        <div className="cards-wrapper">
                            {surveysWithCategoryNames.map((survey) => (
                                <div className="card" key={survey.survey_id}>
                                    <div className="card-header">
                                        <h5 className='card-title'>Survey Title: {survey.survey_title}</h5>
                                    </div>

                                    <div className="card-body">
                                        <p className={`card-description ${expandedSurvey === survey.survey_id ? 'expanded' : ''}`}>
                                            {survey.survey_description.length > 100
                                                ? expandedSurvey === survey.survey_id
                                                    ? survey.survey_description
                                                    : survey.survey_description.slice(0, 100) + '...'
                                                : survey.survey_description
                                            }
                                        </p>
                                        <p><strong>Category:</strong> {survey.category_name}</p>
                                        <p><strong>Status:</strong> {survey.status}</p>
                                        <button
                                            className="btn btn-dark"
                                            onClick={() => handleViewSurvey(survey.survey_id)}
                                        >
                                            {expandedSurvey === survey.survey_id ? 'Show Less' : 'Read More'}
                                        </button><br></br>
                                        <button className='btn btn-outline-success mt-3 '>View Survey</button>
                                        &nbsp;
                                        <button className='btn btn-outline-danger mt-3' onClick={() => handleRemoveSurvey(survey.survey_id)}>Remove Survey</button>
                                    </div>
                                    <div className="card-footer">
                                        {/* Add any additional information or actions here */}
                                    </div>


                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No surveys available.</p>
                    )}
                </div>
            </div>
            <Footer/>
        </>
    );
}
