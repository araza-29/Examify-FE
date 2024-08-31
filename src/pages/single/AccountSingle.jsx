import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

const AccountSingle = () => {
    // Extracting accountID using regular expressions
    const location = useLocation();
    // const accountID = location.pathname.match(/\/account\/(\d+)/);
    const accountID = location.pathname.match(/\/account\/(\d+)/)?.[1];

    const [account, setAccount] = useState(null);
    let [token] = useState(localStorage.getItem("token"));

    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };


    const fetchAccount = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/account/${accountID}`);
            // if (!response.ok) {
            //     throw new Error('Failed to fetch account');
            // }
            const data = await response.json();
            setAccount(data);
            localStorage.setItem("accountData", JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (accountID) {
            fetchAccount();
        }
    }, [accountID]);

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
                                <h1 className="title">account Information</h1>
                                    <div className="details">
                                        <h1 className="itemTitle">{account?.data.name}</h1>
                                        <div className="detailItem">
                                            <span className="itemKey">Id: </span>
                                            <span className="itemValue">{account?.data.id}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Center Id: </span>
                                            <span className="itemValue">{account?.data.center_id}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">User Id: </span>
                                            <span className="itemValue">{account?.data.user_id}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Description: </span>
                                            <span className="itemValue">{account?.data.description}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Bank Id: </span>
                                            <span className="itemValue">{account?.data.bank_id}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">amount: </span>
                                            <span className="itemValue">{account?.data.amount}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Transaction Id: </span>
                                            <span className="itemValue">{account?.data.transaction_id}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Transaction Type: </span>
                                            <span className="itemValue">{account?.data.transaction_type}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Status: </span>
                                            <span className="itemValue">{account?.data.status}</span>
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

export default AccountSingle;