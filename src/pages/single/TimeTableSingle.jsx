import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link } from "react-router-dom";

const TimeTableSingle = () => {
    // Extracting timetableId using regular expressions
    const location = useLocation();
    // const timetableId = location.pathname.match(/\/class\/(\d+)/);
    const timetableId = location.pathname.match(/\/time-table\/(\d+)/)?.[1];

    const [timetable, setTimetable] = useState(null);
    let [token] = useState(localStorage.getItem("token"));

    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };


    const fetchTimeTable = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/timetable/${timetableId}`);
            // if (!response.ok) {
            //     throw new Error('Failed to fetch class');
            // }
            const data = await response.json();
            setTimetable(data);
            localStorage.setItem("lformData", JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (timetableId) {
            fetchTimeTable();
        }
    }, [timetableId]);

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
                                
                                <h1 className="title">Slot Details</h1>
                                    <div className="details">
                                        <h1 className="itemTitle">{timetable?.data.day}</h1>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Id: </span>
                                            <span className="itemValue">{timetable?.data.id}</span>
                                        </div> */}
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Center Id: </span>
                                            <span className="itemValue">{timetable?.data.center_id}</span>
                                        </div> */}
                                        <div className="detailItem">
                                            <span className="itemKey">Teacher: </span>
                                            <span className="itemValue">{timetable?.data.user_names}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Subject: </span>
                                            <span className="itemValue">{timetable?.data.subject_names}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Class: </span>
                                            <span className="itemValue">{timetable?.data.class_names}</span>
                                        </div>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Time: </span>
                                            <span className="itemValue">{timetable?.data.time}</span>
                                        </div> */}
                                        <div className="detailItem">
                                            <span className="itemKey">Start Time: </span>
                                            <span className="itemValue">{timetable?.data.start_slot_time}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">End Time: </span>
                                            <span className="itemValue">{timetable?.data.end_slot_time}</span>
                                        </div>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Status: </span>
                                            <span className="itemValue">{timetable?.data.status}</span>
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

export default TimeTableSingle;