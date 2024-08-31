import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { questionColumns, questionRows, fetchQuestionRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const QuestionDatatable = () => {
    const [data, setData] = useState(questionRows);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const rows = await fetchQuestionRows();

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
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={`/question/${params.row.id}`} style={{ textDecoration: "none" }}>
                            <div className="viewButton">View</div>
                        </Link>
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
                Add New Question
                <Link to="/question/new" className="link">
                    Add New
                </Link>
            </div>
            {loading ? <h1 style={{ textAlign: "center", paddingTop: "20%" }}>loading...</h1> :
                <DataGrid
                    className="datagrid"
                    rows={data}
                    columns={questionColumns.concat(actionColumn)}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    // checkboxSelection
                />}
        </div>
    );
};

export default QuestionDatatable;