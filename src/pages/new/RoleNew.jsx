import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState,useEffect } from "react";
import { roleInputs } from "../../formSource";
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

const RoleNew = ({ title }) => {
    // const [file, setFile] = useState("");
    const [inputValues, setInputValues] = useState({});
    const [notification, setNotification] = useState("");
    const [subjectoptions, setUseroptions] = useState([]);
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState([ ]);
    const center_id = localStorage.getItem('center_id');

    let [token] = useState(localStorage.getItem("token"));

    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        console.log(e.target.name);
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        });
        console.log("inputValues",inputValues)
    };
    const handleSubjectSelectChange = (selectedOptions) => {
        setSelectedSubject(selectedOptions);
      };
      useEffect(() => {
        subject_name();
      }, []); // Empty dependency array means it runs once when the component mounts

      const subject_name = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:5000/rscreen_ids/${center_id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch data from the API");
          }
          const data = await response.json();
          console.log(data.data.length);
          const namelist = [];
          for (let i = 0; i < data.data.length; i++) {
            const name = data.data[i].name;
            console.log(name);
            const id = data.data[i].id; // Access the "name" property
            namelist.push({ value: id, label: name });
          }
          console.log(namelist);
          setUseroptions(namelist);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        const UserValues = selectedSubject.map((option) => option.value);
        formData.append("center_id",localStorage.getItem('center_id'));
        formData.append("name", inputValues.name);
        formData.append("screen_id", UserValues);
        formData.append("status", inputValues.status|| 1);
        // formData.append("logo", file); // Append the file to FormData
    
        try {
            // Send formData to the server using an HTTP request with multipart/form-data
            const response = await fetch("http://127.0.0.1:5000/add_role", {
                method: "POST",
                body: formData, // Use formData here with multipart/form-data
            });
    
            const data = await response.json();
            console.log("Response from API", data);
    
            // Store formData in local storage
            localStorage.setItem("formData", JSON.stringify(formData));
    
            // Reset the form
            // setFile(""); // Clear the file
            setInputValues({});
            showNotification("User Role has been added successfully!");
            navigate(`/role`);
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
                            {/* <div className="left">
                                <img
                                    src={
                                        file
                                    }
                                    alt=""
                                />
                            </div> */}
                            <div className="right">
                                <form onSubmit={handleSubmit}>
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
                                    {roleInputs.map((input) => (
                                        <div className="formInput" key={input.id}>
                                              {input.fieldName === "status" ? null : (
            <>
                                            <label>{input.label}</label>
                                            {input.fieldName === "screen_id" ? (
                                                <Select
                                                options={subjectoptions}
                                                name={input.fieldName}
                                                isMulti // Enable multiple selection
                                                value={selectedSubject}
                                                onChange={handleSubjectSelectChange}
                                                required
                                                />
                                            )  : (
                                                <input
                                                    type={input.type}
                                                    placeholder={input.placeholder}
                                                    name={input.fieldName}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            )}
                                             </>
                                           )}
                                        </div>
                                    ))}
                                    <div style={{ clear: "both" }} className="formSubmit">
                                        <button type="submit" style={{ float: "right" }} >Send</button>
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

export default RoleNew;
