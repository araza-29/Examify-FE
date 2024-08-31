import "./update.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Select from 'react-select';
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { teacherInputs } from "../../formSource";

  const statusOptions = [
      { value: 1, label: 'Active' },
      { value: 0, label: 'Inactive' },
    ];
    const DayOptions = [
        { value: 'Monday', label: 'Monday' },
        { value: 'Tuesday', label: 'Tuesday' },
        { value: 'Wednesday', label: 'Wednesday' },
        { value: 'Thursday', label: 'Thursday' },
        { value: 'Friday', label: 'Friday' },
        { value: 'Saturday', label: 'Saturday' },
      ];
    

const  TeacherUpdate = ({ title }) => {

    // Extracting teacherId using regular expressions
    const location = useLocation();
    const teacherId = location.pathname.match(/\/update-teacher\/(\d+)/)?.[1];
    const center_id = localStorage.getItem('center_id');
    // Initializing state
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const [inputValues, setInputValues] = useState("");
    const [selectedUser, setSelectedUser] = useState([]);
    const [useroptions, setUseroptions] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState([]);
    const [Subjectoptions, setSubjectoptions] = useState([]);
    const [selectedClass, setSelectedClass] = useState([]);
    const [Classoptions, setClassoptions] = useState([]);
    let [token] = useState(localStorage.getItem("token"));
    
    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };

    const navigate = useNavigate();

    useEffect(() => {
        const fetchteacher = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/teacher/${teacherId}`, {
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
                console.log(status);
                if (status == 1){
                    setSelectedStatus({ value: status, label: 'Active' });
                }
                else{
                    setSelectedStatus({ value: status, label: 'Inactive' });
                }
                setSelectedUser(namelist);
                setSelectedSubject(namelist_t);
                setSelectedClass(namelist_a);
                localStorage.setItem("quizData", JSON.stringify(data));

            } catch (error) {
                console.error(error);
            }
        };

        if (teacherId) {
            fetchteacher();
        }
    }, [teacherId]);
    // console.log("quiz in a state:", data);



    const handleInputChange = (e) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        });
    };

    const handleStatusSelectChange = (selectedOption) => {
        setSelectedStatus(selectedOption);
        setInputValues({
          ...inputValues,
          status: selectedOption.value,
        });
      };


      const handleUserSelectChange = (selectedOption) => {
        setSelectedUser(selectedOption);
        setInputValues({
          ...inputValues,
          user_id: selectedOption.value,
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

      const handleSubjectSelectChange = (selectedOption) => {
        setSelectedSubject(selectedOption);
        setInputValues({
          ...inputValues,
          subject_id: selectedOption.value,
        });
      };
      useEffect(() => {
        Subject_name();
      }, []); // Empty dependency array means it runs once when the component mounts

      const Subject_name = async () => {
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

      const handleClassSelectChange = (selectedOption) => {
        setSelectedClass(selectedOption);
        setInputValues({
          ...inputValues,
          class_id: selectedOption.value,
        });
      };
      useEffect(() => {
        Class_name();
      }, []); // Empty dependency array means it runs once when the component mounts

      const Class_name = async () => {
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





    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("center_id", localStorage.getItem('center_id'));
        formData.append("user_id", inputValues.user_id);
        formData.append("class_id", inputValues.class_id);
        formData.append("subject_id", inputValues.subject_id);
        formData.append("status", inputValues.status || 1);
        // formData.append("logo", file); // Append the file to FormData
    


        // Send formData to the server using an HTTP request to update
        fetch(`http://127.0.0.1:5000/upd_teacher/${teacherId}`, {
            method: "PUT",
            body: formData, // Pass the object as the body
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("Response from API", data);
                // Navigate to the desired page after API response
                navigate(`/teacher`);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            {!token && redirectToLogin()}
            {token && (
                <div className="update">
                    <Sidebar />
                    <div className="updateContainer">
                        <Navbar />
                        <div className="top">
                            <h1>{title}</h1>
                        </div>
                        <div className="bottom">
                            <div className="right">
                                <form onSubmit={handleUpdate}>
                                    {teacherInputs.map((input) => (
                                         <div className="formInput" key={input.id}>
                                         <label>{input.label}</label>
                                         {input.fieldName === "subject_id" ? (
                                                <Select
                                                options={Subjectoptions}
                                                name={input.fieldName}
                                                value={selectedSubject}
                                                onChange={handleSubjectSelectChange}
                                                required
                                                />
                                            ):input.fieldName === "user_id" ? (
                                                <Select
                                                options={useroptions}
                                                name={input.fieldName}
                                                value={selectedUser}
                                                onChange={handleUserSelectChange}
                                                required
                                                />
                                            ):input.fieldName === "class_id" ? (
                                                <Select
                                                options={Classoptions}
                                                name={input.fieldName}
                                                value={selectedClass}
                                                onChange={handleClassSelectChange}
                                                required
                                                />
                                            ):input.fieldName === "status" ? (
                                             <Select
                                             options={statusOptions}
                                             name={input.fieldName}
                                             value={selectedStatus}
                                             onChange={handleStatusSelectChange}
                                             required
                                             />
                                        ) :<input
                                             type={input.type}
                                             placeholder={input.placeholder}
                                             name={input.fieldName}
                                             value={inputValues[input.fieldName] || ''}
                                             onChange={handleInputChange}
                                             required
                                             // inputMode={input.fieldName === 'no_of_quiz' ? 'numeric' : undefined}
                                         />
                                         }
                                     </div>
                                    ))}
                                    <div style={{ clear: "both" }} className="formUpdate">
                                        <button
                                            style={{ float: "right" }}
                                        // onClick={() => navigate(`/categories`)}
                                        >
                                            Update
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            style={{ float: "right" }}
                                            onClick={() => navigate(`/teacher`)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                )
            }
        </>
    );
};

export default TeacherUpdate;