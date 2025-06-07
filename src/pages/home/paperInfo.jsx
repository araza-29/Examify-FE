import React from "react";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { 
  Box, Grid, Typography, Paper, Container, Button, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip
} from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import Sidebar from "../../components/sidebar/Sidebar";

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
        setPapers(data.data);
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

  const handleClick = (index) => {
    navigate("/PaperEditing", { state: { paper: papers[index] } });
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
      <Sidebar />
      <Box component="main" sx={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        <Container maxWidth="lg" sx={{ py: 2 }}>
          <Box sx={{display:"flex"}}>
            <Typography variant="h4" component="h1" fontWeight="700" sx={{ mb: 1, color: "#7451f8" }}>
              Paper Information
            </Typography>
            <Button variant="contained" onClick = {handleCreate} sx={{ fontWeight: 'bold', marginLeft: 70, width: 200, height: 50, backgroundColor: "#7451f8"}}>Create Paper</Button>
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            View detailed information about your papers below
          </Typography>
          
          <Divider sx={{ mb: 4, borderColor: "#7451f8" }} />
          
          {papers.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 6 }}>
              <Typography variant="h6" color="text.secondary">
                No paper information available
              </Typography>
            </Box>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Paper</strong></TableCell>
                    <TableCell><strong>Date</strong></TableCell>
                    <TableCell><strong>Subject</strong></TableCell>
                    <TableCell><strong>Class</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {papers.map((item, index) => (
                    <TableRow key={index} onClick={() => handleClick(index)} sx={{ cursor: "pointer" }}>
                      <TableCell>{item.paper}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.subject_name}</TableCell>
                      <TableCell>{item.class_name}</TableCell>
                      <TableCell>
                        <Chip 
                          label={"completed"} 
                          size="small" 
                          sx={{ backgroundColor: statusColors[item.status] || "#bdbdbd", color: "#fff", fontWeight: 500 }} 
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default PaperInfo;
