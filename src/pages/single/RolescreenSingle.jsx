import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link } from "react-router-dom";

const RolescreenSingle = () => {
    // Extracting rolescreenId using regular expressions
    const location = useLocation();
    // const rolescreenId = location.pathname.match(/\/rscreen\/(\d+)/);
    const rolescreenId = location.pathname.match(/\/role-screen\/(\d+)/)?.[1];

    const [rscreen, setRolescreen] = useState(null);
    let [token] = useState(localStorage.getItem("token"));

    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };


    const fetchRolescreen = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/rscreen/${rolescreenId}`);
            // if (!response.ok) {
            //     throw new Error('Failed to fetch User');
            // }
            const data = await response.json();
            setRolescreen(data);
            localStorage.setItem("UserData", JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (rolescreenId) {
            fetchRolescreen();
        }
    }, [rolescreenId]);

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
                              
                                <h1 className="title">Role Screen Information</h1>
                                    <div className="details">
                                        {/* <h1 className="itemTitle">{rscreen?.data.name}</h1> */}
                                        <div className="detailItem">
                                            <span className="itemKey">Id: </span>
                                            <span className="itemValue">{rscreen?.data.id}</span>
                                        </div>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Center Id: </span>
                                            <span className="itemValue">{rscreen?.data.center_id}</span>
                                        </div> */}
                                        <div className="detailItem">
                                            <span className="itemKey">Screen Name: </span>
                                            <span className="itemValue">{rscreen?.data.name}</span>
                                        </div>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Status: </span>
                                            <span className="itemValue">{rscreen?.data.status}</span>
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

export default RolescreenSingle;