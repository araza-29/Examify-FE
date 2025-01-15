import { Box, Grid, Typography } from "@mui/material";
import Sidebar from "../../components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { FileText, RefreshCw, Lock, CheckCircle } from "lucide-react";

// Dashboard Card Component
const DashboardCard = ({ title, icon: Icon }) => (
  <Box
    sx={{
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
      transition: "transform 0.3s",
      "&:hover": {
        transform: "scale(1.05)",
      },
    }}
  >
    {Icon && <Icon size={40} style={{ color: "#007bff", marginBottom: "10px" }} />}
    <Typography variant="h6">{title}</Typography>
  </Box>
);

const Teacher = () => {
  const navigate = useNavigate();

  const dashboardCards = [
    { title: "Papers left", icon: FileText },
    { title: "Papers rejected", icon: RefreshCw },
    { title: "Papers locked", icon: Lock },
    { title: "Papers accepted", icon: CheckCircle },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f0f2f5",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          padding: "20px",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Teacher Dashboard
        </Typography>
        <Grid container spacing={3}>
          {dashboardCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <DashboardCard title={card.title} icon={card.icon} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Teacher;
