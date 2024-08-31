import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Select from 'react-select';
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState,useEffect } from "react";
import { examinationInputs } from "../../formSource";
import { useNavigate } from "react-router-dom";

const PaperOptions = [
    { value: 'Monthly', label: 'Monthly' },
    { value: 'Module-1', label: 'Module-1' },
    { value: 'Module-2', label: 'Module-2' },
    { value: 'Module-3', label: 'Module-3' },
    { value: 'Mock', label: 'Mock' },
    { value: 'Preliam', label: 'Preliam' },
  ];

  const CheckingOptions = [
    { value: 'Done', label: 'Done' },
    { value: 'Not Done', label: 'Not Done' },
  ];
  const DurationOptions = [
    { value: '3hr', label: '3hr' },
    { value: '2hr', label: '2hr' },
    { value: '1hr', label: '1hr' },
  ];


const ExaminationNew = ({ title }) => {
    const [file, setFile] = useState("");
    const [inputValues, setInputValues] = useState({});
    const [notification, setNotification] = useState("");
    const [classoptions, setClassoptions] = useState([]);
    const [subjectoptions, setSubjectoptions] = useState([]);
    const [useroptions, setUseroptions] = useState([]);
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const center_id = localStorage.getItem('center_id');
    let [token] = useState(localStorage.getItem("token"));
const navigate = useNavigate
    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };

    const handlePaperSelectChange = (selectedOption) => {
        setInputValues({
          ...inputValues,
          type: selectedOption.value
        });
      };

      const handleCheckSelectChange = (selectedOption) => {
        setInputValues({
          ...inputValues,
          checking_status: selectedOption.value
        });
      };

      const handleDurationSelectChange = (selectedOption) => {
        setInputValues({
          ...inputValues,
          duration: selectedOption.value
        });
      };

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
    

      const handleSubjectSelectChange = (selectedOption) => {
        setInputValues({
          ...inputValues,
          subject_id: selectedOption.value
        });
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
          setSubjectoptions(namelist);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      const handleUserSelectChange = (selectedOption) => {
        setInputValues({
          ...inputValues,
          user_id: selectedOption.value
        });
      };
      useEffect(() => {
        user_name();
      }, []); // Empty dependency array means it runs once when the component mounts

      const user_name = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:5000/user_ids/${center_id}`);
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
    
        const formData = new FormData();
        formData.append("center_id", localStorage.getItem('center_id'));
        formData.append("class_id", inputValues.class_id);
        formData.append("subject_id", inputValues.subject_id);
        formData.append("type", inputValues.type);
        formData.append("month", inputValues.month);
        formData.append("date", inputValues.date);
        formData.append("total_marks", inputValues.total_marks);
        formData.append("user_id", inputValues.user_id);
        formData.append("schedule_start_time", inputValues.schedule_start_time);
        formData.append("schedule_end_time", inputValues.schedule_end_time);
        formData.append("start_time", inputValues.start_time);
        formData.append("end_time", inputValues.end_time);
        formData.append("duration", inputValues.duration);
        formData.append("checking_status", inputValues.checking_status);
        formData.append("status", inputValues.status || 1);
        formData.append("logo", file); // Append the file to FormData
    
        try {
            // Send formData to the server using an HTTP request with multipart/form-data
            const response = await fetch("http://127.0.0.1:5000/add_examination", {
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
            showNotification("Examination has been added successfully!");
            navigate("/examination");
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
                                            Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                        </label>
                                        <input
                                            type="file"
                                            id="file"
                                            onChange={(e) => setFile(e.target.files[0])}
                                            style={{ display: "none" }}
                                        />
                                    </div>
                                    {examinationInputs.map((input) => (
                                        <div className="formInput" key={input.id}>
                                           {input.fieldName === "status" ? null : (
            <>
                                            <label>{input.label}</label>
                                            { input.fieldName === "class_id" ? (
                                                <Select
                                                options={classoptions}
                                                name={input.fieldName}
                                                onChange={handleClassSelectChange}
                                                required
                                                />
                                            ) : input.fieldName === "subject_id" ? (
                                                <Select
                                                options={subjectoptions}
                                                name={input.fieldName}
                                                onChange={handleSubjectSelectChange}
                                                required
                                                />
                                            ) : input.fieldName === "user_id" ? (
                                                <Select
                                                options={useroptions}
                                                name={input.fieldName}
                                                onChange={handleUserSelectChange}
                                                required
                                                />
                                            ) : input.fieldName === "checking_status" ? (
                                                <Select
                                                options={CheckingOptions}
                                                name={input.fieldName}
                                                onChange={handleCheckSelectChange}
                                                required
                                                />
                                            ) :input.fieldName === "type" ? (
                                                <Select
                                                options={PaperOptions}
                                                name={input.fieldName}
                                                onChange={handlePaperSelectChange}
                                                required
                                                />
                                            ) :input.fieldName === "duration" ? (
                                              <Select
                                              options={DurationOptions}
                                              name={input.fieldName}
                                              onChange={handleDurationSelectChange}
                                              required
                                              />
                                          ) : (
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

export default ExaminationNew;
