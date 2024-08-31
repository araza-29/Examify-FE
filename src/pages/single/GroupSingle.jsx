import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link } from "react-router-dom";

const GroupSingle = () => {
    // Extracting groupId using regular expressions
    const location = useLocation();
    // const groupId = location.pathname.match(/\/class\/(\d+)/);
    const groupId = location.pathname.match(/\/group\/(\d+)/)?.[1];

    const [group, setGroup] = useState(null);
    let [token] = useState(localStorage.getItem("token"));

    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };


    const fetchClass = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/group/${groupId}`);
            // if (!response.ok) {
            //     throw new Error('Failed to fetch class');
            // }
            const data = await response.json();
            setGroup(data);
            localStorage.setItem("dutyData", JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (groupId) {
            fetchClass();
        }
    }, [groupId]);

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
                                
                                <h1 className="title">Group Details</h1>
                                    <div className="details">
                                        <h1 className="itemTitle">{group?.data.name}</h1>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Id: </span>
                                            <span className="itemValue">{group?.data.id}</span>
                                        </div> */}
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Center Id: </span>
                                            <span className="itemValue">{group?.data.center_id}</span>
                                        </div> */}
                                        <div className="detailItem">
                                            <span className="itemKey">Subjects: </span>
                                            <span className="itemValue">{group?.data.subject_names}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Batch: </span>
                                            <span className="itemValue">{group?.data.batch_names}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Class: </span>
                                            <span className="itemValue">{group?.data.class_names}</span>
                                        </div>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Group Name: </span>
                                            <span className="itemValue">{group?.data.name}</span>
                                        </div> */}
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Status: </span>
                                            <span className="itemValue">{group?.data.status}</span>
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

export default GroupSingle;