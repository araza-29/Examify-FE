import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {Card, Typography, Box, Grid, CardContent, Select, MenuItem, InputLabel, TextField, FormControl, Button, CardActions} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faCalendar, faClock, faClipboard, faSchoolCircleXmark, faSchool, faXmarkCircle, faArrowLeft, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import MCQinfo from "./MCQInfo";
import DropDown from "../../components/DropDown/DropDown"

const Home = () => {
  const navigate = useNavigate();
  const homeStyle = {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#f0f2f5',
  };

  const sidebarStyle = {
    width: '50px',
    backgroundColor: '#333',
  };

  const navbarStyle = {
    width: '200px',
    backgroundColor: '#333',
  };

  const cardContainerStyle = {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const cardStyle = {
    width: '300px',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  };
  const [AllowEdit, setAllowEdit] = useState(false);
  let [token] = useState(localStorage.getItem("token"));

  const redirectToLogin = () => {
    alert("Please Login first then you can access this page...");
    window.location.href = '/'; // Replace "/login" with the actual login page path
  };
  const [MCQFlag, setMCQFlag] = useState(false);
  const [flag, setFlag] = useState(false);
  const [userId, setUserId] = useState(Number(localStorage.getItem("userId"))||5);
  const [MCQs, setMCQs] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [Chapters, setChapters] = useState([]);
  const [allMCQs, setAllMCQs] = useState([]);
  const [Topic, setTopics] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapters, setSelectedChapters] = useState(null);
  const [selectedTopic, setSelectedTopics] = useState(null);
  useEffect(()=> {
    fetchSubjects();
    fetchMCQ();
  },[userId])
  useEffect(()=> {
    console.log("Subject", selectedSubject)
    if(selectedSubject !== null) {
      fetchChapters();
      setMCQs(allMCQs.filter((item)=> {
        return(item.subject_id === selectedSubject.id) 
    }))
    }
  },[selectedSubject])

  useEffect(()=> {
    if(selectedChapters !== null) {
        fetchTopics();
        setMCQs(allMCQs.filter((item)=> {
            return(item.chapter_id === selectedChapters.id) 
        }))
    }
    console.log("Selected MCQs", MCQs);
    console.log("Selectedchapters", selectedChapters);
  },[selectedChapters])

  useEffect(()=> {
    if(selectedTopic !== null) {
        setMCQs(allMCQs.filter((item)=> {
            return(item.topic_id === selectedTopic.id) 
        }))
    }
    console.log("Selected MCQs", MCQs);
    console.log("Selected topics", selectedTopic);
  },[selectedTopic])
  
  const handleCreate = () => {
    navigate('/CreateMCQ')
  }
  const fetchSubjects = () => {
    console.log("UserID", userId)
    fetch("http://localhost:3000/Examination/reviewSubjectsByUserID",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_id: userId})
    })
    .then(response => response.json())
    .then((data) => {
        console.log("Subjects data", data);
        if(data.code === 200) {
            setSubjects(data.data);
        }
        else {
            console.log("Chapter data not found");
        }
    }).catch((error) => {
        console.error("Error fetching chapters:", error);
    })
  }
  const fetchChapters = () => {
    console.log("subjectId", selectedSubject)
    fetch("http://localhost:3000/Examination/reviewChaptersBySubjectId",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({subject_id: selectedSubject.id})
    })
    .then(response => response.json())
    .then((data) => {
        console.log("Chapter data", data);
        if(data.code === 200) {
            setChapters(data.data);
        }
        else {
            console.log("Chapter data not found");
        }
    }).catch((error) => {
        console.error("Error fetching chapters:", error);
    })
  }
  const fetchTopics = () => {
    if(selectedChapters.id){
        fetch("http://localhost:3000/Examination/reviewTopicsByChapterId", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({chapter_id: selectedChapters.id})
        })
        .then(response => response.json())
        .then((data)=> {
            console.log("Topic data", data);
            if(data.code === 200) {
                setTopics(data.data);
            }
            else {
                console.log("Topics data not found");
            }
        })
        .catch((error) => {
            console.error("Error fetching topics:", error);
        })
    }
  }
  const fetchMCQ = () => {
    fetch("http://localhost:3000/Examination/reviewMCQ", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({})
    })
    .then(response => response.json())
    .then((data) => {
        console.log('Received data:', data); // Check the structure
        if (data.code === 200) {
            setMCQs(data.data);
            setAllMCQs(data.data)
        } else {
            console.error('Unexpected response code:', data.code);
        }
    })
    .catch((error) => {
        console.error('Error in response:', error);
    })
    .catch((error) => {
        console.error("Error fetching MCQs:", error);
    })
  }
  return (
    <div className="home" style={homeStyle}>
      <Box sx={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
          {/* Sidebar or Left Section */}
          <Sidebar style = {{sidebarStyle}} />
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', overflowX: 'hidden'}}>
            {/* Header Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
              <Button variant="text" sx={{ display: 'flex', px: 2, py: 2, fontSize: '1.25rem', alignItems: 'center' }} onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </Button>
              <Typography variant="h3" sx={{ fontFamily: 'Mar', opacity: 0.75, ml: 2 }}>
                MCQ Bank
              </Typography>
              <Button variant="contained" color="primary" onClick = {handleCreate} sx={{ fontWeight: 'bold', marginLeft: 70, width: 200, height: 50}}>Create MCQ</Button>
            </Box>
            {/* Content Section */}
            {!flag?(
              <Box
                sx={{
                  display: 'flex',          // Enables flexbox
                  flexDirection: 'row',      // Aligns children horizontally
                  gap: '8px',                // Reduce space between the boxes
                  justifyContent: 'flex-start', // Aligns boxes to the start of the container
                  alignItems: 'center',      // Vertically aligns items in the center
                }}
              >
                <Box>
                  <DropDown name="Subjects" data={subjects} selectedData={selectedSubject} setSelectedData={setSelectedSubject} />
                </Box>
                <Box>
                  <DropDown name="Chapters" data={Chapters} selectedData={selectedChapters} setSelectedData={setSelectedChapters} />
                </Box>
                <Box>
                  <DropDown name="Topics" data={Topic} selectedData={selectedTopic} setSelectedData={setSelectedTopics} />
                </Box>
              </Box>
              ):(<></>)}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 2 }}>
             { console.log("1Selected MCQs", MCQs)}
              <MCQinfo MCQData={MCQs} flag={flag} setFlag={setFlag} setMCQData={setMCQs}/>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>


  );
};

export default Home;
