import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link } from "react-router-dom";

const TeacherAttendanceSingle = () => {
    // Extracting teacher_attendanceId using regular expressions
    const location = useLocation();
    // const teacher_attendanceId = location.pathname.match(/\/class\/(\d+)/);
    const teacher_attendanceId = location.pathname.match(/\/teacher-attendance\/(\d+)/)?.[1];

    const [teacher_attendance, setTeacher_attendance] = useState(null);
    let [token] = useState(localStorage.getItem("token"));

    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };


    const fetchteacher_attendance = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/teacher_attendance/${teacher_attendanceId}`);
            // if (!response.ok) {
            //     throw new Error('Failed to fetch class');
            // }
            const data = await response.json();
            setTeacher_attendance(data);
            localStorage.setItem("lformData", JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (teacher_attendanceId) {
            fetchteacher_attendance();
        }
    }, [teacher_attendanceId]);

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
                            
                                <h1 className="title">Teacher Slot Details</h1>
                                    <div className="details">
                                        <h1 className="itemTitle">{teacher_attendance?.data.date}</h1>
                                        <div className="detailItem">
                                            <span className="itemKey">Day: </span>
                                            <span className="itemValue">{teacher_attendance?.data.day}</span>
                                        </div>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Center Id: </span>
                                            <span className="itemValue">{teacher_attendance?.data.center_id}</span>
                                        </div> */}
                                        <div className="detailItem">
                                            <span className="itemKey">Teacher: </span>
                                            <span className="itemValue">{teacher_attendance?.data.timetable_user_name}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Subject: </span>
                                            <span className="itemValue">{teacher_attendance?.data.subject_name}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Class: </span>
                                            <span className="itemValue">{teacher_attendance?.data.class_name}</span>
                                        </div>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Time: </span>
                                            <span className="itemValue">{teacher_attendance?.data.time}</span>
                                        </div> */}
                                        <div className="detailItem">
                                            <span className="itemKey">Start Time: </span>
                                            <span className="itemValue">{teacher_attendance?.data.start_slot_time}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">End Time: </span>
                                            <span className="itemValue">{teacher_attendance?.data.end_slot_time}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Teacher Status: </span>
                                            <span className="itemValue">{teacher_attendance?.data.teacher_status}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Replaced Teacher: </span>
                                            <span className="itemValue">{teacher_attendance?.data.user_rep_name}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Replaced Subject: </span>
                                            <span className="itemValue">{teacher_attendance?.data.subject_rep_name}</span>
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

export default TeacherAttendanceSingle;