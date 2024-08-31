import "./datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { timetableColumns, timetableRows, fetchTimetableRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSlug } from "../../SlugContext";

const TimeTableDataTable = () => {
    const [data, setData] = useState(timetableRows);
    const [loading, setLoading] = useState(false);
    const { slugs } = useSlug();
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const rows = await fetchTimetableRows();
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
      
      const viewLinkString = "Timetable-Single";
      const editLinkString = "Timetable-Edit";
      const newLinkString = "Timetable-New";
      const newLinkString_1 = "Teacherattendance-New";
    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 300,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        {slugs && slugs.includes(newLinkString_1) && (
                        <Link to={`/teacher-attendance/new/${params.row.id}`} style={{ textDecoration: "none" }}>
                            <div className="viewButton">Attendance</div>
                        </Link>)}
                        {slugs && slugs.includes(viewLinkString) && (
                        <Link to={`/time-table/${params.row.id}`} style={{ textDecoration: "none" }}>
                        <div className="viewButton">View</div>
                        </Link>)}
                        {slugs && slugs.includes(editLinkString) && (
                        <Link to={`/time-table/update-time-table/${params.row.id}`} style={{ textDecoration: "none" }}>
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
                Time Table
                {slugs && slugs.includes(newLinkString) && (
                <Link to="/time-table/new" className="link">
                    Add New
                </Link>)}
            </div>
            {loading ? <h1 style={{ textAlign: "student", paddingTop: "20%" }}>loading...</h1> :
                <DataGrid
                    className="datagrid"
                    rows={data}
                    columns={timetableColumns.concat(actionColumn)}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    components={{
                        Toolbar: GridToolbar, // Include the GridToolbar in the Toolbar slot
                    }}
                />}
        </div>
    );
};

export default TimeTableDataTable;