import "./datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { coursechapterColumns, coursechapterRows, fetchCoursechapterRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSlug } from "../../SlugContext";

const CoursechapterDataTable = () => {
    const [data, setData] = useState(coursechapterRows);
    const [loading, setLoading] = useState(false);
    const { slugs } = useSlug();
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const rows = await fetchCoursechapterRows();
            console.log("jawad",rows)
            setLoading(false);
            setData(Array.from(rows.data));
        };
        getData();
    }, []);
    const handleSaveID = (id) => {
        // Make a DELETE request to the Flask API endpoint
        localStorage.setItem('chapter_id_for_unit',id);
      };
    const handleDelete = (id) => {
        // Make a DELETE request to the Flask API endpoint
        fetch(`http://127.0.0.1:5000/del_cchapter/${id}`, {
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
      const listingLinkString = "Unit-Listing";
      const viewLinkString = "Coursechapter-Single";
      const editLinkString = "Coursechapter-Edit";
      const newLinkString = "Coursechapter-New";
      const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 300,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        {slugs && slugs.includes(listingLinkString) && (
                        <Link to={`/subject/course-chapter/unit`} style={{ textDecoration: "none" }}>
                            <div className="otherButton"onClick={() => handleSaveID(params.row.id)}>Chapters</div>
                        </Link>)}
                        {slugs && slugs.includes(viewLinkString) && (
                        <Link to={`/subject/course-chapter/${params.row.id}`} style={{ textDecoration: "none" }}>
                        <div className="viewButton">View</div>
                        </Link>)}
                        {slugs && slugs.includes(editLinkString) && (
                        <Link to={`/subject/course-chapter/update-course-chapter/${params.row.id}`} style={{ textDecoration: "none" }}>
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
                Course Chapters
                {slugs && slugs.includes(newLinkString) && (
                <Link to="/subject/course-chapter/new" className="link">
                    Add New
                </Link>)}
            </div>
            {loading ? <h1 style={{ textAlign: "center", paddingTop: "20%" }}>loading...</h1> :
                <DataGrid
                    className="datagrid"
                    rows={data}
                    columns={coursechapterColumns.concat(actionColumn)}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    components={{
                        Toolbar: GridToolbar, // Include the GridToolbar in the Toolbar slot
                    }}
                />}
        </div>
    );
};

export default CoursechapterDataTable;