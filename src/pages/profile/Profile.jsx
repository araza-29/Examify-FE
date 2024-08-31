import { useState } from 'react';
import './profile.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

const Profile = () => {
    let [token] = useState(localStorage.getItem("token"));
    let [data] = useState(JSON.parse(localStorage.getItem("admindata"))); // Parse the data string into an object
    console.log(data);
    const redirectToLogin = () => {
        alert("Please login first, then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };

    return (
        <>
            {!token && redirectToLogin()}
            {token && (
                <div className="profile">
                    <Sidebar />
                    <div className="profileContainer">
                        <Navbar />
                        <div className="top">
                            <div className="left">
                                <h1 className="title">Admin Information</h1>
                                <div className="item">
                                    {/* <img src={data.profile_picture} alt="" className="itemImg" /> */}
                                    <div className="details">
                                        <h1 className="itemTitle">{data.name}</h1>
                                        <div className="detailItem">
                                            <span className="itemKey">Email:</span>
                                            <span className="itemValue">{data.email}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Phone Number:</span>
                                            <span className="itemValue">{data.phone_no}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Role:</span>
                                            <span className="itemValue">{data.role_id}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Center Name:</span>
                                            <span className="itemValue">{data.center_id}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Profile;
