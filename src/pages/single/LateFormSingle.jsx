import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link } from "react-router-dom";

const LateFormSingle = () => {
    // Extracting lformId using regular expressions
    const location = useLocation();
    // const lformId = location.pathname.match(/\/class\/(\d+)/);
    const lformId = location.pathname.match(/\/late-form\/(\d+)/)?.[1];

    const [lform, setlform] = useState(null);
    let [token] = useState(localStorage.getItem("token"));

    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };


    const fetchClass = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/student/lform/${lformId}`);
            // if (!response.ok) {
            //     throw new Error('Failed to fetch class');
            // }
            const data = await response.json();
            setlform(data);
            localStorage.setItem("lformData", JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (lformId) {
            fetchClass();
        }
    }, [lformId]);

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
                             
                                <h1 className="title">Late Form Details</h1>
                                    <div className="details">
                                        <h1 className="itemTitle">{lform?.data.date}</h1>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Id: </span>
                                            <span className="itemValue">{lform?.data.id}</span>
                                        </div> */}
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Center Id: </span>
                                            <span className="itemValue">{lform?.data.center_id}</span>
                                        </div> */}
                                        <div className="detailItem">
                                            <span className="itemKey">User: </span>
                                            <span className="itemValue">{lform?.data.user_names}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Student: </span>
                                            <span className="itemValue">{lform?.data.student_names}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">time: </span>
                                            <span className="itemValue">{lform?.data.time}</span>
                                        </div>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Time: </span>
                                            <span className="itemValue">{lform?.data.time}</span>
                                        </div> */}
                                        <div className="detailItem">
                                            <span className="itemKey">Reason for Late: </span>
                                            <span className="itemValue">{lform?.data.reason}</span>
                                        </div>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Status: </span>
                                            <span className="itemValue">{lform?.data.status}</span>
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

export default LateFormSingle;