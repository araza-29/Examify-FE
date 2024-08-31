import "./datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { centerColumns, centerRows, fetchCenterRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSlug } from "../../SlugContext";

const CenterDatatable = () => {
    const [data, setData] = useState(centerRows);
    const [loading, setLoading] = useState(false);
    // const slugs = localStorage.getItem("slugs");
    const { slugs } = useSlug();
    console.log("slugs abbas",slugs)
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const rows = await fetchCenterRows();
            console.log("jawad",rows)
            setLoading(false);
            setData(Array.from(rows.data));
        };
        getData();
    }, []);

    const handleDelete = (id) => {
        // Make a DELETE request to the Flask API endpoint
        fetch(`http://127.0.0.1:5000/del_center/${id}`, {
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
      const viewLinkString = "Center-Single";
      const editLinkString = "Center-Edit";
      const newLinkString = "Center-New";

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                         {slugs && slugs.includes(viewLinkString) && (
                        <Link to={`/center/${params.row.id}`} style={{ textDecoration: "none" }}>
                        <div className="viewButton">View</div>
                        </Link>)}
                        {slugs && slugs.includes(editLinkString) && (
                        <Link to={`/center/update-center/${params.row.id}`} style={{ textDecoration: "none" }}>
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
                Center
                {slugs && slugs.includes(newLinkString) && (
                <Link to="/center/new" className="link">
                    Add New
                </Link>)}
            </div>
            {loading ? <h1 style={{ textAlign: "center", paddingTop: "20%" }}>loading...</h1> :
                <DataGrid
                    className="datagrid"
                    rows={data}
                    columns={centerColumns.concat(actionColumn)}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    components={{
                        Toolbar: GridToolbar, // Include the GridToolbar in the Toolbar slot
                    }}
                    // checkboxSelection
                />}
        </div>
    );
};

export default CenterDatatable;