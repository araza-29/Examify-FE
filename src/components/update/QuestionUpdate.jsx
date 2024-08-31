import "./update.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { questionInputs } from "../../formSource";


const QuestionUpdate = ({ title }) => {

    // Extracting questionId using regular expressions
    const location = useLocation();
    const questionId = location.pathname.match(/\/question\/update\/(\d+)/)?.[1];

    // Initializing state
    const [inputValues, setInputValues] = useState("");

    const navigate = useNavigate();

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
                setInputValues(data.data[0]);
                localStorage.setItem("questionData", JSON.stringify(data));

            } catch (error) {
                console.error(error);
            }
        };

        if (questionId) {
            fetchQuestion();
        }
    }, [questionId]);
    // console.log("quiz in a state:", file);

    const handleInputChange = (e) => {
        console.log(e.target.name);
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = {
            question_id: questionId,
            quiz_id: parseInt(inputValues.quiz_id),
            question: inputValues.question,
            option_1: inputValues.option_1,
            option_2: inputValues.option_2,
            option_3: inputValues.option_3,
            option_4: inputValues.option_4,
            correct_option: inputValues.correct_option,
            status: parseInt(inputValues.status),
        };

        // Send formData to the server using an HTTP request to update
        fetch("/api/admin/updatequestion", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData), // Pass the object as the body
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("Response from API", data);
                // Navigate to the desired page after API response
                navigate(`/question/${questionId}`);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <div className="update">
            <Sidebar />
            <div className="updateContainer">
                <Navbar />
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                    {/* <div className="left">
                        <img
                            src={
                                file
                            }
                            alt=""
                            className="itemImg"
                        />
                    </div> */}
                    <div className="right">
                        <form onSubmit={handleUpdate}>
                            {/* <div className="formInput">
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    style={{ display: "none" }}
                                />
                            </div> */}
                            {questionInputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input
                                        type={input.type}
                                        placeholder={input.placeholder}
                                        name={input.fieldName}
                                        value={inputValues[input.fieldName] || ''}
                                        onChange={handleInputChange}
                                        required
                                    // inputMode={input.fieldName === 'no_of_quiz' ? 'numeric' : undefined}
                                    />
                                </div>
                            ))}
                            <div style={{ clear: "both" }} className="formUpdate">
                                <button
                                    style={{ float: "right" }}
                                // onClick={() => navigate(`/categories/${questionId}`)}
                                >
                                    Update
                                </button>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    style={{ float: "right" }}
                                    onClick={() => navigate(`/question/${questionId}`)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionUpdate;