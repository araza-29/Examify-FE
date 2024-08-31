import "./update.scss";
import Select from 'react-select';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { classInputs } from "../../formSource";

const statusOptions = [
  { value: 1, label: 'Active' },
  { value: 0, label: 'Inactive' },
];
const classOptions = [
    { value: 'IX', label: 'IX' },
    { value: 'X', label: 'X' },
    { value: 'XI', label: 'XI' },
    { value: 'XII', label: 'XII' },
  ];


const  ClassUpdate = ({ title }) => {

    // Extracting classId using regular expressions
    const location = useLocation();
    const classId = location.pathname.match(/\/update-class\/(\d+)/)?.[1];

    // Initializing state
    // const [file, setFile] = useState(null);
    const [inputValues, setInputValues] = useState("");
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedName, setSelectedName] = useState(null);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [soptions, setSoptions] = useState([]);
    let [token] = useState(localStorage.getItem("token"));
    
    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };

    const navigate = useNavigate();

    useEffect(() => {
        const fetchclass = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/class/${classId}`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch quiz');
                }
                const data = await response.json();
                console.log("abbas",data)
                const snames = data.data.subject_names.split(',');
                const sid = data.data.subjects_id.split(',');
                // console.log("abbas1",abbas);
                const namelist = [];
                for (let i = 0; i < snames.length; i++) {
                  const name = snames[i];
                  console.log(name);
                  const id = sid[i]; // Access the "name" property
                  namelist.push({ value: id, label: name },);
                }
                const status = data.data.status
                if (status == 1){
                    setSelectedStatus({ value: status, label: 'Active' });
                }
                else{
                    setSelectedStatus({ value: status, label: 'Inactive' });
                }
                const name = data.data.name
                if (name == "IX"){
                    setSelectedName({ value: name, label: 'IX' });
                }
                else if (name == "X"){
                    setSelectedName({ value: name, label: 'X' });
                }
                else if (name == "XI"){
                    setSelectedName({ value: name, label: 'XI' });
                }
                else if (name == "XII"){
                    setSelectedName({ value: name, label: 'XII' });
                }
                setSelectedRoles(namelist);
                setInputValues(data.data);
                // setFile(data.data.logo);
                localStorage.setItem("quizData", JSON.stringify(data));

            } catch (error) {
                console.error(error);
            }
        };

        if (classId) {
            fetchclass();
        }
    }, [classId]);
    // console.log("quiz in a state:", data);
    const handleNameSelectChange = (selectedOption) => {
        setSelectedName(selectedOption);
        setInputValues({
          ...inputValues,
          name: selectedOption.value,
        });
      };
      
      const handleRoleSelectChange = (selectedOptions) => {
        setSelectedRoles(selectedOptions);
        // Update the role_id in the inputValues
        const roleIds = selectedOptions.map((option) => option.value);
        setInputValues({
            ...inputValues,
            subjects_id: roleIds,
        });
    };

    const handleStatusSelectChange = (selectedOption) => {
        setSelectedStatus(selectedOption);
        setInputValues({
          ...inputValues,
          status: selectedOption.value,
        });
      };
      
    
         const handleInputChange = (e) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        subjects();
      }, []);
    
      const subjects = async () => {
            const formData = {
                center_id: localStorage.getItem("center_id"),
              };
              console.log("abbas",formData);
              const formDataString = JSON.stringify(formData);
              try {
                 const response = await fetch('http://127.0.0.1:5000/subjects', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: formDataString,
                })
                  .then((response) => {
                    if (response.ok) {
                      return response.json();
                    } else {
                      throw new Error('Error: ' + response.status);
                    }
                  })
                  .then((data) => {
                    console.log(data.data.length);
                    const namelist = [];
                    for (let i = 0; i < data.data.length; i++) {
                      const name = data.data[i].name;
                      console.log(name);
                      const id = data.data[i].id; // Access the "name" property
                      namelist.push({ value: id, label: name });
                    }
                    console.log(namelist);
                    setSoptions(namelist);
                  })
                  .catch((error) => {
                    console.log(error)
                    // setError('Invalid username or password!');
                    // setUsername('');
                    // setPassword('');
                  }
                  );
                return response
              } catch (error) {
                console.error(error);
              }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('id', classId);
        formData.append('center_id', localStorage.getItem('center_id'));
        formData.append('name', inputValues.name);
        formData.append("total_students", inputValues.total_students);
        formData.append("subjects_id", inputValues.subjects_id);
        formData.append('status', parseInt(inputValues.status));
        console.log(formData);
        // Send formData to the server using an HTTP request to update
        fetch(`http://127.0.0.1:5000/upd_class/${classId}`, {
            method: "PUT",
            body: formData, // Send the data as form data
            
        })
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => {
                console.log('abbas1',formData)
                console.log("Response from API", data);
                // Navigate to the desired page after API response
                navigate(`/class`);
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
                                    {classInputs.map((input) => (
                                        <div className="formInput" key={input.id}>
                                            <label>{input.label}</label>
                                            {input.fieldName === "name" ? (
                                                <Select
                                                options={classOptions}
                                                name={input.fieldName}
                                                value={selectedName}
                                                onChange={handleNameSelectChange}
                                                required
                                                />
                                            ):input.fieldName === "subjects_id" ? (
                                                <Select
                                                options={soptions}
                                                name={input.fieldName}
                                                isMulti // Enable multiple selection
                                                value={selectedRoles}
                                                onChange={handleRoleSelectChange}
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
                                            onClick={() => navigate(`/class`)}
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

export default ClassUpdate;