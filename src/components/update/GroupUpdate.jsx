import "./update.scss";
import Select from 'react-select';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { groupInputs } from "../../formSource";

const statusOptions = [
  { value: 1, label: 'Active' },
  { value: 0, label: 'Inactive' },
];
const NameOptions = [
    { value: 'Biology', label: 'Biology' },
    { value: 'Computer', label: 'Computer' },
    { value: 'PreEngineering', label: 'PreEngineering' },
    { value: 'PreMedical', label: 'PreMedical' },
  ];


const  GroupUpdate = ({ title }) => {

    // Extracting groupId using regular expressions
    const location = useLocation();
    const groupId = location.pathname.match(/\/update-group\/(\d+)/)?.[1];
    const center_id = localStorage.getItem('center_id');
    // Initializing state
    // const [file, setFile] = useState(null);
    const [inputValues, setInputValues] = useState("");
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedName, setSelectedName] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState([]);
    const [subjectoptions, setSubjectoptions] = useState([]);
    const [selectedClass, setSelectedClass] = useState([]);
    const [classoptions, setClassoptions] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState([]);
    const [batchoptions, setBatchoptions] = useState([]);
    let [token] = useState(localStorage.getItem("token"));
    
    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };

    const navigate = useNavigate();

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/group/${groupId}`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch quiz');
                }
                const data = await response.json();
                console.log("abbas",data)
                const snames = data.data.subject_names.split(',');
                const sid = data.data.subject_id.split(',');
                // console.log("abbas1",abbas);
                const namelist = [];
                for (let i = 0; i < snames.length; i++) {
                  const name = snames[i];
                  console.log(name);
                  const id = sid[i]; // Access the "name" property
                  namelist.push({ value: id, label: name },);
                }
                const cnames = data.data.class_names;
                const cid = data.data.class_id;
                // console.log("abbas1",abbas);
                const namelist1 = [];
                  namelist1.push({ value: cid, label: cnames },);

                  const bnames = data.data.batch_names;
                  const bid = data.data.batch_id;
                  // console.log("abbas1",abbas);
                  const namelist2 = [];
                    namelist2.push({ value: bid, label: bnames },);

                const status = data.data.status
                if (status == 1){
                    setSelectedStatus({ value: status, label: 'Active' });
                }
                else{
                    setSelectedStatus({ value: status, label: 'Inactive' });
                }
                const name = data.data.name
                if (name == "Biology"){
                    setSelectedName({ value: name, label: 'Biology' });
                }
                else if (name == "Computer"){
                    setSelectedName({ value: name, label: 'Computer' });
                }
                else if (name == "PreEngineering"){
                    setSelectedName({ value: name, label: 'PreEngineering' });
                }
                else{
                    setSelectedName({ value: name, label: 'PreMedical' });
                }
                setSelectedSubject(namelist);
                setSelectedClass(namelist1);
                setSelectedBatch(namelist2);
                setInputValues(data.data);
                // setFile(data.data.logo);
                localStorage.setItem("quizData", JSON.stringify(data));

            } catch (error) {
                console.error(error);
            }
        };

        if (groupId) {
            fetchGroup();
        }
    }, [groupId]);
    // console.log("quiz in a state:", data);

    const handleStatusSelectChange = (selectedOption) => {
        setSelectedStatus(selectedOption);
        setInputValues({
          ...inputValues,
          status: selectedOption.value,
        });
      };

      const handleNameSelectChange = (selectedOption) => {
        setSelectedName(selectedOption);
        setInputValues({
          ...inputValues,
          name: selectedOption.value,
        });
      };
      
    
         const handleInputChange = (e) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        });
    };

    const handleSubjectSelectChange = (selectedOptions) => {
        setSelectedSubject(selectedOptions);
        // Update the role_id in the inputValues
        const roleIds = selectedOptions.map((option) => option.value);
        setInputValues({
            ...inputValues,
           subject_id: roleIds,
        });
    };
      useEffect(() => {
        subject_names();
      }, []); // Empty dependency array means it runs once when the component mounts

      const subject_names = async () => {
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

      const handleBatchSelectChange = (selectedOption) => {
        setSelectedBatch(selectedOption);
        setInputValues({
          ...inputValues,
          batch_id: selectedOption.value,
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
        formData.append('id', groupId);
        const UserValues = selectedSubject.map((option) => option.value);
        formData.append("center_id", localStorage.getItem('center_id'));
        formData.append("subject_id", UserValues);
        formData.append("class_id", inputValues.class_id);
        formData.append("batch_id", inputValues.batch_id);
        formData.append("name", inputValues.name);
        formData.append('status', parseInt(inputValues.status));
        console.log(formData);


        // Send formData to the server using an HTTP request to update
        fetch(`http://127.0.0.1:5000/upd_group/${groupId}`, {
            method: "PUT",
            body: formData, // Pass the object as the body
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("Response from API", data);
                // Navigate to the desired page after API response
                navigate(`/group`);
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
                            {/* <div className="left">
                                <img
                                    src={
                                        // file
                                    }
                                    alt=""
                                    className="itemImg"
                                />
                            </div> */}
                            <div className="right">
                                <form onSubmit={handleUpdate}>
                                    {groupInputs.map((input) => (
                                        <div className="formInput" key={input.id}>
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
                                            ):input.fieldName === "status" ? (
                                                <Select
                                                options={statusOptions}
                                                name={input.fieldName}
                                                value={selectedStatus}
                                                onChange={handleStatusSelectChange}
                                                required
                                                />
                                            ):input.fieldName === "name" ? (
                                                <Select
                                                options={NameOptions}
                                                name={input.fieldName}
                                                value={selectedName}
                                                onChange={handleNameSelectChange}
                                                required
                                                />
                                            ):input.fieldName === "batch_id" ? (
                                                <Select
                                                options={batchoptions}
                                                name={input.fieldName}
                                                value={selectedBatch}
                                                onChange={handleBatchSelectChange}
                                                required
                                                />
                                            ):input.fieldName === "class_id" ? (
                                                <Select
                                                options={classoptions}
                                                name={input.fieldName}
                                                value={selectedClass}
                                                onChange={handleClassSelectChange}
                                                required
                                                />
                                            ) : (<input
                                                type={input.type}
                                                placeholder={input.placeholder}
                                                name={input.fieldName}
                                                value={inputValues[input.fieldName] || ''}
                                                onChange={handleInputChange}
                                                required
                                                // inputMode={input.fieldName === 'no_of_quiz' ? 'numeric' : undefined}
                                            />
                                            )}
                                        </div>
                                    ))}
                                    <div style={{ clear: "both" }} className="formUpdate">
                                        <button
                                            style={{ float: "right" }}
                                        // onClick={() => navigate(`/class`)}
                                        >
                                            Update
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            style={{ float: "right" }}
                                            onClick={() => navigate(`/group`)}
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

export default GroupUpdate;