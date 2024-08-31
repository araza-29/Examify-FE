import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState,useEffect } from "react";
import Select from 'react-select';
import { nsubjectInputs } from "../../formSource";
import { useNavigate } from "react-router-dom";


const SubjectNew = ({ title }) => {
    // const [file, setFile] = useState("");\\
    const navigate = useNavigate();
    const [inputValues, setInputValues] = useState({});
    const [notification, setNotification] = useState("");
    const [roptions, setRoptions] = useState([]);
    const [uoptions, setUoptions] = useState([]);
    const [selectedClass, setSelectedClass] = useState([ ]);
    const [selectedUser, setSelectedUser] = useState([ ]);
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);

    let [token] = useState(localStorage.getItem("token"));

    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };

    useEffect(() => {
        users();
      }, []);
    
      const users = async () => {
            const formData = {
                center_id: localStorage.getItem("center_id"),
              };
              console.log("abbas",formData);
              const formDataString = JSON.stringify(formData);
              try {
                 const response = await fetch('http://127.0.0.1:5000/user_ids', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: formDataString,
                })
                  .then((response) => {
                    if (response.ok) {
                      return response.json();
                    } else {
                      throw new Error('Error: ' + response.status);
                    }
                  })
                  .then((data) => {
                    console.log(data.data.length);
                    const namelist = [];
                    for (let i = 0; i < data.data.length; i++) {
                      const name = data.data[i].name;
                      console.log(name);
                      const id = data.data[i].id; // Access the "name" property
                      namelist.push({ value: id, label: name });
                    }
                    console.log(namelist);
                    setUoptions(namelist);
                  })
                  .catch((error) => {
                    console.log(error)
                    // setError('Invalid username or password!');
                    // setUsername('');
                    // setPassword('');
                  }
                  );
                return response
              } catch (error) {
                console.error(error);
              }
    }

        const handleClassSelectChange = (selectedOptions) => {
        setSelectedClass(selectedOptions);
      };

      useEffect(() => {
        classes();
      }, []);
    
      const classes = async () => {
        try {
          const response = await fetch("http://127.0.0.1:5000/class_ids");
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
          setRoptions(namelist);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } 
      const handleUserSelectChange = (selectedOptions) => {
        setSelectedUser(selectedOptions);
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
        const classValues = selectedClass.map((option) => option.value);
        const userValues = selectedUser.map((option) => option.value);
        const formData = new FormData();
        formData.append("center_id", localStorage.getItem('center_id'));
        formData.append("name", inputValues.name);
        formData.append("class_id", classValues);
        formData.append("user_id", userValues);
        // formData.append("logo", file); // Append the file to FormData
    
        try {
            // Send formData to the server using an HTTP request with multipart/form-data
            const response = await fetch("http://127.0.0.1:5000/add_subject", {
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
            showNotification("Subject has been added successfully!");
            navigate('/subject');
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
                                    {nsubjectInputs.map((input) => (
                                        <div className="formInput" key={input.id}>
                                            <label>{input.label}</label>
                                            {input.fieldName === "class_id" ? (
                                                <Select
                                                options={roptions}
                                                name={input.fieldName}
                                                isMulti // Enable multiple selection
                                                value={selectedClass}
                                                onChange={handleClassSelectChange}
                                                required
                                                />
                                            ): input.fieldName === "user_id" ? (
                                                <Select
                                                options={uoptions}
                                                name={input.fieldName}
                                                isMulti // Enable multiple selection
                                                value={selectedUser}
                                                onChange={handleUserSelectChange}
                                                required
                                                />
                                             ): (
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

export default SubjectNew;
