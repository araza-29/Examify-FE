import "./new.scss";
import Select from 'react-select';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import { nclassInputs } from "../../formSource";
import { useNavigate } from 'react-router-dom';
const classOptions = [
    { value: 'IX', label: 'IX' },
    { value: 'X', label: 'X' },
    { value: 'XI', label: 'XI' },
    { value: 'XII', label: 'XII' },
  ];

const ClassNew = ({ title }) => {
    // const [file, setFile] = useState("");
    const navigate = useNavigate();
    const [inputValues, setInputValues] = useState({});
    const [soptions, setSoptions] = useState([]);
    const [notification, setNotification] = useState("");
    const [selectedSubject, setSelectedSubject] = useState([ ]);
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
    };

    useEffect(() => {
        subjects();
      }, []);
    
      const subjects = async () => {
            const formData = {
                center_id: localStorage.getItem("center_id"),
              };
              console.log("abbas",formData);
              const formDataString = JSON.stringify(formData);
              try {
                 const response = await fetch('http://127.0.0.1:5000/subjects', {
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
                    setSoptions(namelist);
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

    const handleSubjectSelectChange = (selectedOptions) => {
        setSelectedSubject(selectedOptions);
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        const subjectValues = selectedSubject.map((option) => option.value);
        formData.append("center_id", localStorage.getItem('center_id'));
        formData.append("name", inputValues.name);
        formData.append("total_students", inputValues.total_students);
        formData.append("subjects_id", subjectValues);
        // formData.append("logo", file); // Append the file to FormData
    
        try {
            // Send formData to the server using an HTTP request with multipart/form-data
            const response = await fetch("http://127.0.0.1:5000/add_class", {
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
            showNotification("Class has been added successfully!");
            navigate('/class');
        } catch (error) {
          console.log(error);
        }
    };
    const handleClassSelectChange = (selectedOption) => {
        setInputValues({
          ...inputValues,
          name: selectedOption.value
        });
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
                                    {nclassInputs.map((input) => (
                                        <div className="formInput" key={input.id}>
                                            <label>{input.label}</label>
                                            {input.fieldName === "name" ? (
                                                <Select
                                                options={classOptions}
                                                name={input.fieldName}
                                                onChange={handleClassSelectChange}
                                                required
                                                />
                                            ) :input.fieldName === "subjects_id" ? (
                                                <Select
                                                options={soptions}
                                                name={input.fieldName}
                                                isMulti // Enable multiple selection
                                                value={selectedSubject}
                                                onChange={handleSubjectSelectChange}
                                                required
                                                />
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

export default ClassNew;
