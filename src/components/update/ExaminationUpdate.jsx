import "./update.scss";
import Select from 'react-select';
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { examinationInputs } from "../../formSource";

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

const  ExaminationUpdate = ({ title }) => {

    // Extracting examinationId using regular expressions
    const location = useLocation();
    const examinationId = location.pathname.match(/\/update-examination\/(\d+)/)?.[1];

    // Initializing state
    const [file, setFile] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedDuration, setSelectedDuration] = useState(null);
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
        const fetchExamination = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/examination/${examinationId}`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch quiz');
                }
                const data = await response.json();
                console.log("abbas",data)
                setInputValues(data.data);
                setSelectedClass(data.data.class_id)
                setSelectedSubject(data.data.subject_id)
                setSelectedUser(data.data.user_id)
                // console.log("quiz in a state:", data.data.file);
                const status = data.data.status
                if (status == 1){
                    setSelectedStatus({ value: status, label: 'Active' });
                }
                else{
                    setSelectedStatus({ value: status, label: 'Inactive' });
                }
                const duration = data.data.duration
                if (duration == '3hr'){
                    setSelectedDuration({ value: duration, label: '3hr' });
                }
                else if (duration == '2hr'){
                  setSelectedDuration({ value: duration, label: '2hr' });
                }
                else{
                    setSelectedDuration({ value: duration, label: '1hr' });
                }
                const checking_status = data.data.checking_status
                if (checking_status == 'Done'){
                    setSelectedCstatus({ value: checking_status, label: 'Done' });
                }
                else{
                    setSelectedCstatus({ value: checking_status, label: 'Not Done' });
                }
                const type = data.data.type
                if (type == 'Monthly'){
                    setSelectedPtype({ value: type, label: 'Monthly' });
                }
                else if (type == 'Module-1'){
                    setSelectedPtype({ value: type, label: 'Module-1' });
                }
                else if (type == 'Module-2'){
                    setSelectedPtype({ value: type, label: 'Module-2' });
                }
                else if (type == 'Module-3'){
                    setSelectedPtype({ value: type, label: 'Module-3' });
                }
                else if (type == 'Mock'){
                    setSelectedPtype({ value: type, label: 'Mock' });
                }                
                else{
                    setSelectedPtype({ value: type, label: 'Preliam' });
                }
                setFile(data.data.file);
                localStorage.setItem("quizData", JSON.stringify(data));

            } catch (error) {
                console.error(error);
            }
        };
        console.log("quiz in the a state:", file);
        if (examinationId) {
            fetchExamination();
            
        }
    }, [examinationId]);
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

      const handleDurationSelectChange = (selectedOption) => {
        setSelectedDuration(selectedOption);
        setInputValues({
          ...inputValues,
            duration: selectedOption.value,
        });
      };


    const handleUpdate = async (e) => {
        e.preventDefault();

        // const formData = {
        //     id: examinationId,
        //     center_id: inputValues.cen_id,
        //     class_id: inputValues.class_id,
        //     subject_id: inputValues.subject_id,
        //     type: inputValues.type,
        //     month: inputValues.month,
        //     date: inputValues.date,
        //     total_marks: inputValues.total_marks,
        //     user_id: inputValues.user_id,
        //     schedule_start_time: inputValues.schedule_start_time,
        //     schedule_end_time: inputValues.schedule_end_time,
        //     start_time: inputValues.start_time,
        //     end_time: inputValues.end_time,
        //     checking_status: inputValues.checking_status,
        //     logo: file || "",
        //     status: parseInt(inputValues.status),
        // };
        // console.log("Abbas",formData)

        const formData = new FormData();
        formData.append('id', examinationId);
        formData.append('center_id', localStorage.getItem('center_id'));
        formData.append('class_id', inputValues.class_id);
        formData.append('subject_id', inputValues.subject_id);
        formData.append('type', inputValues.type);
        formData.append('month', inputValues.month);
        formData.append('date', inputValues.date);
        formData.append('total_marks', inputValues.total_marks);
        formData.append('user_id', inputValues.user_id);
        formData.append('schedule_start_time', inputValues.schedule_start_time);
        formData.append('schedule_end_time', inputValues.schedule_end_time);
        formData.append('start_time', inputValues.start_time);
        formData.append('end_time', inputValues.end_time);
        formData.append('duration', inputValues.duration);
        formData.append('checking_status', inputValues.checking_status);
        formData.append('file', file || "");
        formData.append('status', parseInt(inputValues.status));
        console.log(formData);


        // Send formData to the server using an HTTP request to update
        fetch(`http://127.0.0.1:5000/upd_examination/${examinationId}`, {
            method: "PUT",
            body: formData, // Pass the object as the body
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("Response from API", data);
                // Navigate to the desired page after API response
                navigate(`/examination`);
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
                                            style={{ display: "none" }}a
                                        />
                                    </div>
                                    {examinationInputs.map((input) => (
                                        <div className="formInput" key={input.id}>
                                            <label>{input.label}</label>
                                            {input.fieldName === "user_id" ? (
                                                <Select
                                                options={uoption}
                                                name={input.fieldName}
                                                value={selectedUser}
                                                onChange={handleUserSelectChange}
                                                required
                                                />
                                            ) :input.fieldName === "subject_id" ? (
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
                                            ) :input.fieldName === "checking_status" ? (
                                                <Select
                                                options={cstatusOptions}
                                                name={input.fieldName}
                                                value={selectedCstatus}
                                                onChange={handleCstatusSelectChange}
                                                required
                                                />
                                            ) :input.fieldName === "type" ? (
                                                <Select
                                                options={PaperOptions}
                                                name={input.fieldName}
                                                value={selectedPtype}
                                                onChange={handlePtypeSelectChange}
                                                required
                                                />
                                            ) :input.fieldName === "duration" ? (
                                              <Select
                                              options={DurationOptions}
                                              name={input.fieldName}
                                              value={selectedDuration}
                                              onChange={handleDurationSelectChange}
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
                                            onClick={() => navigate(`/examination`)}
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

export default ExaminationUpdate;