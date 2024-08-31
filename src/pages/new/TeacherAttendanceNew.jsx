import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Select from 'react-select';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useLocation,useNavigate } from 'react-router-dom';
import { useState,useEffect } from "react";
import { teacher_attendanceInputs } from "../../formSource";


const TSOptions = [
    { value: 'Present', label: 'Present' },
    { value: 'Absent', label: 'Absent' },
    { value: 'Late', label: 'Late' },
    { value: 'Replacement', label: 'Replacement' },
  ];


const TeacherAttendanceNew = ({ title }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [inputValues, setInputValues] = useState({});
    const [notification, setNotification] = useState("");
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedUser, setSelectedUser] = useState([]);
    const [useroptions, setUseroptions] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState([]);
    const [selectedUser_rep, setSelectedUser_rep] = useState([]);
    const [selectedSubject_rep, setSelectedSubject_rep] = useState([]);
    const [selectedUser_replac, setSelectedUser_replac] = useState([]);
    const [selectedSubject_replac, setSelectedSubject_replac] = useState([]);
    const [teacher_status, setTeacher_status] = useState([]);
    const [Subjectoptions, setSubjectoptions] = useState([]);
    const [selectedClass, setSelectedClass] = useState([]);
    const [selectedtt_id, setSelectedtt_id] = useState([]);
    const [Classoptions, setClassoptions] = useState([]);
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const center_id = localStorage.getItem('center_id');
    const timetableId = location.pathname.match(/\/teacher_attendance\/new\/(\d+)/)?.[1];
    console.log(timetableId);

    let [token] = useState(localStorage.getItem("token"));

    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };

    useEffect(() => {
        const fetchTimetable = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/timetable/${timetableId}`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch quiz');
                }
                const data = await response.json();
                console.log("abbas",data)
                const snames = data.data.user_names
                const sid = data.data.user_id
                // console.log("abbas1",abbas);
                const namelist = [];
                  const name = snames;
                  console.log(name);
                  const id = sid; // Access the "name" property
                  namelist.push({ value: id, label: name },);
                  const Subject = data.data.subject_names
                  const tid = data.data.subject_id
                  // console.log("abbas1",abbas);
                  const namelist_t = [];
                    namelist_t.push({ value: tid, label: Subject },);
                    const Class = data.data.class_names
                    const aid = data.data.class_id
                    // console.log("abbas1",abbas);
                    const namelist_a = [];
                      namelist_a.push({ value: aid, label: Class },);
                setInputValues(data.data);
                const status = data.data.status
                const day = data.data.day
                console.log(status);
                if (status == 1){
                    setSelectedStatus({ value: status, label: 'Active' });
                }
                else{
                    setSelectedStatus({ value: status, label: 'Inactive' });
                }
                console.log(day);
                if (day == "Monday"){
                    setSelectedDay({ value: day, label: 'Monday' });
                }
                else if (day == "Tuesday"){
                    setSelectedDay({ value: day, label: 'Tuesday' });
                
                }
                else if (day == "Wednesday"){
                    setSelectedDay({ value: day, label: 'Wednesday' });
                
                }
                else if (day == "Thursday"){
                    setSelectedDay({ value: day, label: 'Thursday' });
                
                }
                else if (day == "Friday"){
                    setSelectedDay({ value: day, label: 'Friday' });
                
                }
                else if (day == "Saturday"){
                    setSelectedDay({ value: day, label: 'Saturday' });
                
                }
                else{
                    setSelectedDay({ value: day, label: 'Sunday' });
                }
                setSelectedtt_id(data.data.id);
                setSelectedUser(namelist);
                setSelectedSubject(namelist_t);
                setSelectedClass(namelist_a);
                localStorage.setItem("quizData", JSON.stringify(data));

            } catch (error) {
                console.error(error);
            }
        };

        if (timetableId) {
            fetchTimetable();
        }
    }, [timetableId]);


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

      const handleTeacher_StatusSelectChange = (selectedOption) => {
        setInputValues({
          ...inputValues,
          teacher_status: selectedOption.value
        });
        if (selectedOption.value == "Present" || selectedOption.value == "Late" ){
          setSelectedSubject_rep({ value: "None", label: "None" });
          setSelectedUser_rep({ value: "None", label: "None" });
          setSelectedSubject_replac("None");
          setSelectedUser_replac("None");
        }
        else{
          setSelectedSubject_rep([]);
          setSelectedUser_rep([]);
        }
        setTeacher_status(selectedOption.value);
      };

    const handleUserSelectChange = (selectedOption) => {
      setSelectedUser_rep(selectedOption);
        setInputValues({
          ...inputValues,
          user_rep_id: selectedOption.value
        });
        setSelectedUser_replac(selectedOption.value);
      
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
        setSelectedSubject_rep(selectedOption)
        setInputValues({
          ...inputValues,
          subject_rep_id: selectedOption.value
        });
        setSelectedSubject_replac(selectedOption.value);
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


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
    
    
    
        formData.append("center_id", localStorage.getItem('center_id'));
        formData.append("timetable_id", selectedtt_id);
        formData.append("teacher_status", teacher_status);
        formData.append("date", inputValues.date);
        formData.append("subject_rep_id", selectedSubject_replac);
        formData.append("user_rep_id", selectedUser_replac);
        formData.append("status", inputValues.status || 1);
        // formData.append("logo", file); // Append the file to FormData
    
        try {
            // Send formData to the server using an HTTP request with multipart/form-data
            const response = await fetch("http://127.0.0.1:5000/add_teacher_attendance", {
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
            navigate('/teacher-attendance');
            
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
                            <div className="right">
                                <form onSubmit={handleSubmit}>
                                    {teacher_attendanceInputs.map((input) => (
                                        <div className="formInput" key={input.id}>
                                        {input.fieldName === "status" ? null : (
         <>
                              <label>{input.label}</label>
                                      {input.fieldName === "teacher_status" ? (
                                          <Select
                                              options={TSOptions}
                                              name={input.fieldName}
                                              onChange={handleTeacher_StatusSelectChange}
                                              required
                                          />
                                      ) : input.fieldName === "subject_rep_id" || input.fieldName === "user_rep_id" ? (
                                          <Select
                                              options={input.fieldName === "subject_rep_id" ? Subjectoptions : useroptions}
                                              name={input.fieldName}
                                              value={input.fieldName === "subject_rep_id" ? selectedSubject_rep : selectedUser_rep}
                                              onChange={input.fieldName === "subject_rep_id" ? handleSubjectSelectChange : handleUserSelectChange}
                                              required
                                          />
                                      ) : input.fieldName === "subject_id" || input.fieldName === "user_id" || input.fieldName === "class_id" || input.fieldName === "day" ? (
                                          <Select
                                              name={input.fieldName}
                                              value={
                                                  input.fieldName === "subject_id" ? selectedSubject :
                                                  input.fieldName === "user_id" ? selectedUser :
                                                  input.fieldName === "class_id" ? selectedClass :
                                                  input.fieldName === "day" ? selectedDay :
                                                  ''
                                              }
                                              onChange={
                                                  input.fieldName === "subject_id" ? handleSubjectSelectChange :
                                                  input.fieldName === "user_id" ? handleUserSelectChange :
                                                  input.fieldName === "class_id" ? handleClassSelectChange :
                                                  input.fieldName === "day" ? handleDaySelectChange :
                                                  handleInputChange
                                              }
                                              required
                                          />
                                      ) : (
                                          <input
                                              type={input.type}
                                              placeholder={input.placeholder}
                                              name={input.fieldName}
                                              value={inputValues[input.fieldName] || ''}
                                              onChange={handleInputChange}
                                              required
                                          />
                                      )}
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

export default TeacherAttendanceNew;
