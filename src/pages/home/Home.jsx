import {useState} from 'react';
import { Box, Grid, Typography } from "@mui/material";
import Sidebar from "../../components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { FileText, RefreshCw, Lock, CheckCircle } from "lucide-react";
import PaperInfo from './paperInfo'

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

const Home = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const dashboardCards = [
    { title: "Papers left", icon: FileText, num: 0},
    { title: "Papers rejected", icon: RefreshCw, num: 0 },
    { title: "Papers locked", icon: Lock, num: 0 },
    { title: "Papers accepted", icon: CheckCircle, num: 0 },
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
      >{open? (<PaperInfo/>):(
            <>
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
            </>
        )
        }
      </Box>
    </Box>
  );
};

export default Home;
