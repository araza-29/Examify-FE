import "./update.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Select from 'react-select';
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { studentInputs } from "../../formSource";

const DurationOptions = [
    { value: '3hr', label: '3hr' },
    { value: '2hr', label: '2hr' },
    { value: '1hr', label: '1hr' },
  ];
  
  const statusOptions = [
      { value: 1, label: 'Active' },
      { value: 0, label: 'Inactive' },
    ];
  const cstatusOptions = [
        { value: 'Done', label: 'Done' },
        { value: 'Not Done', label: 'Not Done' },
      ];
  const PaperOptions = [
          { value: 'Monthly', label: 'Monthly' },
          { value: 'Module-1', label: 'Module-1' },
          { value: 'Module-2', label: 'Module-2' },
          { value: 'Module-3', label: 'Module-3' },
          { value: 'Mock', label: 'Mock' },
          { value: 'Preliam', label: 'Preliam' },
        ];


const  StudentUpdate = ({ title }) => {

    // Extracting studentId using regular expressions
    const location = useLocation();
    const studentId = location.pathname.match(/\/update-student\/(\d+)/)?.[1];

    // Initializing state
    const [file, setFile] = useState(null);
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedCstatus, setSelectedCstatus] = useState(null);
    const [selectedPtype, setSelectedPtype] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [coption, setCoption] = useState([])
    const [soption, setSoption] = useState([])
    const [uoption, setUoption] = useState([])
    const center_id = localStorage.getItem('center_id');
    const [inputValues, setInputValues] = useState("");
    let [token] = useState(localStorage.getItem("token"));
    
    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };

    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/student/${studentId}`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch quiz');
                }
                const data = await response.json();
                console.log("abbas",data)
                setInputValues(data.data);
                const cnames = data.data.class_names
                const cid = data.data.class_id
                // console.log("abbas1",abbas);
                const namelist = [];
                  const name = cnames;
                  console.log(name);
                  const id = cid; // Access the "name" property
                  namelist.push({ value: id, label: name },);
                setSelectedClass(namelist)
                const bnames = data.data.batch_names
                const bid = data.data.batch_id
                // console.log("abbas1",abbas);
                const namelist1 = [];
                  const nameb = bnames;
                  console.log(name);
                  const idb = bid; // Access the "name" property
                  namelist1.push({ value: idb, label: nameb },);
                setSelectedSubject(namelist1)
                setSelectedUser(data.data.user_id)
                const status = data.data.status
                if (status == 1){
                    setSelectedStatus({ value: status, label: 'Active' });
                }
                else{
                    setSelectedStatus({ value: status, label: 'Inactive' });
                }
                setFile(data.data.image);
                setFile1(data.data.bform);
                setFile2(data.data.marksheet);
                localStorage.setItem("quizData", JSON.stringify(data));

            } catch (error) {
                console.error(error);
            }
        };

        if (studentId) {
            fetchStudent();
        }
    }, [studentId]);
    // console.log("quiz in a state:", data);

    const handleClassSelectChange = (selectedOption) => {
        setSelectedClass(selectedOption);
        setInputValues({
          ...inputValues,
          class_id: selectedOption.value,
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
            if (selectedClass == id){
                setSelectedClass({ value: id, label: name });
            }
            namelist.push({ value: id, label: name });
          }
          console.log(selectedClass);
          console.log(namelist);
          setCoption(namelist);
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
            if (selectedSubject == id){
                setSelectedSubject({ value: id, label: name });
            }
            namelist.push({ value: id, label: name });
          }
          console.log(namelist);
          setSoption(namelist);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

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
            if (selectedUser == id){
                setSelectedUser({ value: id, label: name });
            }
            namelist.push({ value: id, label: name });
          }
          console.log(namelist);
          setUoption(namelist);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }


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

      const handleCstatusSelectChange = (selectedOption) => {
        setSelectedCstatus(selectedOption);
        setInputValues({
          ...inputValues,
            checking_status: selectedOption.value,
        });
      };

      const handlePtypeSelectChange = (selectedOption) => {
        setSelectedPtype(selectedOption);
        setInputValues({
          ...inputValues,
            type: selectedOption.value,
        });
      };





    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", file);
        formData.append("name", inputValues.name);
        formData.append("phone", inputValues.phone);
        formData.append("father_name", inputValues.father_name);
        formData.append("father_phone", inputValues.father_phone);
        formData.append("email", inputValues.email);
        formData.append("address", inputValues.address);
        formData.append("bform", file1);
        formData.append("center_id", localStorage.getItem('center_id'));
        formData.append("batch_id", inputValues.batch_id);
        formData.append("class_id", inputValues.class_id);
        formData.append("group_id", inputValues.group_id);
        formData.append("description", inputValues.description);
        formData.append("ref_name", inputValues.ref_name);
        formData.append("marksheet", file2);
        formData.append("ref_phone_no", inputValues.ref_phone_no);
        formData.append("last_class", inputValues.last_class);
        formData.append("last_grade", inputValues.last_grade);
        formData.append("percentage", inputValues.percentage);
        formData.append("status", inputValues.status || 1);
        // formData.append("logo", file); // Append the file to FormData
    


        // Send formData to the server using an HTTP request to update
        fetch(`http://127.0.0.1:5000/upd_student/${studentId}`, {
            method: "PUT",
            body: formData, // Pass the object as the body
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("Response from API", data);
                // Navigate to the desired page after API response
                navigate(`/student`);
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
                            <div className="left">
                                <img
                                    src={
                                        file
                                    }
                                    alt=""
                                    className="itemImg"
                                />
                            </div>
                            <div className="left">
                                <img
                                    src={
                                        file1
                                    }
                                    alt=""
                                    className="itemImg"
                                />
                            </div>
                            <div className="left">
                                <img
                                    src={
                                        file2
                                    }
                                    alt=""
                                    className="itemImg"
                                />
                            </div>
                            <div className="right">
                                <form onSubmit={handleUpdate}>
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
                                        <label htmlFor="file">
                                            Bform: <DriveFolderUploadOutlinedIcon className="icon" />
                                        </label>
                                        <input
                                            type="file"
                                            id="file"
                                            onChange={(e) => setFile1(e.target.files[1])}
                                            style={{ display: "none" }}
                                        />
                                    </div>
                                    <div className="formInput">
                                        <label htmlFor="file">
                                            MarkSheet: <DriveFolderUploadOutlinedIcon className="icon" />
                                        </label>
                                        <input
                                            type="file"
                                            id="file"
                                            onChange={(e) => setFile2(e.target.files[1])}
                                            style={{ display: "none" }}
                                        />
                                    </div>
                                    {studentInputs.map((input) => (
                                         <div className="formInput" key={input.id}>
                                         <label>{input.label}</label>
                                         {input.fieldName === "group_id" ? (
                                             <Select
                                             options={uoption}
                                             name={input.fieldName}
                                             value={selectedUser}
                                             onChange={handleUserSelectChange}
                                             required
                                             />
                                         ) :input.fieldName === "batch_id" ? (
                                             <Select
                                             options={soption}
                                             name={input.fieldName}
                                             value={selectedSubject}
                                             onChange={handleSubjectSelectChange}
                                             required
                                             />
                                         ) :input.fieldName === "class_id" ? (
                                             <Select
                                             options={coption}
                                             name={input.fieldName}
                                             value={selectedClass}
                                             onChange={handleClassSelectChange}
                                             required
                                             />
                                         ) :input.fieldName === "status" ? (
                                             <Select
                                             options={statusOptions}
                                             name={input.fieldName}
                                             value={selectedStatus}
                                             onChange={handleStatusSelectChange}
                                             required
                                             />
                                         ) :input.fieldName === "last_class" ? (
                                             <Select
                                             options={cstatusOptions}
                                             name={input.fieldName}
                                             value={selectedCstatus}
                                             onChange={handleCstatusSelectChange}
                                             required
                                             />
                                         ) :input.fieldName === "last_grade" ? (
                                             <Select
                                             options={PaperOptions}
                                             name={input.fieldName}
                                             value={selectedPtype}
                                             onChange={handlePtypeSelectChange}
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
                                            onClick={() => navigate(`/student`)}
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

export default StudentUpdate;