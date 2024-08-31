import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link } from "react-router-dom";

const RoleSingle = () => {
    // Extracting roleId using regular expressions
    const location = useLocation();
    // const roleId = location.pathname.match(/\/role\/(\d+)/);
    const roleId = location.pathname.match(/\/role\/(\d+)/)?.[1];

    const [role, setRole] = useState(null);
    let [token] = useState(localStorage.getItem("token"));

    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };


    const fetchRole = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/role/${roleId}`);
            // if (!response.ok) {
            //     throw new Error('Failed to fetch role');
            // }
            const data = await response.json();
            setRole(data);
            localStorage.setItem("batchData", JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (roleId) {
            fetchRole();
        }
    }, [roleId]);

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
                               
                                <h1 className="title">User Role Information</h1>
                                    <div className="details">
                                        {/* <h1 className="itemTitle">{role?.data.name}</h1> */}
                                        <div className="detailItem">
                                            <span className="itemKey">Id: </span>
                                            <span className="itemValue">{role?.data.id}</span>
                                        </div>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Center Id: </span>
                                            <span className="itemValue">{role?.data.center_id}</span>
                                        </div> */}
                                        <div className="detailItem">
                                            <span className="itemKey">Name: </span>
                                            <span className="itemValue">{role?.data.name}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Screen: </span>
                                            <span className="itemValue">{role?.data.screen_names}</span>
                                        </div>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Status: </span>
                                            <span className="itemValue">{role?.data.status}</span>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            {/* <div className="right">
                    <Chart aspect={3 / 1} title="role Spending ( Last 6 Months)" />
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

export default RoleSingle;