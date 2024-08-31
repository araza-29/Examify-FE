import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Select from 'react-select';
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from "react";
import { expenseInputs } from "../../formSource";



const ExpenseNew = ({ title }) => {
  const navigate = useNavigate();
    // const [file, setFile] = useState("");
    const [inputValues, setInputValues] = useState({});
    const [notification, setNotification] = useState("");
    const [accountoptions, setAccountoptions] = useState([]);
    const [transactionoptions, setTransactionoptions] = useState([]);
    const [useroptions, setUseroptions] = useState([]);
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const center_id = localStorage.getItem('center_id');
    let [token] = useState(localStorage.getItem("token"));

    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };

    const handlePaperSelectChange = (selectedOption) => {
        setInputValues({
          ...inputValues,
          type: selectedOption.value
        });
      };

      const handleCheckSelectChange = (selectedOption) => {
        setInputValues({
          ...inputValues,
          checking_status: selectedOption.value
        });
      };

    const handleAccountSelectChange = (selectedOption) => {
        setInputValues({
          ...inputValues,
          account_id: selectedOption.value
        });
      };
      useEffect(() => {
        account_name();
      }, []); // Empty dependency array means it runs once when the component mounts

      const account_name = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:5000/account_ids/${center_id}`);
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
          setAccountoptions(namelist);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    

      const handleTransactionSelectChange = (selectedOption) => {
        setInputValues({
          ...inputValues,
          transaction_id: selectedOption.value
        });
      };
      useEffect(() => {
        transaction_name();
      }, []); // Empty dependency array means it runs once when the component mounts

      const transaction_name = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:5000/transaction_ids`);
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
          setTransactionoptions(namelist);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      const handleUserSelectChange = (selectedOption) => {
        setInputValues({
          ...inputValues,
          user_id: selectedOption.value
        });
      };
      useEffect(() => {
        user_name();
      }, []); // Empty dependency array means it runs once when the component mounts

      const user_name = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:5000/user_ids/${center_id}`);
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
          setUseroptions(namelist);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }


    const handleInputChange = (e) => {
        console.log(e.target.name);
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        });
        console.log("inputValues",inputValues)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("center_id", localStorage.getItem('center_id'));
        formData.append("account_id", inputValues.account_id);
        formData.append("transaction_id", inputValues.transaction_id);
        formData.append("description", inputValues.description);
        formData.append("amount", inputValues.amount);
        formData.append("user_id", inputValues.user_id);
        formData.append("status", inputValues.status || 1);
        // formData.append("logo", file); // Append the file to FormData
    
        try {
            // Send formData to the server using an HTTP request with multipart/form-data
            const response = await fetch("http://127.0.0.1:5000/add_expense", {
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
            showNotification("Examination has been added successfully!");
            navigate('/expense');
        } catch (error) {
          console.log(error);
        }
    };
    const showNotification = (message) => {
        setNotification(message);
        setIsNotificationVisible(true);
      
        // Automatically hide the notification after a certain time (e.g., 3 seconds)
        setTimeout(() => {
          setIsNotificationVisible(false);
          setNotification("");
        }, 3000); // Adjust the time as needed
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
                            {/* <div className="left">
                                <img
                                    src={
                                        file
                                    }
                                    alt=""
                                />
                            </div> */}
                            <div className="right">
                                <form onSubmit={handleSubmit}>
                                    {/* <div className="formInput">
                                        <label htmlFor="file">
                                            Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                        </label>
                                        <input
                                            type="file"
                                            id="file"
                                            onChange={(e) => setFile(e.target.files[0])}
                                            style={{ display: "none" }}
                                        />
                                    </div> */}
                                    {expenseInputs.map((input) => (
                                        <div className="formInput" key={input.id}>
                                           {input.fieldName === "status" ? null : (
            <>
                                            <label>{input.label}</label>
                                            { input.fieldName === "account_id" ? (
                                                <Select
                                                options={accountoptions}
                                                name={input.fieldName}
                                                onChange={handleAccountSelectChange}
                                                required
                                                />
                                            ) : input.fieldName === "transaction_id" ? (
                                                <Select
                                                options={transactionoptions}
                                                name={input.fieldName}
                                                onChange={handleTransactionSelectChange}
                                                required
                                                />
                                            ) : input.fieldName === "user_id" ? (
                                                <Select
                                                options={useroptions}
                                                name={input.fieldName}
                                                onChange={handleUserSelectChange}
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
                                            </>
                                           )}
                                        </div>
                                    ))}
                                    <div style={{ clear: "both" }} className="formSubmit">
                                        <button type="submit" style={{ float: "right" }} >Send</button>
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
                )
            }
        </>
    );
};

export default ExpenseNew;
