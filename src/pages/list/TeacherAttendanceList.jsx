import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import TeacherAttendanceDataTable from "../../components/datatable/TeacherAttendanceDataTable"
import { useState } from "react"

const TeacherAttendanceList = () => {
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
                        <TeacherAttendanceDataTable />
                    </div>
                </div>
                )
            }
        </>
    )
}

export default TeacherAttendanceList