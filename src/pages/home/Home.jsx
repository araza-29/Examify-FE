import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Paper from "./Paper";
import DraggableQuestions from "./DraggableQuestions";
import { useState } from "react";
import {Card, Typography, Box, Grid, CardContent, Select, MenuItem, InputLabel, TextField, FormControl, Button, CardActions} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faCalendar, faClock, faClipboard, faSchoolCircleXmark, faSchool, faXmarkCircle, faArrowLeft, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { ModalSelectQuestions } from "./ModalSelectQuestions";

function PaperHeaderEditInfo({OldData, setOldData, setEditOpen}){
  const [editedInfo, setEditedInfo] = useState({...OldData});
  const SaveChanges = () => {
    setOldData({...editedInfo});
    setEditOpen(false);
  }
  return(
    <Card sx={{ width: '100%', height: 600, display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: 1, overflowY: 'auto' }}>
      <Box
        display="flex"
        flexDirection="column"
        gap={4}
        justifyContent="center"
      >
        <Typography variant="h5" gutterBottom>
          Edit Headers Info
        </Typography>
    
        <Typography variant="subtitle1" gutterBottom>
          Class
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="class">Class</InputLabel>
        <Select
          labelId="class"
          value={editedInfo.class}
          onChange={(event) => setEditedInfo({ ...editedInfo, class: event.target.value })}
          label="Class"
        >
          <MenuItem value="IX">IX</MenuItem>
          <MenuItem value="X">X</MenuItem>
          <MenuItem value="XI">XI</MenuItem>
          <MenuItem value="XII">XII</MenuItem>
        </Select>
      </FormControl>
    
        <TextField
          label="Instruction"
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
          value = {editedInfo.instruction}
          onChange={(value)=>setEditedInfo({...editedInfo, instruction: value.target.value})}
        />
    
        <Box display="flex" flexWrap="wrap" justifyContent="space-between">
          <Box flexBasis="48%" mb={2}>
            <Typography variant="subtitle1" gutterBottom>
              Examination Year
            </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="Year">Examination Year</InputLabel>
            <Select
              fullWidth
              label="Examination Year"
              value={editedInfo.ExaminationYear}
              onChange = {(value)=>setEditedInfo({...editedInfo, ExaminationYear: value.target.value})}
            >
              <MenuItem value="2029">2029</MenuItem>
              <MenuItem value="2028">2028</MenuItem>
              <MenuItem value="2027">2027</MenuItem>
              <MenuItem value="2026">2026</MenuItem>
              <MenuItem value="2025">2025</MenuItem>
              <MenuItem value="2024">2024</MenuItem>
              <MenuItem value="2023">2023</MenuItem>
              <MenuItem value="2022">2022</MenuItem>
            </Select>
        </FormControl>
          </Box>
    
          <Box flexBasis="48%" mb={2}>
            <Typography variant="subtitle1" gutterBottom>
              Total Marks
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={editedInfo.marks}
              label="Total Marks"
              type="number"
              disabled
            />
          </Box>
        </Box>
    
        <Box display="flex" flexWrap="wrap">
          <Grid item xs={12} lg={6} pr={{ lg: 3 }} mb={2}>
            <Typography variant="subtitle1" gutterBottom>
              Duration
            </Typography>
            <TextField
              fullWidth
              disabled
              label="Duration"
              type="number"
              value={3}
            />
          </Grid>
    
          <Grid item xs={12} lg={6} mb={2}>
            <Typography variant="subtitle1" gutterBottom>
              Paper Date
            </Typography>
            <TextField
              fullWidth
              label="Paper Date"
              type="date"
              value={OldData.date}
            />
          </Grid>
          <Grid>

          </Grid>
        </Box>
      </Box>
      </CardContent>
      <CardActions>
        <Grid sx={{ pt: 0, display: 'flex', justifyContent: 'flex-end' }}>
          <Button sx={{
            background: 'linear-gradient(90deg, #2196F3 0%, #21CBF3 100%)',
            color: 'white',
            '&:hover': {
              background: 'linear-gradient(90deg, #1976D2 0%, #21CBF3 100%)',
            }
          }}
          onClick={SaveChanges}>
            Save Changes
          </Button>
          <Button sx={{
            ml: 2,  // Converts 'ml-2' (margin-left)
            background: 'linear-gradient(90deg, #2196F3 0%, #21CBF3 100%)',  // Simulates gradient variant
          }}
          onClick={()=>setEditOpen(false)}>
            Cancel
          </Button>
        </Grid>
      </CardActions>
    </Card>
    
  )
}
function PaperHeaderInfo({OldData, setOldData, setEditOpen}) {

  const Tag = ({ children }) => {
    return (
      <Box
      display="inline-flex"
      alignItems="center"
      px={1.5}  // Adjust padding for a smaller size
      py={0.75}  // Adjust padding for a smaller size
      m={0.5}  // Adjust margin for a compact look
      borderRadius="16px"  // Slightly larger border radius for a modern look
      lineHeight="1.2"  // Adjust line height for better readability
      bgcolor="#2F2F2F" 
      color="#9E9E9E"  // Custom gray color for text
      fontSize="0.75rem"  // Font size to match the text-xs
      textTransform="uppercase"
      sx={{ userSelect: 'none', boxShadow: 1 }}  // Add shadow for a cool effect
    >
      <Typography component="span">
        {children}
      </Typography>
    </Box>
    );
  };
  return (
    <Box
  sx={{
    width: '91.666%', // w-11/12
    height: '30%',
    my: 2, // my-2
    bgcolor: 'white', // bg-white
    borderRadius: 2, // rounded-xl
    p: 4, // p-4
    boxShadow: 3, // shadow-lg
  }}
>
  <Box display="flex" justifyContent="space-between" alignItems="center">
    <Typography variant="h4" sx={{ fontFamily: '"font-mar", Arial, sans-serif', opacity: 0.75 }}>
      Header Info
    </Typography>
    <FontAwesomeIcon style={{ fontSize: '3rem' }} icon={faPenSquare} onClick={()=>setEditOpen(true)}/>
  </Box>

  <Box>
    <Grid container spacing={2}>
      <Grid item xs={12} lg={6}>
        <Box display="flex" alignItems="center" sx={{ fontFamily: '"font-mar", Arial, sans-serif', opacity: 0.75 }}>
          <FontAwesomeIcon style={{ marginRight: '0.5rem' }} icon={faClipboard} />
          <Typography> Semester {OldData.class}</Typography>
        </Box>
        <Box display="flex" alignItems="center" sx={{ fontFamily: '"font-mar", Arial, sans-serif', opacity: 0.75 }}>
          <FontAwesomeIcon style={{ marginRight: '0.5rem' }} icon={faCalendar} />
          <Typography> Examination {OldData.ExaminationYear}</Typography>
        </Box>
        <Box display="flex" alignItems="center" sx={{ fontFamily: '"font-mar", Arial, sans-serif', opacity: 0.75 }}>
          <FontAwesomeIcon style={{ marginRight: '0.5rem' }} icon={faPenSquare} />
          <Typography> Marks: {OldData.marks}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Box display="flex" alignItems="center" sx={{ fontFamily: '"font-mar", Arial, sans-serif', opacity: 0.75 }}>
          <FontAwesomeIcon style={{ marginRight: '0.5rem' }} icon={faClock} />
          <Typography> Hrs {OldData.duration}</Typography>
        </Box>
        <Box display="flex" alignItems="center" sx={{ fontFamily: '"font-mar", Arial, sans-serif', opacity: 0.75 }}>
          <FontAwesomeIcon style={{ marginRight: '0.5rem' }} icon={faCalendar} />
          <Typography> {OldData.date}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" sx={{ fontFamily: '"font-mar", Arial, sans-serif'}}>
          {/* <FontAwesomeIcon style={{ marginRight: '0.5rem' }} icon={faSchool} /> */}
          <Box display="flex" flexWrap="wrap" sx={{ pt: '0.27rem' }}>
            {OldData.departmentNames.map((d) => (
              <Tag key={d}>{d}</Tag>
            ))}
          </Box>
        </Box>
      </Grid>
    </Grid>
  </Box>
</Box>
  );
}
const Home = () => {
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
  const [selectedQuestion, setQuestions] = useState([]);
  let [token] = useState(localStorage.getItem("token"));
  const [exsistingInfo, setExsistingInfo] = useState({
    header: "FAST NUCES".toUpperCase(),
    centerName: [],
    class: "Class",
    subject: "Subject Name",
    ExaminationYear: "2023",
    departmentNames: ["Karachi","Lahore"],
    duration: 4,
    marks: 80,
    date: new Date().toISOString().split('T')[0],
    instruction: "No Instruction just attempt the Paper"
  });

  const redirectToLogin = () => {
    alert("Please Login first then you can access this page...");
    window.location.href = '/'; // Replace "/login" with the actual login page path
  };
  const marksTotal = () => {
    var sum = 0;
    selectedQuestion.forEach((q) => {
      sum = sum + q.marks
    })
    console.log(sum)
    return sum;
  }
  return (
    <div className="home" style={homeStyle}>
      <Box sx={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
          {/* Sidebar or Left Section */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', overflowX: 'hidden'}}>
            {/* Header Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
              <Button variant="text" sx={{ display: 'flex', px: 2, py: 2, fontSize: '1.25rem', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </Button>
              <Typography variant="h3" sx={{ fontFamily: 'Mar', opacity: 0.75, ml: 2 }}>
                Paper Editor
              </Typography>
            </Box>
            {/* Content Section */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 2 }}>
              {AllowEdit === false ? (
                <PaperHeaderInfo 
                  OldData={exsistingInfo} 
                  setEditOpen={setAllowEdit} 
                  setOldData={setExsistingInfo} 
                />
              ) : (
                <PaperHeaderEditInfo 
                  OldData={exsistingInfo} 
                  setEditOpen={setAllowEdit} 
                  setOldData={setExsistingInfo} 
                />
              )}
              <Box sx={{ width: '91.666667%', my: 2 }}>
                <ModalSelectQuestions setQuestions={setQuestions} SelectedQuestions={selectedQuestion}></ModalSelectQuestions>
              </Box>
              <Box sx={{ width: '91.666667%', my: 2 }}>
                <Typography 
                  sx={{ 
                    fontSize: '1.25rem',    // Customize font size
                    fontWeight: 'bold',     // Make the text bold
                    color: '#333',          // Text color for main content
                    mb: 1                   // Add margin-bottom to separate content
                  }}
                >
                  Selected Question: {marksTotal()}/{exsistingInfo.marks}
                </Typography>
                
                {selectedQuestion.length !== 0 ? (
                  <DraggableQuestions SetQuestions={setQuestions} Questions={selectedQuestion} />
                ) : (
                  <Typography 
                    sx={{
                      fontSize: '1rem',       // Slightly smaller font for no questions
                      color: '#999',          // Grey color for subtle text
                      fontStyle: 'italic'     // Italic style for emphasis
                    }}
                  >
                    No Questions Selected yet
                  </Typography>
                )}
              </Box>

            </Box>
          </Box>

          {/* Paper Viewer Section */}
          <Box sx={{ flex: 1, overflow: 'auto', height: '100%' }}>
            <Paper htmlQuestions = {selectedQuestion} BasicInfo={exsistingInfo} />
          </Box>
        </Box>
      </Box>
    </div>


  );
};

export default Home;
