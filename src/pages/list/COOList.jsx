import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import COODataTable from "../../components/datatable/COODataTable"
import { useState } from "react"

const COOList = () => {
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
                        <COODataTable />
                    </div>
                </div>
                )
             
        </>
    );
};

export default COOList