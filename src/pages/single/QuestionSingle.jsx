import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link } from "react-router-dom";

const QuestionSingle = () => {
    // Extracting questionId using regular expressions
    const location = useLocation();
    const questionId = location.pathname.match(/\/question\/(\d+)/)?.[1];

    const [question, setQuestion] = useState(null);
    let [token] = useState(localStorage.getItem("token"));

    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await fetch(`/api/admin/questionbyid/${questionId}`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch question');
                }
                const data = await response.json();
                setQuestion(data);
                localStorage.setItem("questionData", JSON.stringify(data));
            } catch (error) {
                console.error(error);
            }
        };
        if (questionId) {
            fetchQuestion();
        }
    }, [questionId]);

    return (
        <>
            {!token && redirectToLogin()}
            {token && (
                <div className="single">
                    <Sidebar />
                    <div className="singleContainer">
                        <Navbar />
                        <div className="top">
                            <div className="left">
                                <div className="editButton">
                                    <Link to={`/question/update/${questionId}`} className=" link">
                                        Edit
                                    </Link>
                                </div>
                                <h1 className="title">Question Information</h1>
                                <div className="item">
                                    {/* <img src={
                                        question?.data[0].question_picture
                                    }
                                        alt=""
                                        className="itemImg"
                                    /> */}
                                    <div className="details">
                                        <h1 className="itemTitle">{question?.data[0].question}</h1>
                                        <div className="detailItem">
                                            <span className="itemKey">Option 1: </span>
                                            <span className="itemValue">{question?.data[0].option_1}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Option 2: </span>
                                            <span className="itemValue">{question?.data[0].option_2}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Option 3: </span>
                                            <span className="itemValue">{question?.data[0].option_3}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Option 4: </span>
                                            <span className="itemValue">{question?.data[0].option_4}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Correct Option: </span>
                                            <span className="itemValue">{question?.data[0].correct_option}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Id:</span>
                                            <span className="itemValue">{question?.data[0].id}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Quiz Id:</span>
                                            <span className="itemValue">{question?.data[0].quiz_id}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Status:</span>
                                            <span className="itemValue">{question?.data[0].status}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="right">
                    <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
                </div> */}
                        </div>
                        {/* <div className="bottom">
                <h1 className="title">Last Transactions</h1>
                <List />
                </div> */}
                    </div >
                </div>
                )
            }
        </>
    );
};

export default QuestionSingle;