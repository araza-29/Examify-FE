import "./update.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Select from 'react-select';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { roleInputs } from "../../formSource";

const statusOptions = [
    { value: 1, label: 'Active' },
    { value: 0, label: 'Inactive' },
  ];
const  RoleUpdate = ({ title }) => {

    // Extracting roleId using regular expressions
    const location = useLocation();
    const roleId = location.pathname.match(/\/update-role\/(\d+)/)?.[1];
    const [selectedSubject, setSelectedSubject] = useState([]);
    const [subjectoptions, setSubjectoptions] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const center_id = localStorage.getItem('center_id');
    // Initializing state
    // const [file, setFile] = useState(null);
    const [inputValues, setInputValues] = useState("");
    let [token] = useState(localStorage.getItem("token"));
    
    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };

    const navigate = useNavigate();

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/role/${roleId}`, {
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
                const snames = data.data.screen_names.split(',');
                const sid = data.data.screen_id.split(',');
                // console.log("abbas1",abbas);
                const namelist = [];
                for (let i = 0; i < snames.length; i++) {
                  const name = snames[i];
                  console.log(name);
                  const id = sid[i]; // Access the "name" property
                  namelist.push({ value: id, label: name },);
                }
                setSelectedSubject(namelist);
                console.log("abbas",data)
                setInputValues(data.data);
                // setFile(data.data.logo);
                localStorage.setItem("quizData", JSON.stringify(data));

            } catch (error) {
                console.error(error);
            }
        };

        if (roleId) {
            fetchRole();
        }
    }, [roleId]);
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
          const response = await fetch(`http://127.0.0.1:5000/rscreen_ids/${center_id}`);
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


      const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        const UserValues = selectedSubject.map((option) => option.value);
        formData.append("center_id",localStorage.getItem('center_id'));
        formData.append("name", inputValues.name);
        formData.append("screen_id", UserValues);
        formData.append('status', parseInt(inputValues.status));
        console.log(formData);


        // Send formData to the server using an HTTP request to update
        fetch(`http://127.0.0.1:5000/upd_role/${roleId}`, {
            method: "PUT",
            body: formData, // Pass the object as the body
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("Response from API", data);
                // Navigate to the desired page after API response
                navigate(`/role`);
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
                                    {roleInputs.map((input) => (
                                        <div className="formInput" key={input.id}>
                                            <label>{input.label}</label>
                                            {input.fieldName === "screen_id" ? (
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
                                            ): (<input
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
                                            onClick={() => navigate(`/role`)}
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

export default RoleUpdate;