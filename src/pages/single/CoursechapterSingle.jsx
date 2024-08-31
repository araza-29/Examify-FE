import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link } from "react-router-dom";

const CourseChapterSingle = () => {
    // Extracting cchapter_id using regular expressions
    const location = useLocation();
    // const cchapter_id = location.pathname.match(/\/class\/(\d+)/);
    const cchapter_id = location.pathname.match(/\/course-chapter\/(\d+)/)?.[1];

    const [cchapter, setCchapter] = useState(null);
    let [token] = useState(localStorage.getItem("token"));

    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };


    const fetchCchapter = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/cchapter/${cchapter_id}`);
            // if (!response.ok) {
            //     throw new Error('Failed to fetch class');
            // }
            const data = await response.json();
            setCchapter(data);
            localStorage.setItem("classData", JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (cchapter_id) {
            fetchCchapter();
        }
    }, [cchapter_id]);

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
                                    <Link to={`/subject/cchapter/upd_cchapter/${cchapter_id}`} className=" link">
                                        Edit
                                    </Link>
                                </div>
                                <h1 className="title">Chapter Info</h1>
                                    <div className="details">
                                        {/* <h1 className="itemTitle">{class?.data.name}</h1> */}
                                        <div className="detailItem">
                                            <span className="itemKey">Id: </span>
                                            <span className="itemValue">{cchapter?.data.id}</span>
                                        </div>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Center Id: </span>
                                            <span className="itemValue">{cchapter?.data.center_id}</span>
                                        </div> */}
                                        <div className="detailItem">
                                            <span className="itemKey">Chapter Name: </span>
                                            <span className="itemValue">{cchapter?.data.name}</span>
                                        </div>
        
                                        <div className="detailItem">
                                            <span className="itemKey">Subjects: </span>
                                            <span className="itemValue">{cchapter?.data.subject_names}</span>
                                        </div>
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Status: </span>
                                            <span className="itemValue">{cchapter?.data.status}</span>
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

export default CourseChapterSingle;