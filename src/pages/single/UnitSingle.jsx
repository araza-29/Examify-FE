import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link } from "react-router-dom";

const UnitSingle = () => {
    // Extracting unit_id using regular expressions
    const location = useLocation();
    // const unit_id = location.pathname.match(/\/class\/(\d+)/);
    const unit_id = location.pathname.match(/\/unit\/(\d+)/)?.[1];

    const [unit, setUnit] = useState(null);
    let [token] = useState(localStorage.getItem("token"));

    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };


    const fetchUnit = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/unit/${unit_id}`);
            // if (!response.ok) {
            //     throw new Error('Failed to fetch class');
            // }
            const data = await response.json();
            setUnit(data);
            localStorage.setItem("classData", JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (unit_id) {
            fetchUnit();
        }
    }, [unit_id]);

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
                              
                                <h1 className="title">Unit Info</h1>
                                    <div className="details">
                                        {/* <h1 className="itemTitle">{class?.data.name}</h1> */}
                                        <div className="detailItem">
                                            <span className="itemKey">Id: </span>
                                            <span className="itemValue">{unit?.data.id}</span>
                                        </div>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Center Id: </span>
                                            <span className="itemValue">{unit?.data.center_id}</span>
                                        </div> */}
                                        <div className="detailItem">
                                            <span className="itemKey">Chapter Name: </span>
                                            <span className="itemValue">{unit?.data.chapter_names}</span>
                                        </div>
        
                                        <div className="detailItem">
                                            <span className="itemKey">Unit: </span>
                                            <span className="itemValue">{unit?.data.name}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Month in which it will be completed: </span>
                                            <span className="itemValue">{unit?.data.month}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Description: </span>
                                            <span className="itemValue">{unit?.data.description}</span>
                                        </div>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Status: </span>
                                            <span className="itemValue">{unit?.data.status}</span>
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

export default UnitSingle;