import "./update.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { studentrecordInputs } from "../../formSource";


const  StudentrecordUpdate = ({ title }) => {

    // Extracting studentrecordId using regular expressions
    const location = useLocation();
    const studentrecordId = location.pathname.match(/\/upd_srecord\/(\d+)/)?.[1];

    // Initializing state
    const [file, setFile] = useState(null);
    const [inputValues, setInputValues] = useState("");
    let [token] = useState(localStorage.getItem("token"));

    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };

    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudentrecord = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/srecord/${studentrecordId}`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch quiz');
                }
                const data = await response.json();
                console.log("abbas",data)
                setInputValues(data.data);
                setFile(data.data.logo);
                localStorage.setItem("quizData", JSON.stringify(data));

            } catch (error) {
                console.error(error);
            }
        };

        if (studentrecordId) {
            fetchStudentrecord();
        }
    }, [studentrecordId]);
    console.log("quiz in a state:", file);

    const handleInputChange = (e) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = {
            id: studentrecordId,
            center_id: inputValues.center_id,
            student_id: inputValues.student_id,
            file: file || "",
            description: inputValues.description,
            date: inputValues.date,
            status: parseInt(inputValues.status),
        };

        // Send formData to the server using an HTTP request to update
        fetch('http://127.0.0.1:5000/upd_srecord/', {
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
                navigate(`/srecord/${studentrecordId}`);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <>
            {!token && redirectToLogin()}
            {token && (
                <div className="update">
                    <Sidebar />
                    <div className="updateContainer">
                        <Navbar />
                        <div className="top">
                            <h1>{title}</h1>
                        </div>
                        <div className="bottom">
                            <div className="left">
                                <img
                                    src={
                                        file
                                    }
                                    alt=""
                                    className="itemImg"
                                />
                            </div>
                            <div className="right">
                                <form onSubmit={handleUpdate}>
                                    <div className="formInput">
                                        <label htmlFor="file">
                                            Student Record: <DriveFolderUploadOutlinedIcon className="icon" />
                                        </label>
                                        <input
                                            type="file"
                                            id="file"
                                            onChange={(e) => setFile(e.target.files[0])}
                                            style={{ display: "none" }}
                                        />
                                    </div>
                                    {studentrecordInputs.map((input) => (
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
                                        // onClick={() => navigate(`/categories/${studentrecordId}`)}
                                        >
                                            Update
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            style={{ float: "right" }}
                                            onClick={() => navigate(`/srecord/${studentrecordId}`)}
                                        >
                                            Cancel
                                        </button>
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

export default StudentrecordUpdate;