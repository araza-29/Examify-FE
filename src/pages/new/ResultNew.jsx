import "./newresult.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Select from 'react-select';
import { useState,useEffect } from "react";
import { resultgenerationInputs } from "../../formSource";

const CheckingOptions = [
    { value: 'XII', label: 'XII' },
    { value: 'IX', label: 'IX' },
    { value: 'X', label: 'X' },
    { value: 'XI', label: 'XI' },
  ];

const result_typeOptions = [
    { value: 'Class', label: 'Class' },
    { value: 'Student', label: 'Student' },
  ];

  const typeOptions = [
    { value: '1', label: 'Month' },
    { value: '2', label: '2 Months' },
    { value: '3', label: '3 Months' },
    { value: '4', label: '4 Months' },
  ];


  const monthOptions = [
    { value: '1', label: 'Jan' },
    { value: '2', label: 'Feb' },
    { value: '3', label: 'Mar' },
    { value: '4', label: 'Apr' },
    { value: '5', label: 'May' },
    { value: '6', label: 'Jun' },
    { value: '7', label: 'Jul' },
    { value: '8', label: 'Aug' },
    { value: '9', label: 'Sep' },
    { value: '10', label: 'Oct' },  
    { value: '11', label: 'Nov' },
    { value: '12', label: 'Dec' },
];

const ResultNew = ({ title }) => {
    // const [file, setFile] = useState("");
    const [inputValues, setInputValues] = useState({});
    const [notification, setNotification] = useState("");    
    const [selectedMonth, setSelectedMonth] = useState([ ]);
    const [selectedClass, setSelectedClass] = useState([]);
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const [classoptions, setClassoptions] = useState([]);
    const [studentoptions, setStudentoptions] = useState([]);
    const center_id = localStorage.getItem('center_id');
    let [token] = useState(localStorage.getItem("token"));
    const [studentVisible, setStudentVisible] = useState(false); // State to track visibility of student_id field

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
    
    const handleMonthSelectChange = (selectedOptions) => {
        setSelectedMonth(selectedOptions);
      };
      const handleTypeSelectChange = (selectedOption) => {
        setInputValues({
          ...inputValues,
          type: selectedOption.value
        });
      };
      const handleStudentSelectChange = (selectedOption) => {
        setInputValues({
          ...inputValues,
          student_id: selectedOption.value
        });
      };
        const handleClassSelectChange = (selectedOption) => {
        setInputValues({
          ...inputValues,
          class_id: selectedOption.value
        });
        setSelectedClass(selectedOption.value);
        console.log(selectedOption.value);
        const value = selectedOption.value;
        student_name(value);
      };
      const handleResult_typeSelectChange = (selectedOption) => {
        setInputValues({
          ...inputValues,
          result_type: selectedOption.value,
        });
    
        // Toggle visibility of student_id field based on selected option
        setStudentVisible(selectedOption.value === "Student");
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

    

       // Empty dependency array means it runs once when the component mounts

      const student_name = async (value) => {
        try {
          const response = await fetch(`http://127.0.0.1:5000/student/class/${value}`);
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
          setStudentoptions(namelist);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("center_id", inputValues.center_id);
        formData.append("exam_id", inputValues.exam_id);
        formData.append("student_id", inputValues.student_id);
        formData.append("mark", inputValues.mark);
        formData.append("status", inputValues.status);
        // formData.append("logo", file); // Append the file to FormData
    
        try {
            // Send formData to the server using an HTTP request with multipart/form-data
            const response = await fetch("http://127.0.0.1:5000/add_result", {
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
            showNotification("Result has been added successfully!");
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
                                    {resultgenerationInputs.map((input) => (
                                        <div className="formInput" key={input.id}>
                                            <label>{input.label}</label>
                                            {
                                                input.fieldName === "result_type" ? (
                                                    <Select
                                                    options={result_typeOptions}
                                                    name={input.fieldName}
                                                    onChange={handleResult_typeSelectChange}
                                                    required
                                                    />
                                                ) : input.fieldName === "class_id" ? (
                                                    <Select
                                                    options={classoptions}
                                                    name={input.fieldName}
                                                    onChange={handleClassSelectChange}
                                                    required
                                                    />
                                                ) : input.fieldName === "student_id" ? studentVisible &&  (
                                                    <Select
                                                    options={studentoptions}
                                                    name={input.fieldName}
                                                    onChange={handleStudentSelectChange}
                                                    required
                                                    />
                                                ) : input.fieldName === "type" ? (
                                                    <Select
                                                    options={typeOptions}
                                                    name={input.fieldName}
                                                    onChange={handleTypeSelectChange}
                                                    required
                                                    />
                                                ) :input.fieldName === "month" ? (
                                                    <Select
                                                    options={monthOptions}
                                                    name={input.fieldName}
                                                    isMulti // Enable multiple selection
                                                    value={selectedMonth}
                                                    onChange={handleMonthSelectChange}
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
                                        <button type="submit" style={{ float: "right" }} >Search</button>
                                        <button type="button">Print</button>
                                    </div>
                                    <div style={{ clear: "both" }} className="formSubmit">
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

export default ResultNew;
