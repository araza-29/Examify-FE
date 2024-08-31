import "./update.scss";
import Select from 'react-select';
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { rolescreenInputs } from "../../formSource";

const statusOptions = [
    { value: 1, label: 'Active' },
    { value: 0, label: 'Unactive' },
  ];
const  RolescreenUpdate = ({ title }) => {

    // Extracting rolescreenId using regular expressions
    const location = useLocation();
    const rolescreenId = location.pathname.match(/\/update-role-screen\/(\d+)/)?.[1];

    // Initializing state
    // const [file, setFile] = useState(null);
    const [inputValues, setInputValues] = useState("");
    const [selectedStatus, setSelectedStatus] = useState(null);
    let [token] = useState(localStorage.getItem("token"));
    
    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };

    const navigate = useNavigate();

    useEffect(() => {
        const fetchRolescreen = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/rscreen/${rolescreenId}`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch quiz');
                }
                const data = await response.json();
                const status = data.data.status
                if (status == 1){
                    setSelectedStatus({ value: status, label: 'Active' });
                }
                else{
                    setSelectedStatus({ value: status, label: 'Inactive' });
                }
                console.log("abbas",data)
                setInputValues(data.data);
                // setFile(data.data.logo);
                localStorage.setItem("quizData", JSON.stringify(data));

            } catch (error) {
                console.error(error);
            }
        };

        if (rolescreenId) {
            fetchRolescreen();
        }
    }, [rolescreenId]);
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
      const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("center_id", localStorage.getItem('center_id'));
        formData.append("name", inputValues.name);
        formData.append("status", parseInt(inputValues.status));
        console.log(formData);
        // Send formData to the server using an HTTP request to update
        fetch(`http://127.0.0.1:5000/upd_rscreen/${rolescreenId}`, {
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
                navigate(`/role-screen`);
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
                                    {rolescreenInputs.map((input) => (
                                        <div className="formInput" key={input.id}>
                                            <label>{input.label}</label>
                                            {input.fieldName === "status" ? (
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
                                        // onClick={() => navigate(`/cateole-gories`)}
                                        >
                                            Update
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            style={{ float: "right" }}
                                            onClick={() => navigate(`/role-screen`)}
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

export default RolescreenUpdate;