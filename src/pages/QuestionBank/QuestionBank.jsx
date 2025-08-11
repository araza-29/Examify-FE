import Sidebar from "../../components/sidebar/Sidebar";
import QuestionEditor from "./QuestionEditor";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import { DataGrid, GridToolbar, getGridSingleSelectOperators } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import toast from "react-hot-toast"
import {
  Card,
  Typography,
  Box,
  Grid,
  CardContent,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  FormControl,
  Button,
  CardActions,
  FormHelperText
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenSquare,
  faCalendar,
  faClock,
  faClipboard,
  faSchoolCircleXmark,
  faSchool,
  faXmarkCircle,
  faArrowLeft,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import Questioninfo from "./QuestionsInfo";
import DropDown from "../../components/DropDown/DropDown";
import { useNavigate, Link } from "react-router-dom";
import QuestionCreater from "./QuestionCreater";
import { Subject } from "@mui/icons-material";

const Home = () => {
  const navigate = useNavigate();
  const homeStyle = {
    display: "flex",
    height: "100vh",
    width: "100vw",
  };

  const sidebarStyle = {
    width: "20px",
  };

  const navbarStyle = {
    width: "200px",
  };

  const cardContainerStyle = {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const cardStyle = {
    width: "300px",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  };
  const [AllowEdit, setAllowEdit] = useState(false);
  let [token] = useState(localStorage.getItem("token"));

  const redirectToLogin = () => {
    alert("Please Login first then you can access this page...");
    window.location.href = "/"; // Replace "/login" with the actual login page path
  };
  const [QuestionFlag, setQuestionFlag] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [Subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [Questions, setQuestions] = useState([]);
  const [Chapters, setChapters] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [topic, setTopics] = useState([]);
  const [selectedChapters, setSelectedChapters] = useState(null);
  const [selectedTopic, setSelectedTopics] = useState(null);
  const [userID, setUserID] = useState(parseInt(localStorage.getItem("userId"), 10));
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    fetchClasses();
    fetchQuestion();
  }, [userID]);

  useEffect(() => {
    console.log("Class", selectedClasses);
    if (selectedClasses !== null && selectedClasses.length !== 0) {
      fetchSubjects();
      setQuestions(
        allQuestions.filter((item) => {
          return item.class_id === selectedClasses.id;
        })
      );
    }
  }, [selectedClasses]);

  useEffect(() => {
    console.log("Subject", selectedSubject);
    if (selectedSubject !== null && selectedSubject.length !== 0) {
      fetchChapters();
      setQuestions(
        allQuestions.filter((item) => {
          return item.subject_id === selectedSubject.id;
        })
      );
    }
  }, [selectedSubject]);

  useEffect(() => {
    if (selectedChapters !== null && selectedChapters.length !== 0) {
      fetchTopics();
      setQuestions(
        Questions.filter((item) => {
          return item.chapter_id === selectedChapters.id;
        })
      );
    }
    console.log("Selectedchapters", selectedChapters);
  }, [selectedChapters]);

  useEffect(() => {
    if (selectedTopic !== null && selectedTopic.length !== 0  ) {
      setQuestions(
        Questions.filter((item) => {
          return item.topic_id === selectedTopic.id;
        })
      );
    }
    console.log("Selected topics", selectedTopic);
  }, [selectedTopic]);

  const fetchClasses = () => {
    console.log("UserID", userID);
    fetch("http://localhost:3000/Examination/reviewClassesByUserID", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userID }),
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
    console.log("From fetchSubject UserID", userID);
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
    fetch("http://localhost:3000/Examination/reviewChaptersBySubjectId", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subject_id: selectedSubject.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Chapter data", data);
        if (data.code === 200) {
          setChapters(data.data);
          setSelectedChapters(null);
        } else {
          console.log("Chapter data not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching chapters:", error);
      });
  };
  const fetchTopics = () => {
    if (selectedChapters.id) {
      fetch("http://localhost:3000/Examination/reviewTopicsByChapterId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chapter_id: selectedChapters.id }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Topic data", data);
          if (data.code === 200) {
            setTopics(data.data);
            setSelectedTopics(null);
          } else {
            console.log("Topics data not found");
          }
        })
        .catch((error) => {
          console.error("Error fetching topics:", error);
        });
    }
  };
  const fetchQuestion = () => {
    fetch(
      "http://localhost:3000/Examination/reviewEveryDetailsQuestionsByUserID",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userID }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Received data:", data); // Check the structure
        if (data.code === 200) {
          setQuestions(data.data);
          setAllQuestions(data.data);
        } else {
          console.error("Unexpected response code:", data.code);
        }
      })
      .catch((error) => {
        console.error("Error in response:", error);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  };
  const [QuestionInfo, setQuestionInfo] = useState([]);
  const toggleQuestionEditor = (Question) => {
    console.log("Heyo from question editor");
    console.log("Selected Question", Question);
    setQuestionInfo(Question);
    setFlag(true);
  };
  const handleSaveQuestion = (editedQuestion) => {
    console.log("Heyo from handle saver");
    setQuestions((prevMCQData) =>
      prevMCQData.map((mcq) =>
        mcq.id === editedQuestion.id ? editedQuestion : mcq
      )
    );
  };

  const handleDelete = (id) => {
    console.log("Tried to deleted")
    fetch(`http://localhost:3000/Examination/deleteQuestion/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Deleted Questions", id);
        if (data.code === 200) {
          console.log("Questions deleted successfully")
          setQuestions((prevQuestions) =>
            prevQuestions.filter((item) => item.id !== id)
          );
          toast.success("Question deleted successfully")
        } else {
          console.log("Question not deleted");
        }
      })
      .catch((error) => {
        console.error("Error deleting question:", error);
      });
  }
  const handleNavigate = () => {
    if(flag) {
      setFlag(false)
    }
    else {
      navigate("/Home")
    }
  }
  const questionColumns = [
    { field: "id", headerName: "ID", width: 70 },
    // {
    //   field: "center_id",
    //   headerName: "Center Id",
    //   width: 230,
    // },
    {
      field: "name",
      headerName: "Question",
      width: 300,
    },
    {
      field: "marks",
      headerName: "Marks",
      width: 70 ,
    },
    {
      field: "topic_name",
      headerName: "Topic",
      width: 200,
      filterable: true,
      type: 'singleSelect', // important
      valueOptions: topic.map(option => option.name),
      filterOperators: getGridSingleSelectOperators(),
    },
    {
      field: "chapter_name",
      headerName: "Chapter",
      width: 230,
      filterable: true,
      type: 'singleSelect', // important
      valueOptions: Chapters.map(option => option.name),
      filterOperators: getGridSingleSelectOperators(),
    },
    {
      field: "subject_name",
      headerName: "Subject",
      filterable: true,
      type: 'singleSelect', // important
      valueOptions: Subjects.map(option => option.name),
      filterOperators: getGridSingleSelectOperators(),
      width: 120,
    },
    {
      field: "class_name",
      headerName: "Class",
      filterable: true,
      type: 'singleSelect', // important
      valueOptions: classes.map(option => option.name),
      filterOperators: getGridSingleSelectOperators(),
      width: 70,
    },
   {
      field: "action",
      headerName: "Action",
      width: 180,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", gap: "50px" }}>

          <div
            onClick={()=>{toggleQuestionEditor(params.row)}}
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

  useEffect(() => {
    handleSaveQuestion(QuestionInfo);
  }, [QuestionInfo]);

  console.log("Questions after parameter", Questions);
  const handleCreate = () => {
    navigate("/CreateQuestion");
  };
  return (
    <div className="home" style={homeStyle}>
      <Box sx={{ width: "100%", height: "100vh", overflow: "hidden", backgroundColor: "white" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "100%",
          }}
        >
          {/* Sidebar or Left Section */}
          <Sidebar />
          <Box
            sx={{
              flex: 6,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <Navbar/>
            {/* Header Section */}
            <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
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
                onClick={handleNavigate}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </Button>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "Mar",
                  ml: 2,
                  color: "#7451f8",
                }}
              >
                Question Bank
              </Typography>
              {flag===false?(
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreate}
                sx={{
                  fontWeight: "bold",
                  marginLeft: 80,
                  width: 200,
                  height: 50,
                  backgroundColor: "#7451f8",
                  '&:hover': {
                      backgroundColor: '#5a3acb',
                      transform: 'scale(1.02)',
                      transition: 'all 0.2s ease'
                  }
                }}
              >
                Create Question
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
                    data={Subjects}
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
                    data={topic}
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
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                px: 2,
              }}
            >
              {console.log("1Selected QUestions", Questions)}
              {flag === true ? (
                <QuestionEditor
                  Questions={QuestionInfo}
                  setFlag={setFlag}
                  setQuestion={setQuestionInfo}
                />
              ) : (
                <>
                  {/* {QuestionsData.map((Question) => {
                                  return <>
                                  <List sx = {css} >
                                  <ListItem key={Question.id} disablePadding>
                                  <ListItemButton
                                      onClick={()=>{toggleQuestionEditor(Question)}}
                                      sx={{
                                      width: '100%', // Makes the ListItemButton span the entire List width
                                      padding: '16px', // Add padding for better spacing
                                      '&:hover': {
                                          backgroundColor: 'rgba(0, 0, 0, 0.1)', // Light hover effect
                                      },
                                      }}
                                  >
                                      <ListItemText
                                      primary={
                                          <>
                                              <Typography
                                                  variant="h6"
                                                  sx={{
                                                      fontWeight: 'bold',
                                                      color: 'text.primary',
                                                      fontSize: '1.4rem', // Slightly larger for emphasis
                                                  }}
                                              >
                                                  {Question.name}
                                              </Typography>
              
                                              <Typography
                                                  variant="body1"
                                                  sx={{
                                                      fontSize: '1rem',
                                                      color: 'text.secondary',
                                                      mt: 1, // Adds margin-top for spacing
                                                  }}
                                              >
                                                  Marks: <strong>{Question.marks}</strong>
                                              </Typography>
              
                                              <Typography
                                                  variant="body1"
                                                  sx={{
                                                      fontSize: '1rem',
                                                      color: 'text.secondary',
                                                      mt: 0.5,
                                                  }}
                                              >
                                                  Subject: <strong>{Question.subject_name}</strong>
                                              </Typography>
              
                                              <Typography
                                                  variant="body1"
                                                  sx={{
                                                      fontSize: '1rem',
                                                      color: 'text.secondary',
                                                      mt: 0.5,
                                                  }}
                                              >
                                                  Chapter: <strong>{Question.chapter_name}</strong>
                                              </Typography>
              
                                              <Typography
                                                  variant="body1"
                                                  sx={{
                                                      fontSize: '1rem',
                                                      color: 'text.secondary',
                                                      mt: 0.5,
                                                  }}
                                              >
                                                  Topic: <strong>{Question.topic_name}</strong>
                                              </Typography>
                                          </>
                                          
              
                                      }
                                      />
                                  </ListItemButton>
                                  </ListItem>
                                  </List>
                                  </>
                                  }
                                  )
                              } */}
                  {console.log("Questions check", Questions)}
                  <DataGrid
                    className="datagrid"
                    rows={Questions}
                    columns={questionColumns}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    components={{
                      Toolbar: GridToolbar,
                    }}
                  />
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
