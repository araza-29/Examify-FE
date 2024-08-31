import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link } from "react-router-dom";

const StudentrecordSingle = () => {
    // Extracting studentrecordId using regular expressions
    const location = useLocation();
    // const studentrecordId = location.pathname.match(/\/srecord\/(\d+)/);
    const studentrecordId = location.pathname.match(/\/srecord\/(\d+)/)?.[1];

    const [srecord, setStudentrecord] = useState(null);
    let [token] = useState(localStorage.getItem("token"));

    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };


    const fetchStudentrecord = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/srecord/${studentrecordId}`);
            // if (!response.ok) {
            //     throw new Error('Failed to fetch Center');
            // }
            const data = await response.json();
            setStudentrecord(data);
            localStorage.setItem("CenterData", JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (studentrecordId) {
            fetchStudentrecord();
        }
    }, [studentrecordId]);

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
                                <div className="editButton">
                                    <Link to={`/srecord/upd_srecord/${studentrecordId}`} className=" link">
                                        Edit
                                    </Link>
                                </div>
                                <h1 className="title">Student Record Information</h1>
                                <div className="item">
                                    <span className='itemKey'>Report Card:</span>
                                    <img src={
                                        srecord?.data.file
                                    }
                                        alt=""
                                        className="itemImg"
                                    />
                                    <div className="details">
                                        {/* <h1 className="itemTitle">{srecord?.data.name}</h1> */}
                                        <div className="detailItem">
                                            <span className="itemKey">Id: </span>
                                            <span className="itemValue">{srecord?.data.id}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Center Id: </span>
                                            <span className="itemValue">{srecord?.data.center_id}</span>
                                        </div>                                        
                                        <div className="detailItem">
                                            <span className="itemKey">Student Id: </span>
                                            <span className="itemValue">{srecord?.data.student_id}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Description: </span>
                                            <span className="itemValue">{srecord?.data.description}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">date: </span>
                                            <span className="itemValue">{srecord?.data.date}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Status: </span>
                                            <span className="itemValue">{srecord?.data.status}</span>
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
                </div>
                )
            }
        </>
    );
};

export default StudentrecordSingle;