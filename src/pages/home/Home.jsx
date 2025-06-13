import {useState, useEffect} from 'react';
import { Box, Grid, Typography } from "@mui/material";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { FileText, RefreshCw, Lock, CheckCircle } from "lucide-react";
import PaperInfo from './paperInfo'

// Dashboard Card Component
const DashboardCard = ({ title, icon: Icon, num }) => (
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
    {Icon && <Icon size={40} style={{ color: "#7451f8", marginBottom: "10px" }} />}
    <Typography variant="h6">{title}</Typography>
    <Typography>{num}</Typography>
  </Box>
);

const Home = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const [roleId, setRole] = useState(4)     // 0: Super Admin 1: Admin, 2: COO, 3: Examination, 4: Teacher
  const [papers, setPapers] = useState([])
  const [papersLeft, setPapersLeft] = useState([])
  const [papersRejected, setPapersRejected] = useState([])
  const [papersAccepted, setPapersAccepted] = useState([])
  const [dashboardCards, setDashboardCards] = useState([
    { title: "Papers", icon: FileText },
    { title: "Question Bank", icon: RefreshCw},
    { title: "MCQs Bank", icon: CheckCircle },
  ]);

  const handleCardClick = (title) => {
    console.log("Navigating to Papers page with title:", title);
    console.log("Papers left:", papersLeft);
    console.log("Papers rejected:", papersRejected);
    console.log("Papers accepted:", papersAccepted);
  
    if (title === "Papers") {
      navigate("/Papers");
    } else if (title === "MCQs Bank") {
      navigate("/MCQSBank");
    } else if (title === "Question Bank") {
      navigate("/QuestionBank");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw"
      }}
    >

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        sx={{
          flex: 6
        }}
      >{open? (<PaperInfo/>):(
            <>
            <Navbar/>
            <Box sx={{padding: 5}}>
                {roleId === 1 ? (
                    <Typography variant="h4" sx={{ marginBottom: "20px" }}>
                      Admin Dashboard
                    </Typography>
                  ) : roleId === 3 ? (
                    <Typography variant="h4" sx={{ marginBottom: "20px" }}>
                      Examination Dashboard
                    </Typography>
                  ) : roleId === 4 ? (
                    <Typography variant="h4" sx={{ marginBottom: "20px" }}>
                      Teacher Dashboard
                    </Typography>
                  ) : null
                }

                <Grid container spacing={3}>
                {dashboardCards.map((card, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index} onClick={() => handleCardClick(card.title)} sx={{ cursor: "pointer" }}>
                    <DashboardCard title={card.title} icon={card.icon} num={card.num} />
                    </Grid>
                ))}
                </Grid>
              </Box>
            </>
        )
        }
      </Box>
    </Box>
  );
};

export default Home;
