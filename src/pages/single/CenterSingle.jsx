import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link } from "react-router-dom";

const CenterSingle = () => {
    // Extracting centerID using regular expressions
    const location = useLocation();
    // const centerID = location.pathname.match(/\/center\/(\d+)/);
    const centerID = location.pathname.match(/\/center\/(\d+)/)?.[1];

    const [center, setCenter] = useState(null);
    let [token] = useState(localStorage.getItem("token"));

    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };


    const fetchCenter = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/center/${centerID}`);
            // if (!response.ok) {
            //     throw new Error('Failed to fetch Center');
            // }
            const data = await response.json();
            setCenter(data);
            localStorage.setItem("CenterData", JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (centerID) {
            fetchCenter();
        }
    }, [centerID]);

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
                              
                                <h1 className="title">Center Information</h1>
                                <div className="item">
                                    <img src={
                                        center?.data.logo
                                    }
                                        alt=""
                                        className="itemImg"
                                    />
                                    <div className="details">
                                        <h1 className="itemTitle">{center?.data.name}</h1>
                                        <div className="detailItem">
                                            <span className="itemKey">Id: </span>
                                            <span className="itemValue">{center?.data.id}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Address: </span>
                                            <span className="itemValue">{center?.data.address}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Phone Number: </span>
                                            <span className="itemValue">{center?.data.phone_no}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Status: </span>
                                            <span className="itemValue">{center?.data.status}</span>
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

export default CenterSingle;