import "./update.scss";
import Select from 'react-select';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { expenseInputs } from "../../formSource";

const statusOptions = [
  { value: 1, label: 'Active' },
  { value: 0, label: 'Inactive' },
];
const classOptions = [
    { value: 'IX', label: 'IX' },
    { value: 'X', label: 'X' },
    { value: 'XI', label: 'XI' },
    { value: 'XII', label: 'XII' },
  ];


const  ExpenseUpdate = ({ title }) => {

    // Extracting expenseId using regular expressions
    const location = useLocation();
    const expenseId = location.pathname.match(/\/update-expense\/(\d+)/)?.[1];
    const center_id = localStorage.getItem('center_id');
    // Initializing state
    // const [file, setFile] = useState(null);
    const [inputValues, setInputValues] = useState("");
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedName, setSelectedName] = useState(null);
    const [selectedUser, setSelectedUser] = useState([]);
    const [useroptions, setUseroptions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState([]);
    const [transactionoptions, setTransactionoptions] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState([]);
    const [accountoptions, setAccountoptions] = useState([]);
    let [token] = useState(localStorage.getItem("token"));
    
    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };

    const navigate = useNavigate();

    useEffect(() => {
        const fetchExpense = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/expense/${expenseId}`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch quiz');
                }
                const data = await response.json();
                console.log("abbas",data)
                const snames = data.data.user_names
                const sid = data.data.user_id
                // console.log("abbas1",abbas);
                const namelist = [];
                  const name = snames;
                  console.log(name);
                  const id = sid; // Access the "name" property
                  namelist.push({ value: id, label: name },);
                  const transaction = data.data.transaction_names
                  const tid = data.data.transaction_id
                  // console.log("abbas1",abbas);
                  const namelist_t = [];
                    namelist_t.push({ value: tid, label: transaction },);
                    const account = data.data.account_names
                    const aid = data.data.account_id
                    // console.log("abbas1",abbas);
                    const namelist_a = [];
                      namelist_a.push({ value: aid, label: account },);
                const status = data.data.status
                if (status == 1){
                    setSelectedStatus({ value: status, label: 'Active' });
                }
                else{
                    setSelectedStatus({ value: status, label: 'Inactive' });
                }
                setSelectedUser(namelist);
                setSelectedTransaction(namelist_t);
                setSelectedAccount(namelist_a);
                setInputValues(data.data);
                // setFile(data.data.logo);
                localStorage.setItem("quizData", JSON.stringify(data));

            } catch (error) {
                console.error(error);
            }
        };

        if (expenseId) {
            fetchExpense();
        }
    }, [expenseId]);
    // console.log("quiz in a state:", data);

    const handleStatusSelectChange = (selectedOption) => {
        setSelectedStatus(selectedOption);
        setInputValues({
          ...inputValues,
          status: selectedOption.value,
        });
      };
      
    
         const handleInputChange = (e) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        });
    };

    const handleUserSelectChange = (selectedOption) => {
        setSelectedUser(selectedOption);
        setInputValues({
          ...inputValues,
          user_id: selectedOption.value,
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

      const handleTransactionSelectChange = (selectedOption) => {
        setSelectedTransaction(selectedOption);
        setInputValues({
          ...inputValues,
          transaction_id: selectedOption.value,
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

      const handleAccountSelectChange = (selectedOption) => {
        setSelectedAccount(selectedOption);
        setInputValues({
          ...inputValues,
          account_id: selectedOption.value,
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

console.log(selectedAccount);
    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('id', expenseId);
        formData.append('center_id', localStorage.getItem('center_id'));
        formData.append('expense_id', inputValues.expense_id);
        formData.append('transaction_id', inputValues.transaction_id);
        formData.append('account_id', inputValues.account_id);
        formData.append('amount', inputValues.amount);
        formData.append('description', inputValues.description);
        formData.append('user_id', inputValues.user_id);
        formData.append('status', parseInt(inputValues.status));
        console.log(formData);


        // Send formData to the server using an HTTP request to update
        fetch(`http://127.0.0.1:5000/upd_expense/${expenseId}`, {
            method: "PUT",
            body: formData, // Pass the object as the body
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("Response from API", data);
                // Navigate to the desired page after API response
                navigate(`/expense`);
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
                                    {expenseInputs.map((input) => (
                                        <div className="formInput" key={input.id}>
                                            <label>{input.label}</label>
                                            {input.fieldName === "transaction_id" ? (
                                                <Select
                                                options={transactionoptions}
                                                name={input.fieldName}
                                                value={selectedTransaction}
                                                onChange={handleTransactionSelectChange}
                                                required
                                                />
                                            ):input.fieldName === "user_id" ? (
                                                <Select
                                                options={useroptions}
                                                name={input.fieldName}
                                                value={selectedUser}
                                                onChange={handleUserSelectChange}
                                                required
                                                />
                                            ):input.fieldName === "account_id" ? (
                                                <Select
                                                options={accountoptions}
                                                name={input.fieldName}
                                                value={selectedAccount}
                                                onChange={handleAccountSelectChange}
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
                                        // onClick={() => navigate(`/class/${expenseId}`)}
                                        >
                                            Update
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            style={{ float: "right" }}
                                            onClick={() => navigate(`/expense`)}
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

export default ExpenseUpdate;