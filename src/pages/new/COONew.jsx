import React, { useState,useEffect } from 'react';
import Select from 'react-select';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { cooInputsn } from "../../formSource";
import { useNavigate } from 'react-router-dom';


const COONew = ({ title }) => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({});
  const [notification, setNotification] = useState("");
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [options, setOptions] = useState([]);
  const [roptions, setRoptions] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([
    // Pre-select the "COO" role here
    { value: '2', label: 'COO' },
  ]);

  let [token] = useState(localStorage.getItem("token"));

  const redirectToLogin = () => {
    alert("Please Login first, then you can access this page...");
    window.location.href = '/'; // Replace "/login" with the actual login page path
  };

  const handleInputChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    });
  };

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
  
  const handleSubmit = async (e) => {
    e.preventDefault();    

    const roleValues = selectedRoles.map((option) => option.value);
        const formData = new FormData();
        formData.append("center_id",inputValues.center_id);
        formData.append("name", inputValues.name);
        formData.append("email", inputValues.email);
        formData.append("phone_no", inputValues.phone_no);
        formData.append("password", inputValues.password);
        formData.append("role_id", [roleValues]);
        // formData.append("logo", file); // Append the file to FormData
    
        try {
            // Send formData to the server using an HTTP request with multipart/form-data
            const response = await fetch("http://127.0.0.1:5000/add_user", {
                method: "POST",
                body: formData, // Use formData here with multipart/form-data
            });
    
            const data = await response.json();
            console.log("Response from API", data);
    
            // Store formData in local storage
            localStorage.setItem("formData", JSON.stringify(formData));
    
            // Reset the form
            // setFile(""); // Clear the file
            setInputValues({});
            showNotification("COO has been added successfully!");
            navigate('/coo');
        } catch (error) {
          console.log(error);
        }
    };

    const showNotification = (message) => {
      setNotification(message);
      setIsNotificationVisible(true);
  
      setTimeout(() => {
        setIsNotificationVisible(false);
        setNotification("");
      }, 3000);
    };
  
    return (
      <>
        {!token && redirectToLogin()}
        {token && (
          <div className="new">
            <Sidebar />
            <div className="newContainer">
              <Navbar />
              <div className="top">
                <h1>{title}</h1>
              </div>
              <div className="bottom">
                <div className="right">
                  <form onSubmit={handleSubmit}>
                    {cooInputsn.map((input) => (
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
                          ) : (
                          <input
                            type={input.type}
                            placeholder={input.placeholder}
                            name={input.fieldName}
                            onChange={handleInputChange}
                            required={input.fieldName !== "status"}
                          />
                        )}
                      </div>
                    ))}
  
                    <div style={{ clear: "both" }} className="formSubmit">
                      <button type="submit" style={{ float: "right" }}>Send</button>
                    </div>
                  </form>
                  {isNotificationVisible && (
                    <div className="notification">
                      {notification}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default COONew;