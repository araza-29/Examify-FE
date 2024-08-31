import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link } from "react-router-dom";

const BatchSingle = () => {
    // Extracting batchId using regular expressions
    const location = useLocation();
    // const batchId = location.pathname.match(/\/batch\/(\d+)/);
    const batchId = location.pathname.match(/\/batch\/(\d+)/)?.[1];

    const [batch, setBatch] = useState(null);
    let [token] = useState(localStorage.getItem("token"));

    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };


    const fetchBatch = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/batch/${batchId}`);
            // if (!response.ok) {
            //     throw new Error('Failed to fetch batch');
            // }
            const data = await response.json();
            setBatch(data);
            localStorage.setItem("batchData", JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (batchId) {
            fetchBatch();
        }
    }, [batchId]);

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
                                
                                <h1 className="title">batch Information</h1>
                                    <div className="details">
                                        {/* <h1 className="itemTitle">{batch?.data.name}</h1> */}
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Id: </span>
                                            <span className="itemValue">{batch?.data.id}</span>
                                        </div> */}
                                        {/* <div className="detailItem">
                                            <span className="itemKey">Center Id: </span>
                                            <span className="itemValue">{batch?.data.center_id}</span>
                                        </div> */}
                                        <div className="detailItem">
                                            <span className="itemKey">Name: </span>
                                            <span className="itemValue">{batch?.data.name}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Year: </span>
                                            <span className="itemValue">{batch?.data.year}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="right">
                    <Chart aspect={3 / 1} title="batch Spending ( Last 6 Months)" />
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

export default BatchSingle;