import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link } from "react-router-dom";

const FeesFormSingle = () => {
    // Extracting feesformId using regular expressions
    const location = useLocation();
    // const feesformId = location.pathname.match(/\/class\/(\d+)/);
    const feesformId = location.pathname.match(/\/fees-form\/(\d+)/)?.[1];

    const [absentform, setAbsentform] = useState(null);
    let [token] = useState(localStorage.getItem("token"));

    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };


    const fetchClass = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/student/feesform/${feesformId}`);
            // if (!response.ok) {
            //     throw new Error('Failed to fetch class');
            // }
            const data = await response.json();
            setAbsentform(data);
            localStorage.setItem("lformData", JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (feesformId) {
            fetchClass();
        }
    }, [feesformId]);

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
                                
                                <h1 className="title">Absent Form Details</h1>
                                <div className="item">
                                    Slip Image:
                                    <img src={
                                        absentform?.data.slip_image
                                    }
                                        alt=""
                                        className="itemImg"
                                    />
                                    <div className="details">
                                        <h1 className="itemTitle">{absentform?.data.student_names}</h1>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Id: </span>
                                            <span className="itemValue">{absentform?.data.id}</span>
                                        </div> */}
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Center Id: </span>
                                            <span className="itemValue">{absentform?.data.center_id}</span>
                                        </div> */}
                                        <div className="detailItem">
                                            <span className="itemKey">User: </span>
                                            <span className="itemValue">{absentform?.data.user_names}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Date: </span>
                                            <span className="itemValue">{absentform?.data.date}</span>
                                        </div>
                            
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Time: </span>
                                            <span className="itemValue">{absentform?.data.time}</span>
                                        </div> */}
                                        <div className="detailItem">
                                            <span className="itemKey">Description About Amount: </span>
                                            <span className="itemValue">{absentform?.data.description}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Amount: </span>
                                            <span className="itemValue">{absentform?.data.amount}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Amount Type: </span>
                                            <span className="itemValue">{absentform?.data.amount_type}</span>
                                        </div>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Status: </span>
                                            <span className="itemValue">{absentform?.data.status}</span>
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

export default FeesFormSingle;