import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import ExaminationDataTable from "../../components/datatable/ExaminationDataTable"
import { useState } from "react"

const ExaminationList = () => {
    let [token] = useState(localStorage.getItem("token"));

    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };

    return (
        <>
            {!token && redirectToLogin()}
            {token && (
                <div className="list">
                    <Sidebar />
                    <div className="listContainer">
                        <Navbar />
                        <ExaminationDataTable />
                    </div>
                </div>
                )
            } 
        </>
    );
};

export default ExaminationList