import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import "./instruction.scss";

const Instruction = () => {
    const [token] = useState(localStorage.getItem("token"));
    const [instruction, setInstruction] = useState("");
    const [quizId] = useState(localStorage.getItem("quizId"));

    const redirectToLogin = () => {
        alert("Please log in first to access this page.");
        window.location.href = "/"; // Replace "/login" with the actual login page path
    };

    const timeDuration = (time) => {
        const durationInMinutes = time;

        // Convert duration to milliseconds
        const durationInMilliseconds = durationInMinutes * 60000;

        // Create a new Date object with the duration in milliseconds
        const duration = new Date(durationInMilliseconds);

        // Extract minutes and seconds from the duration
        const seconds = duration.getSeconds();
        const minutes = duration.getMinutes();

        // Format the minutes and seconds into MM:SS format
        const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        return formattedTime;
    };

    const fetchQuizData = async () => {
        try {
            const response = await axios.get(`/api/admin/quizbyid/${quizId}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("response.data", response.data);
            console.log("duration", response.data.data[0].duration);

            const formatedDuration = timeDuration(response.data.data[0].duration);
            console.log("formatedDuration", formatedDuration);

            localStorage.setItem("duration", formatedDuration);
            
            setInstruction(response.data.data[0].description);
        } catch (error) {
            console.error("Error fetching quiz data:", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchQuizData();
        } else {
            redirectToLogin();
        }
    }, [token]);

    const handleBeginTest = () => {
        // Handle the action when the "Begin Test" button is clicked
        window.location.href = "/quizHome/quizQuestion";
    };

    return (
        <>
            {!token && redirectToLogin()}
            {token && (
                <div className="instruction">
                    <div className="homeContainer">
                        <Navbar />
                        <div className="content">
                            <div className="card">
                                <h2 className="heading">INSTRUCTIONS</h2>
                                <p className="description">{instruction}</p>
                                <button className="beginButton" onClick={handleBeginTest}>
                                    Begin Test
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Instruction;
