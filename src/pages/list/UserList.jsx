import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import UserDatatable from "../../components/datatable/UserDatatable"
import { useState } from "react"

const UserList = () => {
    let [token] = useState(localStorage.getItem("token"));

    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };

    return (
        <>
             (
                <div className="list">
                    <Sidebar />
                    <div className="listContainer">
                        <Navbar />
                        <UserDatatable />
                    </div>
                </div>
                )
             
        </>
    );
};

export default UserList