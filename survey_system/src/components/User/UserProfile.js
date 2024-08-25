// import React, { useEffect, useState } from 'react';
// import '../User/UserProfile.css';
// import Footer from './Footer';
// import Header from './Header';
// import axios from 'axios';

// export default function UserProfile() {
//     const [user, setUser] = useState(null);
//     const [surveys, setSurveys] = useState([]);
//     const userId = localStorage.getItem('user_id'); // Assuming userId is stored in local storage
//     console.log(userId + "--------------");
//     useEffect(() => {
//         // Function to fetch user data
//         const fetchUserData = async () => {
//             try {
//                 console.log("try ke ander aa gya"+"---------------------------------------");
//                 const response = await axios.get('http://localhost:3000/user/getUserById', { user_id });
//                 setUser(response);
//             } catch (error) {
//                 console.error("Error fetching user data:", error);
//             }
//         };

//         // Function to fetch surveys
//         // const fetchSurveys = async () => {
//         //     try {
//         //         const response = await axios.get('http://localhost:3000/survey/getSurveysByUserId',{userId});
//         //         if (Array.isArray(response.data)) {
//         //             setSurveys(response.data);
//         //         } else {
//         //             console.error('Unexpected response structure:', response.data);
//         //         }
//         //     } catch (error) {
//         //         console.error("Error fetching surveys:", error);
//         //     }
//         // };

//         fetchUserData();
//         // fetchSurveys();
//     }); // Dependency array to fetch data when userId changes



//     return (
//         <>
//             <Header />
//             <div className="dashboard">
//                 <main className="main-content">
//                     <div className="profile-section">
//                         <div className="profile-header">
//                             <div className="user-info">
//                                 {/* <h2>{user.user_name}</h2> */}
//                                 {/* <p>Email: {user.email_Address}</p> */}
//                             </div>
//                         </div>
//                         <div className="surveys-section">
//                             <h3>Your Surveys</h3>
//                             {/* <ul className="survey-list">
//                                 {surveys.length > 0 ? (
//                                     surveys.map(survey => (
//                                         <li key={survey.survey_id}>
//                                             <a href="#">{survey.survey_title}</a>
//                                         </li>
//                                     ))
//                                 ) : (
//                                     <li>No surveys available</li>
//                                 )}
//                             </ul> */}
//                         </div>
//                     </div>
//                 </main>
//             </div>
//             <Footer />
//         </>
//     );
// }
