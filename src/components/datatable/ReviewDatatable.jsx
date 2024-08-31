import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { reviewColumns, reviewRows, fetchReviewRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const ReviewDatatable = () => {
    const [data, setData] = useState(reviewRows);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const rows = await fetchReviewRows();

            setLoading(false);
            setData(Array.from(rows.data));
        };
        getData();
    }, []);

    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
    };

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 70,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={`/user/${params.row.id}`} style={{ textDecoration: "none" }}>
                            <div className="viewButton">View</div>
                        </Link>
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
                Review Questions List
            </div>
            {loading ? <h1 style={{ textAlign: "center", paddingTop: "20%" }}>loading...</h1> :
                <DataGrid
                    className="datagrid"
                    rows={data}
                    columns={reviewColumns.concat(actionColumn)}
                    pageSize={9}
                    rowsPerPageOptions={[9]}

                />}
        </div>
    );
};

export default ReviewDatatable;