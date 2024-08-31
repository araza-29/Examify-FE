import "./update.scss";
import Select from 'react-select';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { cooInputs } from "../../formSource";


const  COOUpdate = ({ title }) => {

    // Extracting cooId using regular expressions
    const location = useLocation();
    const cooId = location.pathname.match(/\/update-coo\/(\d+)/)?.[1];

    // Initializing state
    // const [file, setFile] = useState(null);
    const [inputValues, setInputValues] = useState("");
    const [options, setOptions] = useState([]);
    const [roptions, setRoptions] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);
    let [token] = useState(localStorage.getItem("token"));
    
    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCOO = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/user/${cooId}`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch quiz');
                }
                const data = await response.json();
                console.log("abbas",data)
                setInputValues(data.data);
                // setFile(data.data.logo);
                localStorage.setItem("quizData", JSON.stringify(data));

            } catch (error) {
                console.error(error);
            }
        };

        if (cooId) {
            fetchCOO();
        }
    }, [cooId]);
    // console.log("quiz in a state:", data);

    const handleRoleSelectChange = (selectedOptions) => {
        setSelectedRoles(selectedOptions);
      };
      
      
      const handleCenterSelectChange = (selectedOption) => {
        setInputValues({
          ...inputValues,
          center_id: selectedOption.value
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
          const response = await fetch("http://127.0.0.1:5000/role_id");
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

        const formData = {
            id: cooId,
            center_id: inputValues.center_id,
            name: inputValues.name,
            role_id: inputValues.role_id,
            email: inputValues.email,
            phone_no: inputValues.phone_no,
            password: inputValues.password,
            status: parseInt(inputValues.status),
        };
        console.log("Abbas",formData)

        // Send formData to the server using an HTTP request to update
        fetch('http://127.0.0.1:5000/upd_user/<int:user_id>', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData), // Pass the object as the body
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("Response from API", data);
                // Navigate to the desired page after API response
                navigate(`/coo`);
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
                                    {cooInputs.map((input) => (
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
                                            ): input.fieldName === "center_id" ? (
                                                <Select
                                                options={options}
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
                                        // onClick={() => navigate(`/categories/${cooId}`)}
                                        >
                                            Update
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            style={{ float: "right" }}
                                            onClick={() => navigate(`/coo`)}
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

export default COOUpdate;