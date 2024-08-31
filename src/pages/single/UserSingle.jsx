import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link } from "react-router-dom";

const UserSingle = () => {
    // Extracting userId using regular expressions
    const location = useLocation();
    // const userId = location.pathname.match(/\/user\/(\d+)/);
    const userId = location.pathname.match(/\/user\/(\d+)/)?.[1];

    const [user, setUser] = useState(null);
    let [token] = useState(localStorage.getItem("token"));

    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };


    const fetchUser = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/user/${userId}`);
            // if (!response.ok) {
            //     throw new Error('Failed to fetch User');
            // }
            const data = await response.json();
            setUser(data);
            localStorage.setItem("UserData", JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchUser();
        }
    }, [userId]);

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
                                <h1 className="title">User Information</h1>
                                    <div className="details">
                                        {/* <h1 className="itemTitle">{user?.data.name}</h1> */}
                                        <div className="detailItem">
                                            <span className="itemKey">Id: </span>
                                            <span className="itemValue">{user?.data.id}</span>
                                        </div>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Center Id: </span>
                                            <span className="itemValue">{user?.data.center_id}</span>
                                        </div> */}
                                        <div className="detailItem">
                                            <span className="itemKey">Name: </span>
                                            <span className="itemValue">{user?.data.name}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Email: </span>
                                            <span className="itemValue">{user?.data.email}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Phone Number: </span>
                                            <span className="itemValue">{user?.data.phone_no}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Role: </span>
                                            <span className="itemValue">{user?.data.role_names}</span>
                                        </div>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Status: </span>
                                            <span className="itemValue">{user?.data.status}</span>
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

export default UserSingle;