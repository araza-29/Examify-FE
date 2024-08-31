import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Select from 'react-select';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState,useEffect } from "react";
import { studentInputs } from "../../formSource";
import { useNavigate } from 'react-router-dom';


const PaperOptions = [
    { value: 'A+', label: 'A+' },
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' },
    { value: 'D', label: 'D' },
  ];

  const CheckingOptions = [
    { value: 'VIII', label: 'VIII' },
    { value: 'IX', label: 'IX' },
    { value: 'X', label: 'X' },
    { value: 'XI', label: 'XI' },
  ];


const StudentNew = ({ title }) => {
    const [file, setFile] = useState("");
    const [file_1, setFile_1] = useState("");
    const [file_2, setFile_2] = useState("");
    const [inputValues, setInputValues] = useState({});
    const [notification, setNotification] = useState("");
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const [classoptions, setClassoptions] = useState([]);
    const [batchoptions, setBatchoptions] = useState([]);
    const [groupoptions, setGroupoptions] = useState([]);
    const center_id = localStorage.getItem('center_id');
    const navigate = useNavigate();
    let [token] = useState(localStorage.getItem("token"));

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
          const response = await fetch(`http://127.0.0.1:5000/batch_ids`);
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

      const handleGroupSelectChange = (selectedOption) => {
        setInputValues({
          ...inputValues,
          group_id: selectedOption.value
        });
      };
      useEffect(() => {
        group_name();
      }, []); // Empty dependency array means it runs once when the component mounts

      const group_name = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:5000/group_ids/${center_id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch data from the API");
          }
          const data = await response.json();
          console.log(data.data.length);
          const namelist = [];
          for (let i = 0; i < data.data.length; i++) {
            const name = data.data[i].name;
            const class_names = data.data[i].class_names
            const abbas = name + class_names
            console.log(data.data[i].class_names);
            const id = data.data[i].id; // Access the "name" property
            namelist.push({ value: id, label: abbas });
          }
          console.log(namelist);
          setGroupoptions(namelist);
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
        console.log("Files",e.target.files)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("image", file);
        formData.append("name", inputValues.name);
        formData.append("phone", inputValues.phone);
        formData.append("father_name", inputValues.father_name);
        formData.append("father_phone", inputValues.father_phone);
        formData.append("email", inputValues.email);
        formData.append("address", inputValues.address);
        formData.append("bform", file_1);
        formData.append("center_id", localStorage.getItem('center_id'));
        formData.append("batch_id", inputValues.batch_id);
        formData.append("class_id", inputValues.class_id);
        formData.append("group_id", inputValues.group_id);
        formData.append("description", inputValues.description);
        formData.append("ref_name", inputValues.ref_name);
        formData.append("marksheet", file_2);
        formData.append("ref_phone_no", inputValues.ref_phone_no);
        formData.append("last_class", inputValues.last_class);
        formData.append("last_grade", inputValues.last_grade);
        formData.append("percentage", inputValues.percentage);
        formData.append("status", inputValues.status || 1);
        // formData.append("logo", file); // Append the file to FormData
    
        try {
            // Send formData to the server using an HTTP request with multipart/form-data
            const response = await fetch("http://127.0.0.1:5000/add_student", {
                method: "POST",
                body: formData, // Use formData here with multipart/form-data
            });
    
            const data = await response.json();
            console.log("Response from API", data);
    
            // Store formData in local storage
            localStorage.setItem("formData", JSON.stringify(formData));
    
            // Reset the form
            setFile(""); // Clear the file
            setFile_1(""); // Clear the file
            setFile_2("")
            setInputValues({});
            showNotification("Student has been added successfully!");
            navigate('/student');
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
                            <div className="left">
                                <img
                                    src={
                                        file_1
                                    }
                                    alt=""
                                />
                            </div>
                            <div className="left">
                                <img
                                    src={
                                        file_2
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
                                    <div className="formInput">
                                        <label htmlFor="Bformfile">
                                            Bform: <DriveFolderUploadOutlinedIcon className="icon" />
                                        </label>
                                        <input
                                            type="file"
                                            id="Bformfile"
                                            onChange={(e) => setFile_1(e.target.files[0])}
                                            style={{ display: "none" }}
                                        />
                                    </div>
                                    <div className="formInput">
                                        <label htmlFor="marksheetfile">
                                            Marksheet: <DriveFolderUploadOutlinedIcon className="icon" />
                                        </label>
                                        <input
                                            type="file"
                                            id="marksheetfile"
                                            onChange={(e) => setFile_2(e.target.files[0])}
                                            style={{ display: "none" }}
                                        />
                                    </div>
                                    {studentInputs.map((input) => (
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
                                         ) : input.fieldName === "batch_id" ? (
                                             <Select
                                             options={batchoptions}
                                             name={input.fieldName}
                                             onChange={handleBatchSelectChange}
                                             required
                                             />
                                         ) : input.fieldName === "group_id" ? (
                                             <Select
                                             options={groupoptions}
                                             name={input.fieldName}
                                             onChange={handleGroupSelectChange}
                                             required
                                             />
                                         ) : input.fieldName === "last_class" ? (
                                             <Select
                                             options={CheckingOptions}
                                             name={input.fieldName}
                                             onChange={handleCheckSelectChange}
                                             required
                                             />
                                         ) :input.fieldName === "last_grade" ? (
                                             <Select
                                             options={PaperOptions}
                                             name={input.fieldName}
                                             onChange={handlePaperSelectChange}
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

export default StudentNew;
