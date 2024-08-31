import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link } from "react-router-dom";

const LeaveFormSingle = () => {
    // Extracting leaveformId using regular expressions
    const location = useLocation();
    // const leaveformId = location.pathname.match(/\/class\/(\d+)/);
    const leaveformId = location.pathname.match(/\/leave-form\/(\d+)/)?.[1];

    const [leaveform, setleaveform] = useState(null);
    let [token] = useState(localStorage.getItem("token"));

    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };


    const fetchClass = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/student/leave_form/${leaveformId}`);
            // if (!response.ok) {
            //     throw new Error('Failed to fetch class');
            // }
            const data = await response.json();
            setleaveform(data);
            localStorage.setItem("lformData", JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (leaveformId) {
            fetchClass();
        }
    }, [leaveformId]);

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
                                
                                <h1 className="title">Leave Form Details</h1>
                                <div className="item">
                                    leave:
                                    <img src={
                                        leaveform?.data.leave_file
                                    }
                                        alt=""
                                        className="itemImg"
                                    />
                                    <div className="details">
                                        <h1 className="itemTitle">{leaveform?.data.student_names}</h1>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Id: </span>
                                            <span className="itemValue">{leaveform?.data.id}</span>
                                        </div> */}
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Center Id: </span>
                                            <span className="itemValue">{leaveform?.data.center_id}</span>
                                        </div> */}
                                        <div className="detailItem">
                                            <span className="itemKey">User: </span>
                                            <span className="itemValue">{leaveform?.data.user_names}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">From Date: </span>
                                            <span className="itemValue">{leaveform?.data.start_date_time}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">To Date: </span>
                                            <span className="itemValue">{leaveform?.data.end_date_time}</span>
                                        </div>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Time: </span>
                                            <span className="itemValue">{leaveform?.data.time}</span>
                                        </div> */}
                                        <div className="detailItem">
                                            <span className="itemKey">Reason for Leave: </span>
                                            <span className="itemValue">{leaveform?.data.reason}</span>
                                        </div>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Status: </span>
                                            <span className="itemValue">{leaveform?.data.status}</span>
                                        </div> */}
                                    </div>
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

export default LeaveFormSingle;