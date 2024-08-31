import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link } from "react-router-dom";

const ExaminationSingle = () => {
    // Extracting examinationId using regular expressions
    const location = useLocation();
    // const examinationId = location.pathname.match(/\/examination\/(\d+)/);
    const examinationId = location.pathname.match(/\/examination\/(\d+)/)?.[1];

    const [examination, setExamination] = useState(null);
    let [token] = useState(localStorage.getItem("token"));

    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };


    const fetchExamination = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/examination/${examinationId}`);
            // if (!response.ok) {
            //     throw new Error('Failed to fetch User');
            // }
            const data = await response.json();
            setExamination(data);
            localStorage.setItem("UserData", JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (examinationId) {
            fetchExamination();
        }
    }, [examinationId]);

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
                               
                                <h1 className="title">Exam Information</h1>
                                <div className="item">
                                    <img src={
                                        examination?.data.file
                                    }
                                        alt=""
                                        className="itemImg"
                                    />
                                    <div className="details">
                                        {/* <h1 className="itemTitle">{examination?.data.name}</h1> */}
                                        <div className="detailItem">
                                            <span className="itemKey">Paper: </span>
                                            <span className="itemValue">{examination?.data.file}</span>
                                        </div>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Center Id: </span>
                                            <span className="itemValue">{examination?.data.center_id}</span>
                                        </div> */}
                                        <div className="detailItem">
                                            <span className="itemKey">Class: </span>
                                            <span className="itemValue">{examination?.data.class_names}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Subject: </span>
                                            <span className="itemValue">{examination?.data.subject_names}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Paper Type: </span>
                                            <span className="itemValue">{examination?.data.type}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Month: </span>
                                            <span className="itemValue">{examination?.data.month}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Date: </span>
                                            <span className="itemValue">{examination?.data.date}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Total Marks: </span>
                                            <span className="itemValue">{examination?.data.total_marks}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Invigilator: </span>
                                            <span className="itemValue">{examination?.data.user_names}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Duration: </span>
                                            <span className="itemValue">{examination?.data.duration}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Scheduled Start Time: </span>
                                            <span className="itemValue">{examination?.data.schedule_start_time}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Scheduled End Time: </span>
                                            <span className="itemValue">{examination?.data.schedule_end_time}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Start Time: </span>
                                            <span className="itemValue">{examination?.data.start_time}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">End Time: </span>
                                            <span className="itemValue">{examination?.data.end_time }</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Checking Status: </span>
                                            <span className="itemValue">{examination?.data.checking_status}</span>
                                        </div>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Status: </span>
                                            <span className="itemValue">{examination?.data.status}</span>
                                        </div> */}
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

export default ExaminationSingle;