import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link } from "react-router-dom";

const SubjectSingle = () => {
    // Extracting subjectId using regular expressions
    const location = useLocation();
    // const subjectId = location.pathname.match(/\/subject\/(\d+)/);
    const subjectId = location.pathname.match(/\/subject\/(\d+)/)?.[1];

    const [subject, setSubject] = useState(null);
    let [token] = useState(localStorage.getItem("token"));

    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };


    const fetchSubject = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/subject/${subjectId}`);
            // if (!response.ok) {
            //     throw new Error('Failed to fetch subject');
            // }
            const data = await response.json();
            setSubject(data);
            localStorage.setItem("batchData", JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (subjectId) {
            fetchSubject();
        }
    }, [subjectId]);

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
                               
                                <h1 className="title">Subject Information</h1>
                                    <div className="details">
                                        {/* <h1 className="itemTitle">{subject?.data.name}</h1> */}
                                        <div className="detailItem">
                                            <span className="itemKey">Id: </span>
                                            <span className="itemValue">{subject?.data.id}</span>
                                        </div>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Center Id: </span>
                                            <span className="itemValue">{subject?.data.center_id}</span>
                                        </div> */}
                                        <div className="detailItem">
                                            <span className="itemKey">Subject Name: </span>
                                            <span className="itemValue">{subject?.data.name}</span>
                                        </div>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Class Name: </span>
                                            <span className="itemValue">{subject?.data.class_names}</span>
                                        </div> */}
                                        <div className="detailItem">
                                            <span className="itemKey">User Name: </span>
                                            <span className="itemValue">{subject?.data.user_names}</span>
                                        </div>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Status: </span>
                                            <span className="itemValue">{subject?.data.status}</span>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            {/* <div className="right">
                    <Chart aspect={3 / 1} title="subject Spending ( Last 6 Months)" />
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

export default SubjectSingle;