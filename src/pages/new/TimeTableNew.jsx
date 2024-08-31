import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Select from 'react-select';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { timetableInputs } from "../../formSource";

const DayOptions = [
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
  { value: 'Thursday', label: 'Thursday' },
  { value: 'Friday', label: 'Friday' },
  { value: 'Saturday', label: 'Saturday' },
];

const TimeTableNew = ({ title }) => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({});
  const [notification, setNotification] = useState("");
  const [useroptions, setUseroptions] = useState([]);
  const [classoptions, setClassoptions] = useState([]);
  const [subjectoptions, setSubjectoptions] = useState([]);
  const [selectedsubject, setSelectedsubject] = useState([]);
  const [selectedsubject_id, setSelectedsubject_id] = useState([]);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const center_id = localStorage.getItem('center_id');

  let [token] = useState(localStorage.getItem("token"));

  const redirectToLogin = () => {
    alert("Please login first, then you can access this page...");
    window.location.href = '/'; // Replace "/login" with the actual login page path
  };

  const handleInputChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    });
  };

  const handleDaySelectChange = (selectedOption) => {
    setInputValues({
      ...inputValues,
      day: selectedOption.value
    });
  };

  const handleUserSelectChange = async (selectedOption) => {
    setInputValues({
      ...inputValues,
      user_id: selectedOption.value
    });
  
    // Fetch subjects based on selected user and class
    if (inputValues.class_id) {
      const response = await fetch(`http://127.0.0.1:5000/teacher/user_class_ids/subjects?user_id=${selectedOption.value}&class_id=${inputValues.class_id}`);
      const data = await response.json();
      setSelectedsubject({ value: data.data.subject_id, label: data.data.subject_names });
    }
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


  const handleClassSelectChange = async (selectedOption) => {
    setInputValues({
      ...inputValues,
      class_id: selectedOption.value
    });

    // Fetch subjects based on selected user and class
    if (inputValues.user_id) {
      const response = await fetch(`http://127.0.0.1:5000/teacher/user_class_ids/subjects?user_id=${inputValues.user_id}&class_id=${selectedOption.value}`);
      const data = await response.json();
      setSelectedsubject_id(data.data.subject_id);
      setSelectedsubject({ value: data.data.subject_id, label: data.data.subject_names });
    }
  };
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
    
    
    
    formData.append("center_id", localStorage.getItem('center_id'));
    formData.append("user_id", inputValues.user_id);
    formData.append("class_id", inputValues.class_id);
    formData.append("subject_id", selectedsubject_id);
    formData.append("day", inputValues.day);
    formData.append("start_slot_time", inputValues.start_slot_time);
    formData.append("end_slot_time", inputValues.end_slot_time);
    formData.append("status", inputValues.status || 1);
    // formData.append("logo", file); // Append the file to FormData

    try {
        // Send formData to the server using an HTTP request with multipart/form-data
        const response = await fetch("http://127.0.0.1:5000/add_timetable", {
            method: "POST",
            body: formData, // Use formData here with multipart/form-data
        });

        const data = await response.json();
        console.log("Response from API", data);

        // Store formData in local storage
        localStorage.setItem("formData", JSON.stringify(formData));

        // Reset the form
        setInputValues({});
        showNotification("Slot has been added successfully!");
        navigate('/time-table');
        
    } catch (error) {
      console.log(error);
    }
};
  const showNotification = (message) => {
    setNotification(message);
    setIsNotificationVisible(true);

    // Automatically hide the notification after a certain time
    setTimeout(() => {
      setIsNotificationVisible(false);
      setNotification("");
    }, 3000);
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
              <div className="right">
                <form onSubmit={handleSubmit}>
                  {timetableInputs.map((input) => (
                    <div className="formInput" key={input.id}>
                      {input.fieldName === "status" ? null : (
                        <>
                          <label>{input.label}</label>
                          {input.fieldName === "subject_id" ? (
                            <Select
                              options={subjectoptions}
                              name={input.fieldName}
                              value ={selectedsubject}
                              onChange={handleSubjectSelectChange}
                              required
                            />
                          ) : input.fieldName === "class_id" ? (
                            <Select
                              options={classoptions}
                              name={input.fieldName}
                              onChange={handleClassSelectChange}
                              required
                            />
                          ) : input.fieldName === "user_id" ? (
                            <Select
                              options={useroptions}
                              name={input.fieldName}
                              onChange={handleUserSelectChange}
                              required
                            />
                          ) : input.fieldName === "day" ? (
                            <Select
                              options={DayOptions}
                              name={input.fieldName}
                              onChange={handleDaySelectChange}
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
                    <button type="submit" style={{ float: "right" }}>
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
      )}
    </>
  );
};

export default TimeTableNew;
