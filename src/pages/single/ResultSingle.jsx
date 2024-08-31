import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link } from "react-router-dom";

const ResultSingle = () => {
    // Extracting resultId using regular expressions
    const location = useLocation();
    // const resultId = location.pathname.match(/\/result\/(\d+)/);
    const resultId = location.pathname.match(/\/result\/(\d+)/)?.[1];

    const [result, setResult] = useState(null);
    let [token] = useState(localStorage.getItem("token"));

    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };


    const fetchUattendance = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/result/${resultId}`);
            // if (!response.ok) {
            //     throw new Error('Failed to fetch result');
            // }
            const data = await response.json();
            setResult(data);
            localStorage.setItem("batchData", JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (resultId) {
            fetchUattendance();
        }
    }, [resultId]);

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
                                    <Link to={`/result/upd_result/${resultId}`} className=" link">
                                        Edit
                                    </Link>
                                </div>
                                <h1 className="title">Subject Result Information</h1>
                                    <div className="details">
                                        {/* <h1 className="itemTitle">{result?.data.name}</h1> */}
                                        <div className="detailItem">
                                            <span className="itemKey">Id: </span>
                                            <span className="itemValue">{result?.data.id}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Center Id: </span>
                                            <span className="itemValue">{result?.data.center_id}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Exam Id: </span>
                                            <span className="itemValue">{result?.data.exam_id}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Student Id: </span>
                                            <span className="itemValue">{result?.data.student_id}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Marks: </span>
                                            <span className="itemValue">{result?.data.mark}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Status: </span>
                                            <span className="itemValue">{result?.data.status}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="right">
                    <Chart aspect={3 / 1} title="result Spending ( Last 6 Months)" />
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

export default ResultSingle;