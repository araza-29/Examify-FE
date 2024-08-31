import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { quizInputs } from "../../formSource";

const QuizNew = ({ title }) => {
    const [file, setFile] = useState("");
    const [inputValues, setInputValues] = useState({});
    let [token] = useState(localStorage.getItem("token"));

    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };

    const handleInputChange = (e) => {
        console.log(e.target.name);
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        });
        console.log("inputValues",inputValues)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            category_id: parseInt(inputValues.category_id),
            quiz_no: inputValues.quiz_no,
            picture: file ? URL.createObjectURL(file) : "",
            quiz_name: inputValues.quiz_name,
            no_of_questions: parseInt(inputValues.no_of_questions),
            description: inputValues.description,
            no_of_attempts: inputValues.no_of_attempts,
            status: parseInt(inputValues.status),
        };
        console.log("formData: ", formData);

        try {
            // Send formData to the server using an HTTP request
            const response = await fetch("/api/admin/addquiz", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log("Response from API", data);

            // Store formData in local storage
            localStorage.setItem("formData", JSON.stringify(formData));

            // Reset the form
            setFile("");
            setInputValues({});
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {!token && redirectToLogin()}
            {token && (
                <div className="new">
                    <Sidebar />
                    <div className="newContainer">
                        <Navbar />
                        <div className="top">
                            <h1>{title}</h1>
                        </div>
                        <div className="bottom">
                            <div className="left">
                                <img
                                    src={
                                        file
                                            ? URL.createObjectURL(file)
                                            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                    }
                                    alt=""
                                />
                            </div>
                            <div className="right">
                                <form onSubmit={handleSubmit}>
                                    <div className="formInput">
                                        <label htmlFor="file">
                                            Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                        </label>
                                        <input
                                            type="file"
                                            id="file"
                                            onChange={(e) => setFile(e.target.files[0])}
                                            style={{ display: "none" }}
                                        />
                                    </div>
                                    {quizInputs.map((input) => (
                                        <div className="formInput" key={input.id}>
                                            <label>{input.label}</label>
                                            {input.type === "dropdown" ? (
                                                <select
                                                    name={input.fieldName}
                                                    onChange={handleInputChange}
                                                    required
                                                >
                                                    {input.options.map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <input
                                                    type={input.type}
                                                    placeholder={input.placeholder}
                                                    name={input.fieldName}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            )}
                                        </div>
                                    ))}
                                    <div style={{ clear: "both" }} className="formSubmit">
                                        <button type="submit" style={{ float: "right" }}>Send</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                )
            }
        </>
    );
};

export default QuizNew;
