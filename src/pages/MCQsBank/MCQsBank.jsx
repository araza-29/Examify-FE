import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import MCQEditor from "./MCQEditor";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import {Card, Typography, Box, Grid, CardContent, Select, MenuItem, InputLabel, TextField, FormControl, Button, CardActions, FormHelperText} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faCalendar, faClock, faClipboard, faSchoolCircleXmark, faSchool, faXmarkCircle, faArrowLeft, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import MCQinfo from "./MCQInfo";
import toast from "react-hot-toast"
import DropDown from "../../components/DropDown/DropDown"
import { DataGrid, GridToolbar, getGridSingleSelectOperators } from "@mui/x-data-grid";
import DOMPurify from 'dompurify';

const Home = () => {
  const navigate = useNavigate();
  const homeStyle = {
    display: 'flex',
    height: '100vh',
    width: '100vw',
  };

  const sidebarStyle = {
    width: '50px',
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
  const [userId, setUserId] = useState(parseInt(localStorage.getItem("userId"), 10));
  const [MCQs, setMCQs] = useState([]);
  const [MCQInfo, setMCQInfo] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [Chapters, setChapters] = useState([]);
  const [allMCQs, setAllMCQs] = useState([]);
  const [Topic, setTopics] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapters, setSelectedChapters] = useState(null);
  const [selectedTopic, setSelectedTopics] = useState(null);
  const Columns = [
        { field: "id", headerName: "ID", width: 70 },
        // {
        //   field: "center_id",
        //   headerName: "Center Id",
        //   width: 230,
        // },
        {
          field: "name",
          headerName: "MCQs",
          renderCell: (params) => (
            <HtmlRenderer value={params.value} />
          ),
          width: 230,
        },
        {
          field: "marks",
          headerName: "Marks",
          width: 70,
        },
        {
          field: "topic_name",
          headerName: "Topic",
          width: 200,
          // filterable: true,
          // type: 'singleSelect', // important
          // valueOptions: topic.map(option => option.name),
          filterOperators: getGridSingleSelectOperators(),
        },
        {
          field: "chapter_name",
          headerName: "Chapter",
          width: 230,
          // filterable: true,
          // type: 'singleSelect', // important
          // valueOptions: Chapters.map(option => option.name),
          // filterOperators: getGridSingleSelectOperators(),
        },
        {
          field: "subject_name",
          headerName: "Subject",
          // filterable: true,
          // type: 'singleSelect', // important
          // valueOptions: Subjects.map(option => option.name),
          // filterOperators: getGridSingleSelectOperators(),
          width: 120,
        },
        {
          field: "class_name",
          headerName: "Class",
          // filterable: true,
          // type: 'singleSelect', // important
          // valueOptions: classes.map(option => option.name),
          // filterOperators: getGridSingleSelectOperators(),
          width: 70,
        },
        {
          field: "action",
          headerName: "Action",
          width: 220,
          renderCell: (params) => (
            <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
    
              <div
                onClick={() => handleEdit(params.row)}
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
        // {
        //   field: "status",
        //   headerName: "Status",
        //   width: 160,
        //   renderCell: (params) => {
        //     return (
        //       <div className={`cellWithStatus ${params.row.status}`}>
        //         {params.row.status}
        //       </div>
        //     );
        //   },
        // },
      ];
  useEffect(() => {
    fetchClasses();
    fetchMCQ();
  }, [userId]);

  useEffect(() => {
    console.log("Class", selectedClasses);
    if (selectedClasses !== null && selectedClasses.length !== 0) {
      fetchSubjects();
      setMCQs(
        allMCQs.filter((item) => {
          return item.class_id === selectedClasses.id;
        })
      );
    }
  }, [selectedClasses]);

  useEffect(() => {
    console.log("Subject", selectedSubject);
    if (selectedSubject !== null && selectedSubject.length !== 0) {
      fetchChapters();
      setMCQs(
        allMCQs.filter((item) => {
          return item.subject_id === selectedSubject.id;
        })
      );
    }
  }, [selectedSubject]);

  useEffect(() => {
    if (selectedChapters !== null && selectedChapters.length !== 0) {
      fetchTopics();
      setMCQs(
        MCQs.filter((item) => {
          return item.chapter_id === selectedChapters.id;
        })
      );
    }
    console.log("Selectedchapters", selectedChapters);
  }, [selectedChapters]);

  useEffect(() => {
    if (selectedTopic !== null && selectedTopic.length !== 0  ) {
      setMCQs(
        MCQs.filter((item) => {
          return item.topic_id === selectedTopic.id;
        })
      );
    }
    console.log("Selected topics", selectedTopic);
  }, [selectedTopic]);


  const HtmlRenderer = ({ value }) => {
    const cleanHtml = DOMPurify.sanitize(value || '');
    console.log("Cleaned Value:", value);
    console.log("Cleaned HTML:", cleanHtml);
      return (
        <div 
          dangerouslySetInnerHTML={{ __html: cleanHtml }} 
          style={{ 
            maxHeight: '100px', 
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical'
          }}
        />
      );
    };

  const handleNavigate = () => {
    if(flag) {
      setFlag(false)
    }
    else{
      navigate("/Home")
    }
  }
  const handleCreate = () => {
    navigate('/CreateMCQ')
  }
  const handleEdit = (mcq) => {
    setMCQInfo(mcq);
    setFlag(true)
  }
  const handleDelete = (id) => {
    console.log("Tried to deleted")
    fetch(`http://localhost:3000/Examination/deleteMCQ/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Deleted MCQ", id);
        if (data.code === 200) {
          console.log("MCQ deleted successfully")
          setMCQs((prevMCQS)=>prevMCQS.filter((item) => item.id !== id));
          toast.success("MCQ deleted successfully")
        } else {
          console.log("MCQ not deleted");
        }
      })
      .catch((error) => {
        console.error("Error deleting question:", error);
      });
  }
  const fetchClasses = () => {
    console.log("UserID", userId);
    fetch("http://localhost:3000/Examination/reviewClassesByUserID", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Classes data", data);
        if (data.code === 200) {
          setClasses(data.data);
          setSelectedClasses(null);
        } else {
          console.log("Class data not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching chapters:", error);
      });
  };
  const fetchSubjects = () => {
    fetch("http://localhost:3000/Examination/reviewSubjectsByClassID", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ class_id: selectedClasses.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Subjects data", data);
        if (data.code === 200) {
          setSubjects(data.data);
          setSelectedSubject(null);
        } else {
          console.log("Chapter data not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching chapters:", error);
      });
  };
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
            setSelectedChapters(null);
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
                setSelectedTopics(null);
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
    fetch("http://localhost:3000/Examination/reviewMCQByUserID", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({user_id: userId})
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
      <Box sx={{ width: '100%', height: '100vh', overflow: 'hidden', backgroundColor: "white" }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
          {/* Sidebar or Left Section */}
          <Sidebar style = {{sidebarStyle}} />
          <Box sx={{ flex: 6, display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', overflowX: 'hidden'}}>
            {/* Header Section */}
            <Navbar/>
            <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
              <Button variant="text" sx={{ display: 'flex', px: 2, py: 2, fontSize: '1.25rem', alignItems: 'center', color: "#7451f8", }} onClick={handleNavigate}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </Button>
              <Typography variant="h3" sx={{ fontFamily: 'Mar', ml: 2, color: "#7451f8", }}>
                MCQ Bank
              </Typography>
              {flag===false?(
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleCreate} 
                sx={{ 
                  fontWeight: 'bold', 
                  marginLeft: 90, 
                  width: 200, 
                  height: 50, 
                  backgroundColor: "#7451f8",
                  '&:hover': {
                    backgroundColor: '#5a3acb', // Darker purple for hover
                    // Optional: Add slight scale effect
                    transform: 'scale(1.02)',
                    transition: 'all 0.2s ease'
                  }
                }}
              >
                Create MCQ
              </Button>
              ):(<></>)}
            </Box>
            {!flag ? (
                <Box
                  sx={{
                    ml: 3,
                    display: "flex", // Enables flexbox
                    flexDirection: "row", // Aligns children horizontally
                    gap: "60px", // Reduce space between the boxes
                    justifyContent: "flex-start", // Aligns boxes to the start of the container
                    alignItems: "center", // Vertically aligns items in the center
                  }}
                >
                  <Box>
                    <DropDown
                      name="Class"
                      data={classes}
                      selectedData={selectedClasses}
                      setSelectedData={setSelectedClasses}
                      width={250}
                    />
                  </Box>
                  <Box>
                    <DropDown
                      name="Subjects"
                      data={subjects}
                      selectedData={selectedSubject}
                      setSelectedData={setSelectedSubject}
                      width={250}
                      disableFlag={true}
                      disabled={selectedClasses}
                    />
                  </Box>
                  <Box>
                    <DropDown
                      name="Chapters"
                      data={Chapters}
                      selectedData={selectedChapters}
                      setSelectedData={setSelectedChapters}
                      width={250}
                      disableFlag={true}
                      disabled={selectedSubject}
                    />
                  </Box>
                  <Box>
                    <DropDown
                      name="Topics"
                      data={Topic}
                      selectedData={selectedTopic}
                      setSelectedData={setSelectedTopics}
                      width={250}
                      disableFlag={true}
                      disabled={selectedChapters}
                    />
                  </Box>
                </Box>
              ) : (
                <></>
              )}
            {/* Content Section */}
            {flag === true ? <MCQEditor MCQ={MCQInfo} setFlag={setFlag} setMCQ={setMCQInfo}/> :(
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '8px',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  px: 2,               // Theme spacing value (16px if using default theme)
                  py: 0,               // 0 padding on top/bottom
                  height: "100%"
                }}
              >
                <DataGrid
                  className="datagrid"
                  rows={MCQs}
                  columns={Columns}
                  pageSize={9}
                  rowsPerPageOptions={[9]}
                  components={{
                    Toolbar: GridToolbar,
                  }}
                />
              </Box>
              )}
            {/* <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 2 }}>
             { console.log("1Selected MCQs", MCQs)}
              <MCQinfo MCQData={MCQs} flag={flag} setFlag={setFlag} setMCQData={setMCQs}/>
            </Box> */}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
