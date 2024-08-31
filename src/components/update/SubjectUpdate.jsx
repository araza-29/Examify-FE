import "./update.scss";
import Select from 'react-select';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { subjectInputs } from "../../formSource";

const statusOptions = [
  { value: 1, label: 'Active' },
  { value: 0, label: 'Inactive' },
];

const  SubjectUpdate = ({ title }) => {

    // Extracting subId using regular expressions
    const location = useLocation();
    const subId = location.pathname.match(/\/update-subject\/(\d+)/)?.[1];

    // Initializing state
    // const [file, setFile] = useState(null);
    const [inputValues, setInputValues] = useState("");
    // const [selectedRoles_1, setSelectedRoles_1] = useState([]);
    const [options, setOptions] = useState([]);
    const [uoptions, setUoptions] = useState([]);
    const [coptions, setCoptions] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    let [token] = useState(localStorage.getItem("token"));
    
    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };

    const navigate = useNavigate();

    useEffect(() => {
        const fetchsubject = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/subject/${subId}`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch quiz');
                }
                const data = await response.json();
                console.log("abbas",data)
                const unames = data.data.user_names.split(',');
                const uid = data.data.user_id.split(',');
                // console.log("abbas1",abbas);
                const namelist = [];
                for (let i = 0; i < unames.length; i++) {
                  const name = unames[i];
                  console.log(name);
                  const id = uid[i]; // Access the "name" property
                  namelist.push({ value: id, label: name },);
                }
                console.log(namelist);
                setSelectedUsers(namelist);
                setInputValues(data.data);
                // setFile(data.data.logo);
                localStorage.setItem("quizData", JSON.stringify(data));

            } catch (error) {
                console.error(error);
            }
        };

        if (subId) {
            fetchsubject();
        }
    }, [subId]);
    // console.log("quiz in a state:", data);

    const handleUserSelectChange = (selectedOptions) => {
        setSelectedUsers(selectedOptions);
        // Update the role_id in the inputValues
        const userIds = selectedOptions.map((option) => option.value);
        setInputValues({
            ...inputValues,
            user_id: userIds,
        });
    };
      
      
      const handleCenterSelectChange = (selectedOption) => {
        setInputValues({
          ...inputValues,
          status: selectedOption.value
        });
      };
    
    
      useEffect(() => {
        users();
      }, []);
    
      const users = async () => {
            const formData = {
                center_id: localStorage.getItem("center_id"),
              };
              console.log("abbas",formData);
              const formDataString = JSON.stringify(formData);
              try {
                 const response = await fetch('http://127.0.0.1:5000/user_ids', {
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
                    setUoptions(namelist);
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
    
         const handleInputChange = (e) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('id', subId);
        formData.append('center_id', localStorage.getItem('center_id'));
        formData.append('name', inputValues.name);
        formData.append('user_id', inputValues.user_id);
        formData.append('class_id', inputValues.class_id);
        formData.append('status', parseInt(inputValues.status));
        console.log(formData);
        // Send formData to the server using an HTTP request to update
        fetch(`http://127.0.0.1:5000/upd_subject/${subId}`, {
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
                navigate(`/subject`);
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
                                    {subjectInputs.map((input) => (
                                        <div className="formInput" key={input.id}>
                                            <label>{input.label}</label>
                                            {input.fieldName === "user_id" ? (
                                                <Select
                                                options={uoptions}
                                                name={input.fieldName}
                                                isMulti // Enable multiple selection
                                                value={selectedUsers}
                                                onChange={handleUserSelectChange}
                                                required
                                                />
                                            ): input.fieldName === "status" ? (
                                                <Select
                                                options={statusOptions}
                                                name={input.fieldName}
                                                onChange={handleCenterSelectChange}
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
                                        // onClick={() => navigate(`/categories`)}
                                        >
                                            Update
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            style={{ float: "right" }}
                                            onClick={() => navigate(`/subject`)}
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

export default SubjectUpdate;