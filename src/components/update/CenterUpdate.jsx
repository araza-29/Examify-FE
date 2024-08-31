import "./update.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { centerInputs } from "../../formSource";


const  CenterUpdate = ({ title }) => {

    // Extracting centerId using regular expressions
    const location = useLocation();
    const centerId = location.pathname.match(/\/update-center\/(\d+)/)?.[1];

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
        const fetchCenter = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/center/${centerId}`, {
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

        if (centerId) {
            fetchCenter();
        }
    }, [centerId]);
    console.log("quiz in a state:", file);

    const handleInputChange = (e) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("name", inputValues.name);
        formData.append("address", inputValues.address);
        formData.append("phone_no", inputValues.phone_no);
        formData.append('logo', file || "");
        formData.append('status', inputValues.status || 1);
        // Send formData to the server using an HTTP request to update
                // Send formData to the server using an HTTP request to update
                fetch(`http://127.0.0.1:5000/upd_center/${centerId}`, {
                    method: "PUT",
                    body: formData, // Pass the object as the body
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        console.log("Response from API", data);
                        // Navigate to the desired page after API response
                        navigate(`/center`);
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
                                            Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                        </label>
                                        <input
                                            type="file"
                                            id="file"
                                            onChange={(e) => setFile(e.target.files[0])}
                                            style={{ display: "none" }}
                                        />
                                    </div>
                                    {centerInputs.map((input) => (
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
                                        // onClick={() => navigate(`/categories/${centerId}`)}
                                        >
                                            Update
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            style={{ float: "right" }}
                                            onClick={() => navigate(`/center`)}
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

export default CenterUpdate;