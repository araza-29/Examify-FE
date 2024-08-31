import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link } from "react-router-dom";

const COOSingle = () => {
    // Extracting cooId using regular expressions
    const location = useLocation();
    // const cooId = location.pathname.match(/\/coo\/(\d+)/);
    const cooId = location.pathname.match(/\/coo\/(\d+)/)?.[1];

    const [coo, setCoo] = useState(null);
    let [token] = useState(localStorage.getItem("token"));

    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };


    const fetchCoo = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/user/${cooId}`);
            // if (!response.ok) {
            //     throw new Error('Failed to fetch User');
            // }
            const data = await response.json();
            setCoo(data);
            localStorage.setItem("UserData", JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (cooId) {
            fetchCoo();
        }
    }, [cooId]);

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
                                
                                <h1 className="title">COO Information</h1>
                                    <div className="details">
                                        {/* <h1 className="itemTitle">{coo?.data.name}</h1> */}
                                        <div className="detailItem">
                                            <span className="itemKey">Id: </span>
                                            <span className="itemValue">{coo?.data.id}</span>
                                        </div>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Center Id: </span>
                                            <span className="itemValue">{coo?.data.center_id}</span>
                                        </div> */}
                                        <div className="detailItem">
                                            <span className="itemKey">Name: </span>
                                            <span className="itemValue">{coo?.data.name}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Email: </span>
                                            <span className="itemValue">{coo?.data.email}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Phone Number: </span>
                                            <span className="itemValue">{coo?.data.phone_no}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Role Id: </span>
                                            <span className="itemValue">{coo?.data.role_names}</span>
                                        </div>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Status: </span>
                                            <span className="itemValue">{coo?.data.status}</span>
                                        </div> */}
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

export default COOSingle;