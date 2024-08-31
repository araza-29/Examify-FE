import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link } from "react-router-dom";

const ExpenseSingle = () => {
    // Extracting expenseID using regular expressions
    const location = useLocation();
    // const expenseID = location.pathname.match(/\/expense\/(\d+)/);
    const expenseID = location.pathname.match(/\/expense\/(\d+)/)?.[1];

    const [expense, setExpense] = useState(null);
    let [token] = useState(localStorage.getItem("token"));

    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };


    const fetchAccount = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/expense/${expenseID}`);
            // if (!response.ok) {
            //     throw new Error('Failed to fetch expense');
            // }
            const data = await response.json();
            console.log(data);
            setExpense(data);
            localStorage.setItem("accountData", JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (expenseID) {
            fetchAccount();
        }
    }, [expenseID]);

    return (
        <>
            {!token && redirectToLogin()}
            {token && (
                <div className="single">
                    <Sidebar />
                    <div className="singleContainer">
                        <Navbar />
                        <div className="top">
                            <div className="left">
                                <h1 className="title">expense Info</h1>
                                    <div className="details">
                                        {/* <h1 className="itemTitle">{expense?.data.name}</h1> */}
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Id: </span>
                                            <span className="itemValue">{expense?.data.id}</span>
                                        </div> */}
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Center Id: </span>
                                            <span className="itemValue">{expense?.data.center_id}</span>
                                        </div> */}
                                        <div className="detailItem">
                                            <span className="itemKey">User: </span>
                                            <span className="itemValue">{expense?.data.user_names}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Description: </span>
                                            <span className="itemValue">{expense?.data.description}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Transaction Type: </span>
                                            <span className="itemValue">{expense?.data.transaction_names}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">amount: </span>
                                            <span className="itemValue">{expense?.data.amount}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Balance: </span>
                                            <span className="itemValue">{expense?.data.balances}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="right">
                    <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
                </div> */}
                        </div>
                        {/* <div className="bottom">
                <h1 className="title">Last Transactions</h1>
                <List />
                </div> */}
                    </div >
                )
            }
        </>
    );
};

export default ExpenseSingle;