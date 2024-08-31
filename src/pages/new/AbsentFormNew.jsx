import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { absentformInputs } from "../../formSource";



const AbsentFormNew = ({ title }) => {
    const navigate = useNavigate();
    const [file, setFile] = useState("");
    const [inputValues, setInputValues] = useState({});
    const [notification, setNotification] = useState("");
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);

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
        console.log("Files",e.target.files)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
    
    
    
        formData.append("center_id", localStorage.getItem('center_id'));
        formData.append("student_id", localStorage.getItem('student_id'));
        formData.append("user_id", localStorage.getItem('user_id'));
        formData.append("reason", inputValues.reason);
        formData.append("date", inputValues.date);
        formData.append("logo", file);
        formData.append("status", inputValues.status || 1);
        // formData.append("logo", file); // Append the file to FormData
    
        try {
            // Send formData to the server using an HTTP request with multipart/form-data
            const response = await fetch("http://127.0.0.1:5000/student/add_Aform", {
                method: "POST",
                body: formData, // Use formData here with multipart/form-data
            });
    
            const data = await response.json();
            console.log("Response from API", data);
    
            // Store formData in local storage
            localStorage.setItem("formData", JSON.stringify(formData));
    
            // Reset the form
            setFile("");
            setInputValues({});
            showNotification("Late Form has been added successfully!");
            navigate('/student/absent-form');
            
        } catch (error) {
          console.log(error);
        }
    };
    const showNotification = (message) => {
        setNotification(message);
        setIsNotificationVisible(true);
      
        // Automatically hide the notification after a certain time (e.g., 3 seconds)
        setTimeout(() => {
          setIsNotificationVisible(false);
          setNotification("");
        }, 3000); // Adjust the time as needed
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
                                    }
                                    alt=""
                                />
                            </div>
                            <div className="right">
                                <form onSubmit={handleSubmit}>
                                <div className="formInput">
                                        <label htmlFor="file">
                                            Leave: <DriveFolderUploadOutlinedIcon className="icon" />
                                        </label>
                                        <input
                                            type="file"
                                            id="file"
                                            onChange={(e) => setFile(e.target.files[0])}
                                            style={{ display: "none" }}
                                        />
                                    </div>
                                    {absentformInputs.map((input) => (
                                        <div className="formInput" key={input.id}>
                                        {input.fieldName === "status" ? null : (
         <>
                                         <label>{input.label}</label>
                                         { 
                                         <input
                                             type={input.type}
                                             placeholder={input.placeholder}
                                             name={input.fieldName}
                                             onChange={handleInputChange}
                                             required={input.fieldName !== "status"}
                                         />
                                         }
                                         </>
                                        )}
                                     </div>

                                    ))}
                                    <div style={{ clear: "both" }} className="formSubmit">
                                        
                                        <button type="submit" style={{ float: "right" }} >
                                       
                                        Send
                                       
                                        </button>
                                    </div>
                                </form>
                                {isNotificationVisible && (
                                    <div className="notification">
                                    {notification}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                )
            }
        </>
    );
};

export default AbsentFormNew;
