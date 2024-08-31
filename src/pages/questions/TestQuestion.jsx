import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import MyTimer from "../../components/timer/MyTimer";
import "./testQuestion.scss";
import { idID } from "@mui/material/locale";


const useProgress = (initialValue, maxValue) => {
    const [progress, setProgress] = useState(initialValue);

    useEffect(() => {
        const calculatedProgress = (progress / maxValue) * 100;
        setProgress(calculatedProgress);
    }, [progress, maxValue]);

    return [progress, setProgress];
};

const TestQuestion = () => {
    const [token] = useState(localStorage.getItem("token"));
    const [duration] = useState(localStorage.getItem("duration"));
    const [quizId] = useState(localStorage.getItem("quizId"));
    const [adminData] = useState(JSON.parse(localStorage.getItem("adminData"))); // Parse the data string into an object
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [apiQuestions, setApiQuestions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [progressValue, setProgressValue] = useState(0);
    const [progress, setProgress] = useProgress(0, 1);
    
    const time = duration;

    const redirectToLogin = () => {
        alert("Please log in first to access this page.");
        window.location.href = "/"; // Replace "/login" with the actual login page path
    };

    const fetchQuestions = async () => {
        try {
            const response = await axios.post("/api/users/getquestion", {
                user_id: adminData.id,
                quiz_id: quizId,
            });
            console.log(response.data.data);
            // console.log("time",time);
            setApiQuestions(response.data.data);
            console.log("apiQuestions", apiQuestions)
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchQuestions();
        } else {
            redirectToLogin();
        }
    }, [token]);

    const handlePrevious = () => {
        setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    };

    const fetchNextQuestions = async () => {
        try {
            setSelectedOption(null);
            const response = await axios.post("/api/users/nextquestion", {
                user_id: adminData.id,
                quiz_id: quizId,
            });
            console.log("score", response.data.score);
            if (response.data.score !== undefined) {
                window.location.href = "/quizHome";
                // window.location.href = "/quizHome/reviewQuestion";
            }
            else{
                console.log("NextQuestionAPI", response.data);
                console.log("progress", response.data.progress[0].progress);
                setProgressValue(response.data.progress[0].progress);
                setApiQuestions(response.data.data);
                console.log("NextQuestion", apiQuestions);
            }
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    const submitUserAnswer = async (userAnswer) => {
        const { quiz_id, id } = apiQuestions;
        if(userAnswer === null){
            userAnswer = "Review";
        }
        console.log("quiz_id", quiz_id);
        console.log("question_id", id);
        console.log("userAnswer", userAnswer);

        const user_id = adminData.id;

        try {
            const response = await axios.post("/api/users/useranswer", {
                user_id,
                quiz_id,
                question_id: id,
                entered_option: userAnswer,
                time: localStorage.getItem('timer'),
            });

            await fetchNextQuestions();
            // Handle the response if needed
            console.log(response.data);
        } catch (error) {
            console.error("Error submitting user answer:", error);
        }
    };

    const handleNext = () => {
        console.log("selectedOption", selectedOption);

        console.log("duration", duration)
       console.log("time",time)

        submitUserAnswer(selectedOption);
        setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    // Accessing all the options
    const options = [
        apiQuestions.option_1,
        apiQuestions.option_2,
        apiQuestions.option_3,
        apiQuestions.option_4,
    ];
    
    const handleTimerChange = (event) => {
        const timerValue = event.detail.value;
        console.log("Current timer value:", timerValue);
        // You can perform any desired logic with the timer value here
    };

    useEffect(() => {
        window.addEventListener("timerChange", handleTimerChange); // Listen to the custom event
        return () => {
            window.removeEventListener("timerChange", handleTimerChange); // Clean up the event listener
        };
    }, []);

    return (
        <>
            {!token && redirectToLogin()}
            {token && (
                <div>
                    <Navbar />
                    <div className="testQuestion">
                        <div className="card">
                            <div className="timer">
                                <MyTimer duration={time} />
                            </div>
                            <div className="progress-div">
                                <progress className="progress" 
                                    value={progressValue} 
                                    max={100}
                                    style={{
                                        background: 'white', // Change to your desired color
                                    }}
                                    />
                            </div>
                            <h2 className="question">{apiQuestions.question}</h2>
                            <div>
                                {options.map((option, index) => (
                                    <div key={index} className="option">
                                        <input
                                            type="radio"
                                            id={`option-${index + 1}`}
                                            name="option"
                                            value={option}
                                            checked={selectedOption === option}
                                            onChange={handleOptionChange}
                                        />
                                        <label htmlFor={`option-${index + 1}`}>{option}</label>
                                    </div>
                                ))}
                            </div>
                            <div className="buttons">
                                <button
                                    className="previousButton"
                                    onClick={handlePrevious}
                                    disabled={currentQuestion === 0}
                                >
                                    Previous
                                </button>
                                <button
                                    className="nextButton"
                                    onClick={handleNext}
                                    disabled={currentQuestion === apiQuestions.length - 1}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TestQuestion;
