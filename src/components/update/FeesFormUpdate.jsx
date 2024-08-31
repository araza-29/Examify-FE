import "./update.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Select from 'react-select';
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { feesformInputs } from "../../formSource";

  const statusOptions = [
      { value: 1, label: 'Active' },
      { value: 0, label: 'Inactive' },
    ];
    const Amount_typeOptions = [
        { value: 'Admission Fees', label: 'Admission Fees' },
        { value: 'Fine', label: 'Fine' },
        { value: 'Examination Board Fees', label: 'Examination Board Fees' },
        { value: 'ATP Admission Fees', label: 'ATP Admission Fees' },
        { value: 'Notes Fees', label: 'Notes Fees' },
      ];
    

const  FeesFormUpdate = ({ title }) => {

    // Extracting feesformId using regular expressions
    const location = useLocation();
    const feesformId = location.pathname.match(/\/update-fees-form\/(\d+)/)?.[1];

    // Initializing state
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [file, setFile] = useState(null);
    const [inputValues, setInputValues] = useState("");
    const [selectedAmount_type, setSelectedAmount_type] = useState([]);
    let [token] = useState(localStorage.getItem("token"));
    
    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };

    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeaveForm = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/student/feesform/${feesformId}`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch quiz');
                }
                const data = await response.json();
                console.log("abbas",data)
                const amount_type = data.data.amount_type
                setSelectedAmount_type({ value: amount_type, label: amount_type });
                setInputValues(data.data);
                setFile(data.data.slip_image);
                const status = data.data.status
                console.log(status);
                if (status == 1){
                    setSelectedStatus({ value: status, label: 'Active' });
                }
                else{
                    setSelectedStatus({ value: status, label: 'Inactive' });
                }
                localStorage.setItem("quizData", JSON.stringify(data));

            } catch (error) {
                console.error(error);
            }
        };

        if (feesformId) {
            fetchLeaveForm();
        }
    }, [feesformId]);
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
      const handleAmount_typeSelectChange = (selectedOption) => {
        setSelectedAmount_type(selectedOption);
        setInputValues({
          ...inputValues,
          amount_type: selectedOption.value,
        });
      };



    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("center_id", localStorage.getItem('center_id'));
        formData.append("student_id", localStorage.getItem('student_id'));
        formData.append("user_id", localStorage.getItem('user_id'));
        formData.append("amount", inputValues.amount);
        formData.append("amount_type", inputValues.amount_type);
        formData.append("description", inputValues.description);
        formData.append("date", inputValues.date);
        formData.append("logo", file);
        formData.append('status', inputValues.status || 1);
        // formData.append("logo", file); // Append the file to FormData
    


        // Send formData to the server using an HTTP request to update
        fetch(`http://127.0.0.1:5000/student/upd_feesform/${feesformId}`, {
            method: "PUT",
            body: formData, // Pass the object as the body
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("Response from API", data);
                // Navigate to the desired page after API response
                navigate(`/student/fees-form`);
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
                                            Slip Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                        </label>
                                        <input
                                            type="file"
                                            id="file"
                                            onChange={(e) => setFile(e.target.files[0])}
                                            style={{ display: "none" }}
                                        />
                                    </div>
                                    {feesformInputs.map((input) => (
                                         <div className="formInput" key={input.id}>
                                         <label>{input.label}</label>
                                         {
                                        input.fieldName === "status" ? (
                                             <Select
                                             options={statusOptions}
                                             name={input.fieldName}
                                             value={selectedStatus}
                                             onChange={handleStatusSelectChange}
                                             required
                                             />
                                         ) :input.fieldName === "amount_type" ? (
                                            <Select
                                            options={Amount_typeOptions}
                                            name={input.fieldName}
                                            value={selectedAmount_type}
                                            onChange={handleAmount_typeSelectChange}
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
                                        // onClick={() => navigate(`/categories/${feesformId}`)}
                                        >
                                            Update
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            style={{ float: "right" }}
                                            onClick={() => navigate(`/student/absent-form`)}
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

export default FeesFormUpdate;