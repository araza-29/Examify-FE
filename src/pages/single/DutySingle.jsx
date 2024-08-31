import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link } from "react-router-dom";

const DutySingle = () => {
    // Extracting dutyId using regular expressions
    const location = useLocation();
    // const dutyId = location.pathname.match(/\/class\/(\d+)/);
    const dutyId = location.pathname.match(/\/duty\/(\d+)/)?.[1];

    const [duty, setDuty] = useState(null);
    let [token] = useState(localStorage.getItem("token"));

    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };


    const fetchClass = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/duty/${dutyId}`);
            // if (!response.ok) {
            //     throw new Error('Failed to fetch class');
            // }
            const data = await response.json();
            setDuty(data);
            localStorage.setItem("dutyData", JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (dutyId) {
            fetchClass();
        }
    }, [dutyId]);

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
                               
                                <h1 className="title">Duty Details</h1>
                                    <div className="details">
                                        {/* <h1 className="itemTitle">{class?.data.name}</h1> */}
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Id: </span>
                                            <span className="itemValue">{duty?.data.id}</span>
                                        </div> */}
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Center Id: </span>
                                            <span className="itemValue">{duty?.data.center_id}</span>
                                        </div> */}
                                        <div className="detailItem">
                                            <span className="itemKey">User: </span>
                                            <span className="itemValue">{duty?.data.user_names}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Job: </span>
                                            <span className="itemValue">{duty?.data.job}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Date: </span>
                                            <span className="itemValue">{duty?.data.date}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Time: </span>
                                            <span className="itemValue">{duty?.data.duty_time}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Description: </span>
                                            <span className="itemValue">{duty?.data.description}</span>
                                        </div>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Status: </span>
                                            <span className="itemValue">{duty?.data.status}</span>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            {/* <div className="right">
                    <Chart aspect={3 / 1} title="class Spending ( Last 6 Months)" />
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

export default DutySingle;