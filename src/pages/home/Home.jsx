import {useState, useEffect} from 'react';
import { Box, Grid, Typography } from "@mui/material";
import Sidebar from "../../components/sidebar/Sidebar";
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
    {Icon && <Icon size={40} style={{ color: "#007bff", marginBottom: "10px" }} />}
    <Typography variant="h6">{title}</Typography>
    <Typography>{num}</Typography>
  </Box>
);

const Home = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const [roleId, setRole] = useState(1)     // 0: Super Admin 1: Admin, 2: COO, 3: Examination, 4: Teacher
  const [papers, setPapers] = useState([])
  const [papersLeft, setPapersLeft] = useState([])
  const [papersRejected, setPapersRejected] = useState([])
  const [papersAccepted, setPapersAccepted] = useState([])
  const [dashboardCards, setDashboardCards] = useState([
    { title: "Papers left", icon: FileText, num: 0 },
    { title: "Papers rejected", icon: RefreshCw, num: 0 },
    { title: "Papers accepted", icon: CheckCircle, num: 0 },
  ]);

  const handleCardClick = (title) => {
    console.log("Navigating to Papers page with title:", title);
    console.log("Papers left:", papersLeft);
    console.log("Papers rejected:", papersRejected);
    console.log("Papers accepted:", papersAccepted);
  
    if (title === "Papers left") {
      navigate("/Papers", { state: { paper: papersLeft } });
    } else if (title === "Papers rejected") {
      navigate("/Papers", { state: { paper: papersRejected } });
    } else if (title === "Papers accepted") {
      navigate("/Papers", { state: { paper: papersAccepted } });
    }
  };

  useEffect(()=>{
    fetch("http://localhost:3000/Examination/reviewAllPaperByUserID", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: 1
      }),
    })
      .then((response) => response.json())
      .then((data)=>{
        console.log("Papers Fetched", data)
        setPapers(data.data);
      })
  },[])

  useEffect(() => {
    console.log("Papers:", papers);
    console.log("Is papers an array?", Array.isArray(papers));
    if(papers){
      const papersArray = papers && typeof papers === "object" ? Object.values(papers) : [];
      console.log("Converted Papers Array:", papersArray);
      const accepted = papersArray.filter(p => p.locked === 1);
      const left = papersArray.filter(p => p.completed !== 1);
      const rejected = papersArray.filter(p => p.reviewed === 2 && p.locked === 2);
    
      setPapersAccepted(accepted);
      setPapersLeft(left);
      setPapersRejected(rejected);
    
      setDashboardCards([
        { title: "Papers left", icon: FileText, num: left.length },
        { title: "Papers rejected", icon: RefreshCw, num: rejected.length },
        { title: "Papers accepted", icon: CheckCircle, num: accepted.length },
      ]);
    }
  }, [papers]);

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
            </>
        )
        }
      </Box>
    </Box>
  );
};

export default Home;
