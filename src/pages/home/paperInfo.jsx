import React from "react";
import { useState, useEffect} from "react";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate, Link } from "react-router-dom";
import { 
  Box, Grid, Typography, Paper, Container, Button, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip
} from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import Sidebar from "../../components/sidebar/Sidebar";
import { DataGrid, GridToolbar, getGridSingleSelectOperators } from "@mui/x-data-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
const statusColors = {
  Approved: "#4CAF50", // Green
  Submitted: "#FFC107", // Yellow
  Locked: "#F44336" // Red
};

const InfoCard = ({ paper, date, subject, className, status }) => {
  
  return (
    <Paper
      elevation={1}
      sx={{
        borderRadius: "8px",
        padding: "20px",
        width: "100%",
        height: "100%",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
        },
        display: "flex",
        flexDirection: "column",
        border: "1px solid #e0e0e0",
        backgroundColor: "#ffffff",
      }}
    >
      <Typography 
        variant="h6" 
        fontWeight="600" 
        sx={{ 
          mb: 2,
          color: "#1976d2",
          borderBottom: "1px solid #e0e0e0",
          paddingBottom: "10px"
        }}
      >
        {paper}
      </Typography>
      
      <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
        <CalendarTodayOutlinedIcon fontSize="small" sx={{ mr: 1, color: "#1976d2" }} />
        <Typography variant="body2" color="text.secondary">{date}</Typography>
      </Box>
      
      <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
        <MenuBookOutlinedIcon fontSize="small" sx={{ mr: 1, color: "#1976d2" }} />
        <Chip 
          label={subject} 
          size="small" 
          sx={{ backgroundColor: "#e3f2fd", color: "#1976d2", fontWeight: 500 }} 
        />
      </Box>
      
      <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
        <SchoolOutlinedIcon fontSize="small" sx={{ mr: 1, color: "#1976d2" }} />
        <Chip 
          label={className} 
          size="small" 
          sx={{ backgroundColor: "#e3f2fd", color: "#1976d2", fontWeight: 500 }} 
        />
      </Box>
      
      <Box sx={{ display: "flex", alignItems: "center", mt: "auto" }}>
        <Chip 
          label={status} 
          size="small" 
          sx={{ backgroundColor: statusColors[status] || "#bdbdbd", color: "#fff", fontWeight: 500 }} 
        />
      </Box>
    </Paper>
  );
};

const PaperInfo = () => {
  const navigate = useNavigate();
  const [papers, setPapers] = useState([]);
  useEffect(()=>{
    fetch("http://localhost:3000/Examination/reviewAllPaperByUserID", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: 5
      }),
    })
      .then((response) => response.json())
      .then((data)=>{
        console.log("Papers Fetched", data)
        const newPapers = data.data.map((item) => {
        if(item.locked === 1) {
          return { ...item, status: 'locked' };
        }
        else if(item.reviewed === 1) {
          return { ...item, status: 'reviewed' };
        }
        else if (item.completed === 1) {
          return { ...item, status: 'completed' };
        }
        else {
          return { ...item, status: 'Not completed' };
        }
        return item;
      });
        setPapers(newPapers);
      })
  },[])

  const handleCreate = () => {
    navigate("/PaperMaking");
  }

  // useEffect(() => {
  //   console.log("Papers:", papers);
  //   console.log("Is papers an array?", Array.isArray(papers));
  //   if(papers){
  //     const papersArray = papers && typeof papers === "object" ? Object.values(papers) : [];
  //     console.log("Converted Papers Array:", papersArray);
  //     const accepted = papersArray.filter(p => p.locked === 1);
  //     const left = papersArray.filter(p => p.completed !== 1);
  //     const rejected = papersArray.filter(p => p.reviewed === 2 && p.locked === 2);
    
  //     setPapersAccepted(accepted);
  //     setPapersLeft(left);
  //     setPapersRejected(rejected);
    
  //     setDashboardCards([
  //       { title: "Papers left", icon: FileText, num: left.length },
  //       { title: "Papers rejected", icon: RefreshCw, num: rejected.length },
  //       { title: "Papers accepted", icon: CheckCircle, num: accepted.length },
  //     ]);
  //   }
  // }, [papers]);

  const handleEdit = (index) => {
    const role = localStorage.getItem("role")
    const paper = papers.find((p) => p.id === index);
    if (!paper) return;
    console.log("Papersid",index);
    if(role === "Teacher")
      navigate("/PaperEditing", { state: { paper: paper } });
    else if(role === "Adminstrator")
      navigate("/PaperView", { state: { paper: paper } });
    else if(role === "Examination")
      navigate("/PaperView", { state: { paper: paper } });
  };
  const handleView = (index) => {
    navigate("/PaperEditing", { state: { paper: papers[index] } });
  };
  const handleDelete = (index) => {
    navigate("/PaperEditing", { state: { paper: papers[index] } });
  };
 const paperColumns = [
    { field: "id", headerName: "ID", width: 70 },
    // {
    //   field: "center_id",
    //   headerName: "Center Id",
    //   width: 230,
    // },
    {
      field: "type",
      headerName: "Paper",
      width: 200,
    },
    {
      field: "date",
      headerName: "Paper Date",
      width: 150,
    },
    {
      field: "due_date",
      headerName: "Due Date",
      width: 150,
    },
    {
      field: "subject_name",
      headerName: "Subject",
      // filterable: true,
      // type: 'singleSelect', // important
      // // valueOptions: Subjects.map(option => option.name),
      // filterOperators: getGridSingleSelectOperators(),
      width: 200,
    },
    {
      field: "class_name",
      headerName: "Class",
      // filterable: true,
      // type: 'singleSelect', // important
      // // valueOptions: classes.map(option => option.name),
      // filterOperators: getGridSingleSelectOperators(),
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", gap: "50px" }}>
          <Link
            to={`/user/${params.row.id}`}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                padding: "2px 5px",
                borderRadius: "5px",
                color: "darkblue",
                border: "1px dotted rgba(0, 0, 139, 0.596)",
                cursor: "pointer",
              }}
            >
              View
            </div>
          </Link>

          <div
            onClick={() => handleEdit(params.row.id)}
            style={{
              padding: "2px 5px",
              borderRadius: "5px",
              color: "rgb(27, 204, 11)",
              border: "1px dotted rgba(72, 231, 24, 0.596)",
              cursor: "pointer",
            }}
          >
            Edit
          </div>

          <div
            onClick={() => handleDelete(params.row.id)}
            style={{
              padding: "2px 5px",
              borderRadius: "5px",
              color: "crimson",
              border: "1px dotted rgba(220, 20, 60, 0.6)",
              cursor: "pointer",
            }}
          >
            Delete
          </div>
        </div>
      ),
    },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
      <Sidebar />
      <Box component="main" sx={{ flex: 6, overflowY: "auto"}}>
        <Navbar/>
        <Box sx={{padding: 3}}>
          <Box sx={{display:"flex"}}>
            <Button
              variant="text"
              sx={{
                display: "flex",
                px: 2,
                py: 2,
                fontSize: "1.25rem",
                alignItems: "center",
                color: "#7451f8",
              }}
              onClick={() => navigate(-1)}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </Button>
            <Typography variant="h3" sx={{ fontFamily: 'Mar', opacity: 0.75, ml: 2, color: "#7451f8", }}>
              Papers
            </Typography>
          </Box>
          
          {papers.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 6 }}>
              <Typography variant="h6" color="text.secondary">
                No paper information available
              </Typography>
            </Box>
          ) : (
            <Box sx={{height: 600,width:1200, paddingTop: 2}}>
              <DataGrid
                className="datagrid"
                rows={papers}
                columns={paperColumns}
                pageSize={9}
                rowsPerPageOptions={[9]}
                components={{
                  Toolbar: GridToolbar,
                }}
              />
            </Box>
            // <TableContainer component={Paper}>
            //   <Table>
            //     <TableHead>
            //       <TableRow>
            //         <TableCell><strong>Paper</strong></TableCell>
            //         <TableCell><strong>Date</strong></TableCell>
            //         <TableCell><strong>Subject</strong></TableCell>
            //         <TableCell><strong>Class</strong></TableCell>
            //         <TableCell><strong>Status</strong></TableCell>
            //       </TableRow>
            //     </TableHead>
            //     <TableBody>
            //       {papers.map((item, index) => (
            //         <TableRow key={index} onClick={() => handleClick(index)} sx={{ cursor: "pointer" }}>
            //           <TableCell>{item.paper}</TableCell>
            //           <TableCell>{item.date}</TableCell>
            //           <TableCell>{item.subject_name}</TableCell>
            //           <TableCell>{item.class_name}</TableCell>
            //           <TableCell>
            //             <Chip 
            //               label={"completed"} 
            //               size="small" 
            //               sx={{ backgroundColor: statusColors[item.status] || "#bdbdbd", color: "#fff", fontWeight: 500 }} 
            //             />
            //           </TableCell>
            //         </TableRow>
            //       ))}
            //     </TableBody>
            //   </Table>
            // </TableContainer>
          )}
          </Box>
      </Box>
    </Box>
  );
};

export default PaperInfo;
