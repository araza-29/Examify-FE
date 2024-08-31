import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Select from 'react-select';
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState,useEffect } from "react";
import { groupInputs } from "../../formSource";
import { useNavigate } from 'react-router-dom';

const NameOptions = [
    { value: 'Biology', label: 'Biology' },
    { value: 'Computer', label: 'Computer' },
    { value: 'PreEngineering', label: 'PreEngineering' },
    { value: 'PreMedical', label: 'PreMedical' },
  ];


const GroupNew = ({ title }) => {
    // const [file, setFile] = useState("");
    const navigate = useNavigate();
    const [inputValues, setInputValues] = useState({});
    const [notification, setNotification] = useState("");
    const [subjectoptions, setUseroptions] = useState([]);
    const [classoptions, setClassoptions] = useState([]);
    const [batchoptions, setBatchoptions] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState([ ]);
    const center_id = localStorage.getItem('center_id');
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

    const handleNameSelectChange = (selectedOption) => {
        setInputValues({
          ...inputValues,
          name: selectedOption.value
        });
      };

      const handleSubjectSelectChange = (selectedOptions) => {
        setSelectedSubject(selectedOptions);
      };

      useEffect(() => {
        subject_name();
      }, []); // Empty dependency array means it runs once when the component mounts

      const subject_name = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:5000/subject_ids/${center_id}`);
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

      const handleBatchSelectChange = (selectedOption) => {
        setInputValues({
          ...inputValues,
          batch_id: selectedOption.value
        });
      };
      useEffect(() => {
        batch_name();
      }, []); // Empty dependency array means it runs once when the component mounts

      const batch_name = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:5000/batch_ids/${center_id}`);
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
          setBatchoptions(namelist);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      const handleClassSelectChange = (selectedOption) => {
        setInputValues({
          ...inputValues,
          class_id: selectedOption.value
        });
      };
      useEffect(() => {
        class_name();
      }, []); // Empty dependency array means it runs once when the component mounts

      const class_name = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:5000/class_ids/${center_id}`);
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
          setClassoptions(namelist);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        const UserValues = selectedSubject.map((option) => option.value);
        formData.append("center_id", localStorage.getItem('center_id'));
        formData.append("subject_id", UserValues);
        formData.append("class_id", inputValues.class_id);
        formData.append("batch_id", inputValues.batch_id);
        formData.append("name", inputValues.name);
       formData.append("status", inputValues.status || 1);
        // formData.append("logo", file); // Append the file to FormData
    
        try {
            // Send formData to the server using an HTTP request with multipart/form-data
            const response = await fetch("http://127.0.0.1:5000/add_group", {
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
            showNotification("Duty has been added successfully!");
            navigate('/group');
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
                                    {groupInputs.map((input) => (
                                        <div className="formInput" key={input.id}>
                                           {input.fieldName === "status" ? null : (
            <>
                                            <label>{input.label}</label>
                                            {input.fieldName === "subject_id" ? (
                                                <Select
                                                options={subjectoptions}
                                                name={input.fieldName}
                                                isMulti // Enable multiple selection
                                                value={selectedSubject}
                                                onChange={handleSubjectSelectChange}
                                                required
                                                />
                                            )  : input.fieldName === "name" ? (
                                                <Select
                                                options={NameOptions}
                                                name={input.fieldName}
                                                onChange={handleNameSelectChange}
                                                required
                                                />
                                            )  : input.fieldName === "batch_id" ? (
                                                <Select
                                                options={batchoptions}
                                                name={input.fieldName}
                                                onChange={handleBatchSelectChange}
                                                required
                                                />
                                            )  : input.fieldName === "class_id" ? (
                                                <Select
                                                options={classoptions}
                                                name={input.fieldName}
                                                onChange={handleClassSelectChange}
                                                required
                                                />
                                            ): (
                                            <input
                                                type={input.type}
                                                placeholder={input.placeholder}
                                                name={input.fieldName}
                                                onChange={handleInputChange}
                                                required={input.fieldName !== "status"}
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

export default GroupNew;
