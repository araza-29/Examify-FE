import React from "react";
import { useLocation } from "react-router-dom";
import { 
  Box, 
  Grid, 
  Typography, 
  Paper, 
  Container,
  Chip,
  Divider
} from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import Sidebar from "../../components/sidebar/Sidebar";

const InfoCard = ({ paper, date, subject, className }) => {
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
        <CalendarTodayOutlinedIcon 
          fontSize="small" 
          sx={{ mr: 1, color: "#1976d2" }} 
        />
        <Typography variant="body2" color="text.secondary">
          {date}
        </Typography>
      </Box>
      
      <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
        <MenuBookOutlinedIcon 
          fontSize="small" 
          sx={{ mr: 1, color: "#1976d2" }} 
        />
        <Chip 
          label={subject} 
          size="small" 
          sx={{ 
            backgroundColor: "#e3f2fd", 
            color: "#1976d2",
            fontWeight: 500
          }} 
        />
      </Box>
      
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <SchoolOutlinedIcon 
          fontSize="small" 
          sx={{ mr: 1, color: "#1976d2" }} 
        />
        <Chip 
          label={className} 
          size="small" 
          sx={{ 
            backgroundColor: "#e3f2fd", 
            color: "#1976d2",
            fontWeight: 500
          }} 
        />
      </Box>
    </Paper>
  );
};

const PaperInfo = () => {
  const location = useLocation();
  const data = location.state?.paper || [];
  console.log("Data received by paper info", data);
  
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Sidebar />
      <Box
        component="main"
        sx={{
          flex: 1,
          padding: "20px",
          flexGrow: 1,
          overflowY: "auto",
          backgroundColor: "#f5f9ff",
          paddingX: 3,
          paddingY: 3,
        }}
      >
        <Container maxWidth="lg" sx={{ py: 2 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            fontWeight="700" 
            sx={{ mb: 1, color: "#1565c0" }}
          >
            Paper Information
          </Typography>
          
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ mb: 4 }}
          >
            View detailed information about your papers below
          </Typography>
          
          <Divider sx={{ mb: 4, borderColor: "#bbdefb" }} />
          
          {data.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 6 }}>
              <Typography variant="h6" color="text.secondary">
                No paper information available
              </Typography>
            </Box>
          ) : (
            <Box sx={{ px: 2 }}>
              <Grid 
                container 
                spacing={6}
                sx={{
                  '& > .MuiGrid-item': {
                    paddingTop: '32px',
                    paddingBottom: '32px'
                  }
                }}
              >
                {data.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <InfoCard
                      paper={item.paper}
                      date={item.date}
                      subject={item.subject_name}
                      className={item.class_name}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default PaperInfo;