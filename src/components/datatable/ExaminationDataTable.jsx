import "./datatable.scss";
import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import { examinationColumns, examinationRows, fetchExaminationRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSlug } from "../../SlugContext";

const ExaminationDataTable = () => {
    const [data, setData] = useState(examinationRows);
    const [loading, setLoading] = useState(false);
    const { slugs } = useSlug();
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const rows = await fetchExaminationRows();
            console.log("jawad",rows)
            setLoading(false);
            setData(Array.from(rows.data));
        };
        getData();
    }, []);

    const handleSaveID = (id, classid, marks) => {
        // Make a DELETE request to the Flask API endpoint
        localStorage.setItem('examination_id',id);
        localStorage.setItem('Aclass_id',classid);
        localStorage.setItem('total_marks',marks);
      };

    const handleDelete = (id) => {
        // Make a DELETE request to the Flask API endpoint
        fetch(`http://127.0.0.1:5000/del_examination/${id}`, {
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
      const listingLinkString = "Awardlist-Listing";
      const viewLinkString = "Examination-Single";
      const editLinkString = "Examination-Edit";
      const newLinkString = "Examination-New";

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 300,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        {slugs && slugs.includes(listingLinkString) && (
                         <Link to={`/awardlist`} style={{ textDecoration: "none" }}>
                            <div className="viewButton" 
                            onClick={() => handleSaveID(params.row.id,params.row.class_id,params.row.total_marks)}>Award List</div>
                        </Link>)}
                        {slugs && slugs.includes(viewLinkString) && (
                        <Link to={`/examination/${params.row.id}`} style={{ textDecoration: "none" }}>
                        <div className="viewButton">View</div>
                        </Link>)}
                        {slugs && slugs.includes(editLinkString) && (
                        <Link to={`/examination/update-examination/${params.row.id}`} style={{ textDecoration: "none" }}>
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
                Examination Details
                {slugs && slugs.includes(newLinkString) && (
                <Link to="/examination/new" className="link">
                    Add New
                </Link>)}
            </div>
            {loading ? <h1 style={{ textAlign: "center", paddingTop: "20%" }}>loading...</h1> :
                <DataGrid
                    className="datagrid"
                    rows={data}
                    columns={examinationColumns.concat(actionColumn)}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    components={{
                        Toolbar: GridToolbar, // Include the GridToolbar in the Toolbar slot
                    }}
                />}
        </div>
    );
};

export default ExaminationDataTable;