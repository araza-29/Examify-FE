import "./datatable.scss";
import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import { sawardlistColumns, sawardlistRows, fetchSAwardlistRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSlug } from "../../SlugContext";



const SAwardlistDataTable = () => {
    const [data, setData] = useState(sawardlistRows);
    const [loading, setLoading] = useState(false);
    const { slugs } = useSlug();
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const rows = await fetchSAwardlistRows();
            console.log("jawad",rows)
            setLoading(false);
            setData(Array.from(rows.data));
        };
        getData();
    }, []);
    const handleAddNumber = (id, studentName) => {
        // Store student information in local storage
        localStorage.setItem('student_id_n', id);
        localStorage.setItem('student_name_n', studentName);
    };
    

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
      const viewLinkString = "Awardlist-Addnumber";

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                         {slugs && slugs.includes(viewLinkString) && (
                        <Link
                            to={`/awardlist/by_id`}
                            style={{ textDecoration: "none" }}
                            onClick={() => handleAddNumber(params.row.id, params.row.name)}
                        >
                            <div className="viewButton">+ Add Number</div>
                        </Link>)}
                        {/* <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row.id)}
                        >
                            Delete
                        </div> */}
                    </div>
                );
            },
        },
    ];
    return (
        <div className="datatable">
            <div className="datatableTitle">
                AwardList
                {/* <Link to="/teacher_attendance/new" className="link">
                    Add New  Time Table
                </Link> */}
            </div>
            {loading ? <h1 style={{ textAlign: "student", paddingTop: "20%" }}>loading...</h1> :
                <DataGrid
                    className="datagrid"
                    rows={data}
                    columns={sawardlistColumns.concat(actionColumn)}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    components={{
                        Toolbar: GridToolbar, // Include the GridToolbar in the Toolbar slot
                    }}
                />}
        </div>
    );
};

export default SAwardlistDataTable;