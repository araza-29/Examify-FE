import "./update.scss";
import Select from 'react-select';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { nbatchInputs } from "../../formSource";

const statusOptions = [
  { value: 1, label: 'Active' },
  { value: 0, label: 'Inactive' },
];
const BatchOptions = [
    { value: 'Computer', label: 'Computer' },
    { value: 'Biology', label: 'Biology' },
    { value: 'Pre_Engineering', label: 'Pre Engineering' },
    { value: 'Pre_Medical', label: 'Pre Medical' },
  ];


const  BatchUpdate = ({ title }) => {

    // Extracting batchId using regular expressions
    const location = useLocation();
    const batchId = location.pathname.match(/\/update-batch\/(\d+)/)?.[1];

    // Initializing state
    // const [file, setFile] = useState(null);
    const [inputValues, setInputValues] = useState("");
    const [selectedStatus, setSelectedStatus] = useState([]);
    let [token] = useState(localStorage.getItem("token"));
    
    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };

    const navigate = useNavigate();

    useEffect(() => {
        const fetchbatch = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/batch/${batchId}`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch quiz');
                }
                const data = await response.json();
                console.log("abbas",data)
                // const status = data.data.status;
                // console.log("abbas1",status);
                // const namelist = [];
                // if(status == 0){
                //     namelist.push({ value: status, label: 'Inactive' },);
                // }
                // else{
                //     namelist.push({ value: status, label: 'Active' },);
                // }

                // for (let i = 0; i < rnames.length; i++) {
                //   const name = rnames[i];
                //   console.log(name);
                //   const id = rid[i]; // Access the "name" property
                //   namelist.push({ value: id, label: name },);
                // }
                // console.log(namelist);
                // setSelectedStatus(namelist);
                setInputValues(data.data);
                // setFile(data.data.logo);
                localStorage.setItem("quizData", JSON.stringify(data));

            } catch (error) {
                console.error(error);
            }
        };

        if (batchId) {
            fetchbatch();
        }
    }, [batchId]);
    // console.log("quiz in a state:", data);
    const handleBatchSelectChange = (selectedOption) => {
        setInputValues({
          ...inputValues,
          name: selectedOption.value
        });
      };
      
      const handleStatusSelectChange = (selectedOption) => {
        setInputValues({
          ...inputValues,
          status: selectedOption.value
        });
      };
    
         const handleInputChange = (e) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('id', batchId);
        formData.append('center_id', localStorage.getItem('center_id'));
        formData.append('name', inputValues.name);
        formData.append('status', parseInt(inputValues.status));
        console.log(formData);
        // Send formData to the server using an HTTP request to update
        fetch(`http://127.0.0.1:5000/upd_batch/${batchId}`, {
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
                navigate(`/batch`);
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
                                    {nbatchInputs.map((input) => (
                                        <div className="formInput" key={input.id}>
                                            <label>{input.label}</label>
                                            {input.fieldName === "name" ? (
                                                <Select
                                                options={BatchOptions}
                                                name={input.fieldName}
                                                onChange={handleBatchSelectChange}
                                                required
                                                />
                                            ) :input.fieldName === "status" ? (
                                                <Select
                                                options={statusOptions}
                                                name={input.fieldName}
                                                // value={selectedStatus}
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
                                        // onClick={() => navigate(`/batch`)}
                                        >
                                            Update
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            style={{ float: "right" }}
                                            onClick={() => navigate(`/batch`)}
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

export default BatchUpdate;