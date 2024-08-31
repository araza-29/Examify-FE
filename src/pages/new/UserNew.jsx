import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { cooInputsn } from "../../formSource";
import { useNavigate } from 'react-router-dom';

const UserNew = ({ title }) => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({});
  const [notification, setNotification] = useState("");
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [options, setOptions] = useState([]);
  const [roptions, setRoptions] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const token = localStorage.getItem("token");
  const slug = localStorage.getItem("slugs");
  const UserNewSlug = "User-New";
  const Checking = slug.includes(UserNewSlug);

  const redirectToLogin = () => {
    alert("Please Login first, then you can access this page...");
    window.location.href = '/'; // Redirect to login page
  };
  const redirectToLoginduetonotaccess = () => {
    // alert("You can't this page......");
    window.location.href = '/'; // Redirect to login page
  };

  useEffect(() => {
    center_name();
    roles();
  }, []);

  const roles = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/role_ids");
      if (!response.ok) {
        throw new Error("Failed to fetch data from the API");
      }
      const data = await response.json();
      const namelist = data.data.map(({ id, name }) => ({ value: id, label: name }));
      setRoptions(namelist);
    } catch (error) {
      console.error("Error fetching roles data:", error);
    }
  };

  const center_name = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/center_id");
      if (!response.ok) {
        throw new Error("Failed to fetch data from the API");
      }
      const data = await response.json();
      const namelist = data.data.map(({ id, name }) => ({ value: id, label: name }));
      setOptions(namelist);
    } catch (error) {
      console.error("Error fetching center data:", error);
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const roleValues = selectedRoles.map((option) => option.value);
        const formData = new FormData();
        formData.append("center_id",localStorage.getItem('center_id'));
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
            showNotification("User has been added successfully!");
            navigate('/user');
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
        {Checking ? (
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
                                isMulti
                                value={selectedRoles}
                                onChange={handleRoleSelectChange}
                                required
                              />
                            ) : input.fieldName === "center_id" ? (
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
        ) : (
          // Redirecting to login page when Checking is false
          redirectToLoginduetonotaccess()
        )}
      </>
    );
  };
  
  export default UserNew;