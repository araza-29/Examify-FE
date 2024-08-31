import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./testHome.scss";
import TestWidget from "../../components/widget/TestWidget";

const TestHome = () => {
    const [token] = useState(localStorage.getItem("token"));
    const [quizData, setQuizData] = useState([]);

    const redirectToLogin = () => {
        alert("Please log in first to access this page.");
        window.location.href = "/"; // Replace "/login" with the actual login page path
    };

    const fetchQuizData = async () => {
        try {
            const response = await axios.get("/api/users/quizbycategoryId/6", {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("response.data", response.data.data);
            setQuizData(response.data.data);
            console.log("quizData", quizData);
        } catch (error) {
            console.error("Error fetching quiz data:", error);
        }
        console.log("quizData", quizData);
    };

    useEffect(() => {
        if (token) {
            fetchQuizData();
        } else {
            redirectToLogin();
        }
    }, [token]);

    return (
        <>
            {!token && redirectToLogin()}
            {token && (
                <div className="testHome">
                    <Sidebar />
                    <div className="homeContainer">
                        <Navbar />
                        <div className="widgets">
                            {quizData.map((quiz, index) => (
                                <div className="widgetWrapper" key={index}>
                                    <TestWidget type={quiz} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TestHome;
