import "./update.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Select from 'react-select';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useLocation,useNavigate } from 'react-router-dom';
import { useState,useEffect } from "react";
import { teacher_attendanceInputs } from "../../formSource";

const statusOptions = [
    { value: 1, label: 'Active' },
    { value: 0, label: 'Inactive' },
  ];
const TSOptions = [
    { value: 'Present', label: 'Present' },
    { value: 'Absent', label: 'Absent' },
    { value: 'Late', label: 'Late' },
    { value: 'Replacement', label: 'Replacement' },
  ];


const TeacherAttendanceUpdate = ({ title }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [inputValues, setInputValues] = useState({});
    const [notification, setNotification] = useState("");
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedUser, setSelectedUser] = useState([]);
    const [useroptions, setUseroptions] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState([]);
    const [teacher_status, setTeacher_status] = useState([]);
    const [Subjectoptions, setSubjectoptions] = useState([]);
    const [selectedClass, setSelectedClass] = useState([]);
    const [selectedtt_id, setSelectedtt_id] = useState([]);
    const [Classoptions, setClassoptions] = useState([]);
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const center_id = localStorage.getItem('center_id');
    const teacher_attendanceId = location.pathname.match(/\/update-teacher-attendance\/(\d+)/)?.[1];
    console.log(teacher_attendanceId);

    let [token] = useState(localStorage.getItem("token"));

    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };

    useEffect(() => {
        const fetchTeacher_attendance = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/teacher_attendance/${teacher_attendanceId}`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch quiz');
                }
                const data = await response.json();
                console.log("abbas",data)
                const snames = data.data.timetable_user_name
                const sid = data.data.timetable_user_id
                // console.log("abbas1",abbas);
                const namelist = [];
                  const name = snames;
                  console.log(name);
                  const id = sid; // Access the "name" property
                  namelist.push({ value: id, label: name },);
                  const Subject = data.data.subject_name
                  const tid = data.data.subject_id
                  // console.log("abbas1",abbas);
                  const namelist_t = [];
                    namelist_t.push({ value: tid, label: Subject },);
                    const Class = data.data.class_name
                    const aid = data.data.class_id
                    // console.log("abbas1",abbas);
                    const namelist_a = [];
                      namelist_a.push({ value: aid, label: Class },);
                setInputValues(data.data);
                const status = data.data.status
                const day = data.data.day
                const teacher_status = data.data.teacher_status
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
                if (teacher_status == "Present"){
                    setTeacher_status({ value: teacher_status, label: 'Present' });
                
                }
                else if (teacher_status == "Absent"){
                    setTeacher_status({ value: teacher_status, label: 'Absent' });
                
                }
                else if (teacher_status == "Late"){
                    setTeacher_status({ value: teacher_status, label: 'Late' });
                
                }
                else{
                    setTeacher_status({ value: teacher_status, label: 'Replacement' });
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

        if (teacher_attendanceId) {
            fetchTeacher_attendance();
        }
    }, [teacher_attendanceId]);


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
        setTeacher_status(selectedOption.value);
    };

    const handleUserSelectChange = (selectedOption) => {
        setInputValues({
          ...inputValues,
          user_rep_id: selectedOption.value
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
          subject_rep_id: selectedOption.value
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


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
    
    
    
        formData.append("center_id", localStorage.getItem('center_id'));
        formData.append("teacher_attendance_id", selectedtt_id);
        formData.append("teacher_status", teacher_status);
        formData.append("date", inputValues.date);
        formData.append("subject_rep_id", inputValues.subject_rep_id|| 'None');
        formData.append("user_rep_id", inputValues.user_rep_id|| 'None');
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
                                         {
                                        input.fieldName === "teacher_status" ? (
                                            <Select
                                                options={TSOptions}
                                                name={input.fieldName}
                                                value={teacher_status}
                                                onChange={handleTeacher_StatusSelectChange}
                                                required
                                            />
                                        ) : (input.fieldName === "subject_rep_id" || input.fieldName === "user_rep_id") ? (
                                            teacher_status === "Replacement" || teacher_status === "Absent" ? (
                                                <Select
                                                    options={input.fieldName === "subject_rep_id" ? Subjectoptions : useroptions}
                                                    name={input.fieldName}
                                                    onChange={input.fieldName === "subject_rep_id" ? handleSubjectSelectChange : handleUserSelectChange}
                                                    required
                                                />
                                            ) : null
                                        ) : (
                                            <input
                                                type={input.type}
                                                placeholder={input.placeholder}
                                                name={input.fieldName}
                                                value={inputValues[input.fieldName] || ''}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        )
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

export default TeacherAttendanceUpdate;
