import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import EventBusyIcon from '@mui/icons-material/EventBusy'; // Absent Form
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // Half Leave Form
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Late Form
import { Link } from "react-router-dom";

const StudentSingle = () => {
    // Extracting studentId using regular expressions
    const location = useLocation();
    // const studentId = location.pathname.match(/\/student\/(\d+)/);
    const studentId = location.pathname.match(/\/student\/(\d+)/)?.[1];

    const [student, setStudent] = useState(null);
    let [token] = useState(localStorage.getItem("token"));
    localStorage.setItem('student_id',studentId)
    localStorage.setItem('student_name',student?.data.name)
    const slugs = localStorage.getItem("slugs");
    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };


    const fetchstudent = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/student/${studentId}`);
            // if (!response.ok) {
            //     throw new Error('Failed to fetch student');
            // }
            const data = await response.json();
            setStudent(data);
            localStorage.setItem("studentData", JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    };
    const AbsentformLinkString = "Absentform-Listing";
    const LateformLinkString = "Lateform-Listing";
    const LeaveformLinkString = "Leaveform-Listing";
    const HalfleaveformLinkString = "Halfleaveform-Listing";

    useEffect(() => {
        if (studentId) {
            fetchstudent();
        }
    }, [studentId]);

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
                                
                                <h1 className="title">Student Info</h1>
                                <div className="item">
                                    <img src={
                                        student?.data.image
                                    }
                                        alt=""
                                        className="itemImg"
                                    />
                                <div className="item">
                                    <img src={
                                        student?.data.bform
                                    }
                                        alt=""
                                        className="itemImg"
                                    />
                                <div className="item">
                                    <img src={
                                        student?.data.marksheet
                                    }
                                        alt=""
                                        className="itemImg"
                                    />
                                    <div className="details">
                                        <h1 className="itemTitle">{student?.data.name}</h1>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Id: </span>
                                            <span className="itemValue">{student?.data.id}</span>
                                        </div> */}
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Name: </span>
                                            <span className="itemValue">{student?.data.name}</span>
                                        </div> */}
                                        <div className="detailItem">
                                            <span className="itemKey">Phone Number: </span>
                                            <span className="itemValue">{student?.data.phone}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Father Name: </span>
                                            <span className="itemValue">{student?.data.father_name}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Father Phone Number: </span>
                                            <span className="itemValue">{student?.data.father_phone}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Email: </span>
                                            <span className="itemValue">{student?.data.email}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Address: </span>
                                            <span className="itemValue">{student?.data.address}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Roll Number: </span>
                                            <span className="itemValue">{student?.data.roll_no}</span>
                                        </div>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Center Id: </span>
                                            <span className="itemValue">{student?.data.center_id}</span>
                                        </div> */}
                                        <div className="detailItem">
                                            <span className="itemKey">Batch: </span>
                                            <span className="itemValue">{student?.data.batch_names}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Class: </span>
                                            <span className="itemValue">{student?.data.class_names}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Group: </span>
                                            <span className="itemValue">{student?.data.group_names}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">About Student: </span>
                                            <span className="itemValue">{student?.data.description}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Reference Name: </span>
                                            <span className="itemValue">{student?.data.ref_name}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Reference Phone Number: </span>
                                            <span className="itemValue">{student?.data.ref_phone_no}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Last Class Attended: </span>
                                            <span className="itemValue">{student?.data.last_class}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Last Grade: </span>
                                            <span className="itemValue">{student?.data.last_grade}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Last Percentage: </span>
                                            <span className="itemValue">{student?.data.percentage}</span>
                                        </div>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Status: </span>
                                            <span className="itemValue">{student?.data.status}</span>
                                        </div> */}
                                        </div>    
                                    </div>
                                </div>
                            </div>
                            <div className="aformButton">
                            {slugs && slugs.includes(AbsentformLinkString) && (
                                    <Link to={`/student/absent-form`} className=" link">
                                    <EventBusyIcon className="icon" />
                                       Absent Form
                                    </Link>)}
                                </div>
                                <div className="lformButton">
                                {slugs && slugs.includes(LateformLinkString) && (
                                    <Link to={`/student/late-form`} className=" link">
                                    <CalendarTodayIcon className="icon" />
                                       Late Form
                                    </Link>)}
                                </div>
                                <div className="hlformButton">
                                {slugs && slugs.includes(HalfleaveformLinkString) && (
                                    <Link to={`/student/half-leave-form`} className=" link">
                                    <AccessTimeIcon className="icon" />
                                       Half Leave Form
                                    </Link>)}
                                </div>
                                <div className="leformButton">
                                {slugs && slugs.includes(LeaveformLinkString) && (
                                    <Link to={`/student/leave-form`} className=" link">
                                    <AccessTimeIcon className="icon" />
                                       Leave Form
                                    </Link>)}
                                </div>
                                <div className="feesButton">
                            {/* {slugs && slugs.includes(AbsentformLinkString) && ( */}
                                    <Link to={`/student/fees-form`} className=" link">
                                    <EventBusyIcon className="icon" />
                                       Fees Form
                                    </Link>
                                    {/* )} */}
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
                    </div >
                    </div >  
                )
            }
        </>
    );
};

export default StudentSingle;