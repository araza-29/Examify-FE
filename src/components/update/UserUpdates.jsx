import "./update.scss";
import Select from 'react-select';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { userInputs } from "../../formSource";

const statusOptions = [
  { value: 1, label: 'Active' },
  { value: 0, label: 'Inactive' },
];

const  UserUpdate = ({ title }) => {

    // Extracting cooId using regular expressions
    const location = useLocation();
    const cooId = location.pathname.match(/\/update-user\/(\d+)/)?.[1];

    // Initializing state
    // const [file, setFile] = useState(null);
    const [inputValues, setInputValues] = useState("");
    // const [selectedRoles_1, setSelectedRoles_1] = useState([]);
    const [options, setOptions] = useState([]);
    const [roptions, setRoptions] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedRoles, setSelectedRoles] = useState([]);
    let [token] = useState(localStorage.getItem("token"));
    
    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/user/${cooId}`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch quiz');
                }
                const data = await response.json();
                console.log("abbas",data)
                const rnames = data.data.role_names.split(',');
                const rid = data.data.role_id.split(',');
                // console.log("abbas1",abbas);
                const namelist = [];
                for (let i = 0; i < rnames.length; i++) {
                  const name = rnames[i];
                  console.log(name);
                  const id = rid[i]; // Access the "name" property
                  namelist.push({ value: id, label: name },);
                }
                console.log(namelist);
                
                const status = data.data.status
                if (status == 1){
                    setSelectedStatus({ value: status, label: 'Active' });
                }
                else{
                    setSelectedStatus({ value: status, label: 'Inactive' });
                }
                setSelectedRoles(namelist);
                setInputValues(data.data);
                // setFile(data.data.logo);
                localStorage.setItem("quizData", JSON.stringify(data));

            } catch (error) {
                console.error(error);
            }
        };

        if (cooId) {
            fetchUser();
        }
    }, [cooId]);
    // console.log("quiz in a state:", data);

    const handleRoleSelectChange = (selectedOptions) => {
        setSelectedRoles(selectedOptions);
        // Update the role_id in the inputValues
        const roleIds = selectedOptions.map((option) => option.value);
        setInputValues({
            ...inputValues,
            role_id: roleIds,
        });
    };
    
      
      
      const handleStatusSelectChange = (selectedOption) => {
        setInputValues({
          ...inputValues,
          status: selectedOption.value
        });
      };
    
      useEffect(() => {
        center_name();
      }, []); // Empty dependency array means it runs once when the component mounts
    
      useEffect(() => {
        roles();
      }, []);
    
      const roles = async () => {
        try {
          const response = await fetch("http://127.0.0.1:5000/role_ids");
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
          setRoptions(namelist);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } 
    
      const center_name = async () => {
        try {
          const response = await fetch("http://127.0.0.1:5000/center_id");
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
          setOptions(namelist);
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

    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('id', cooId);
        formData.append('center_id', localStorage.getItem('center_id'));
        formData.append('name', inputValues.name);
        formData.append('role_id', inputValues.role_id);
        formData.append('email', inputValues.email);
        formData.append('phone_no', inputValues.phone_no);
        formData.append('password', inputValues.password);
        formData.append('status', parseInt(inputValues.status));
        console.log(formData);
        // Send formData to the server using an HTTP request to update
        fetch(`http://127.0.0.1:5000/upd_user/${cooId}`, {
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
                navigate(`/user`);
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
                                    {userInputs.map((input) => (
                                        <div className="formInput" key={input.id}>
                                            <label>{input.label}</label>
                                            {input.fieldName === "role_id" ? (
                                                <Select
                                                options={roptions}
                                                name={input.fieldName}
                                                isMulti // Enable multiple selection
                                                value={selectedRoles}
                                                onChange={handleRoleSelectChange}
                                                required
                                                />
                                            ): input.fieldName === "status" ? (
                                                <Select
                                                options={statusOptions}
                                                name={input.fieldName}
                                                value = {selectedStatus}
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
                                        // onClick={() => navigate(`/categories/${cooId}`)}
                                        >
                                            Update
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            style={{ float: "right" }}
                                            onClick={() => navigate(`/user`)}
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

export default UserUpdate;