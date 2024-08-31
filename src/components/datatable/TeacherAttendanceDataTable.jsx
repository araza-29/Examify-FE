import "./datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { teacherattendanceColumns, teacherattendanceRows, fetchTeacherattendanceRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSlug } from "../../SlugContext";

const TeacherAttendanceDataTable = () => {
    const [data, setData] = useState(teacherattendanceRows);
    const [loading, setLoading] = useState(false);
    const { slugs } = useSlug();
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const rows = await fetchTeacherattendanceRows();
            console.log("jawad",rows)
            setLoading(false);
            setData(Array.from(rows.data));
        };
        getData();
    }, []);

    const handleDelete = (id) => {
        // Make a DELETE request to the Flask API endpoint
        fetch(`http://127.0.0.1:5000/student/del_timetable/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            // Remove the item from your React data state if the API request is successful
            setData(data.filter((item) => item.id !== id));
          })
          .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
          });
      };
      
      const viewLinkString = "Teacherattendance-Single";
      const editLinkString = "Teacherattendance-Edit";
      const newLinkString = "Teacherattendance-New";

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                       {slugs && slugs.includes(viewLinkString) && (
                        <Link to={`/teacher-attendance/${params.row.id}`} style={{ textDecoration: "none" }}>
                        <div className="viewButton">View</div>
                        </Link>)}
                        {slugs && slugs.includes(editLinkString) && (
                        <Link to={`/teacher-attendance/update-teacher-attendance/${params.row.id}`} style={{ textDecoration: "none" }}>
                            <div className="editButton">Edit</div>
                        </Link>)}
                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row.id)}
                        >
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];
    return (
        <div className="datatable">
            <div className="datatableTitle">
                Teacher Attendance
             
            </div>
            {loading ? <h1 style={{ textAlign: "student", paddingTop: "20%" }}>loading...</h1> :
                <DataGrid
                    className="datagrid"
                    rows={data}
                    columns={teacherattendanceColumns.concat(actionColumn)}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    components={{
                        Toolbar: GridToolbar, // Include the GridToolbar in the Toolbar slot
                    }}
                />}
        </div>
    );
};

export default TeacherAttendanceDataTable;