import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Paper from "../Paper/Paper";
import DraggableQuestions from "../../components/DraggableQuestions/DraggableQuestions";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
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
  Dialog,
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
import { ModalSelectQuestions } from "./ModalSelectQuestions";
import { ModalSelectMCQs } from "./ModalSelectMCQs";
import { QuestionMarkSharp } from "@mui/icons-material";
import { LucideTwitter } from "lucide-react";

function PaperHeaderEditInfo({ OldData, setOldData, setEditOpen }) {
  const [editedInfo, setEditedInfo] = useState({ ...OldData });
  const SaveChanges = () => {
    setOldData({ ...editedInfo });
    setEditOpen(false);
  };
  return (
    <Card
      sx={{
        width: "100%",
        height: 600,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flex: 1, overflowY: "auto" }}>
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
              onChange={(event) =>
                setEditedInfo({ ...editedInfo, class: event.target.value })
              }
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
            value={editedInfo.instruction}
            onChange={(value) =>
              setEditedInfo({ ...editedInfo, instruction: value.target.value })
            }
          />
          <TextField
            label="Sections"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            value={editedInfo.sections}
            onChange={(value) =>
              setEditedInfo({ ...editedInfo, sections: value.target.value })
            }
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
                  onChange={(value) =>
                    setEditedInfo({
                      ...editedInfo,
                      ExaminationYear: value.target.value,
                    })
                  }
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
            <Grid></Grid>
          </Box>
        </Box>
      </CardContent>
      <CardActions>
        <Grid sx={{ pt: 0, display: "flex", justifyContent: "flex-end" }}>
          <Button
            sx={{
              background: "linear-gradient(90deg, #2196F3 0%, #21CBF3 100%)",
              color: "white",
              "&:hover": {
                background: "linear-gradient(90deg, #1976D2 0%, #21CBF3 100%)",
              },
            }}
            onClick={SaveChanges}
          >
            Save Changes
          </Button>
          <Button
            sx={{
              ml: 2, // Converts 'ml-2' (margin-left)
              background: "linear-gradient(90deg, #2196F3 0%, #21CBF3 100%)", // Simulates gradient variant
            }}
            onClick={() => setEditOpen(false)}
          >
            Cancel
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
}
function PaperHeaderInfo({ OldData, setOldData, setEditOpen }) {
  const Tag = ({ children }) => {
    return (
      <Box
        display="inline-flex"
        alignItems="center"
        px={1.5} // Adjust padding for a smaller size
        py={0.75} // Adjust padding for a smaller size
        m={0.5} // Adjust margin for a compact look
        borderRadius="16px" // Slightly larger border radius for a modern look
        lineHeight="1.2" // Adjust line height for better readability
        bgcolor="#2F2F2F"
        color="#9E9E9E" // Custom gray color for text
        fontSize="0.75rem" // Font size to match the text-xs
        textTransform="uppercase"
        sx={{ userSelect: "none", boxShadow: 1 }} // Add shadow for a cool effect
      >
        <Typography component="span">{children}</Typography>
      </Box>
    );
  };
  return (
    <Box
      sx={{
        width: "91.666%", // w-11/12
        height: "30%",
        my: 2, // my-2
        bgcolor: "white", // bg-white
        borderRadius: 2, // rounded-xl
        p: 4, // p-4
        boxShadow: 3, // shadow-lg
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          variant="h4"
          sx={{ fontFamily: '"font-mar", Arial, sans-serif', opacity: 0.75 }}
        >
          Header Info
        </Typography>
        <FontAwesomeIcon
          style={{ fontSize: "3rem" }}
          icon={faPenSquare}
          onClick={() => setEditOpen(true)}
        />
      </Box>

      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                fontFamily: '"font-mar", Arial, sans-serif',
                opacity: 0.75,
              }}
            >
              <FontAwesomeIcon
                style={{ marginRight: "0.5rem" }}
                icon={faClipboard}
              />
              <Typography> Semester {OldData.class}</Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                fontFamily: '"font-mar", Arial, sans-serif',
                opacity: 0.75,
              }}
            >
              <FontAwesomeIcon
                style={{ marginRight: "0.5rem" }}
                icon={faCalendar}
              />
              <Typography> Examination {OldData.ExaminationYear}</Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                fontFamily: '"font-mar", Arial, sans-serif',
                opacity: 0.75,
              }}
            >
              <FontAwesomeIcon
                style={{ marginRight: "0.5rem" }}
                icon={faPenSquare}
              />
              <Typography> Marks: {OldData.marks}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                fontFamily: '"font-mar", Arial, sans-serif',
                opacity: 0.75,
              }}
            >
              <FontAwesomeIcon
                style={{ marginRight: "0.5rem" }}
                icon={faClock}
              />
              <Typography> Hrs {OldData.duration}</Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                fontFamily: '"font-mar", Arial, sans-serif',
                opacity: 0.75,
              }}
            >
              <FontAwesomeIcon
                style={{ marginRight: "0.5rem" }}
                icon={faCalendar}
              />
              <Typography> {OldData.date}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              display="flex"
              alignItems="center"
              sx={{ fontFamily: '"font-mar", Arial, sans-serif' }}
            >
              {/* <FontAwesomeIcon style={{ marginRight: '0.5rem' }} icon={faSchool} /> */}
              <Box display="flex" flexWrap="wrap" sx={{ pt: "0.27rem" }}>
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
const Teacher = () => {
  const location = useLocation();
  const [paper, setPaper] = useState(location.state?.paper || []);
  const homeStyle = {
    display: "flex",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#f0f2f5",
  };

  const sidebarStyle = {
    width: "50px",
    backgroundColor: "#333",
  };

  const navbarStyle = {
    width: "200px",
    backgroundColor: "#333",
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
  const [selectedQuestion, setQuestions] = useState([]);
  const [selectedMCQ, setMCQs] = useState([]);
  const [sectionLetters, setSectionLetters] = useState([]);
  const [sectionFlag, setSectionFlag] = useState(false);
  let [token] = useState(localStorage.getItem("token"));
  const [sectionIndex, setSectionIndex] = useState(null);
  const [type, setType] = useState("");
  const [desc, setDesc] = useState("");
  const [marks, setMarks] = useState(0);
  const [exsistingInfo, setExsistingInfo] = useState({
    header: "FAST NUCES".toUpperCase(),
    centerName: [],
    class: "Class",
    subject: "Subject Name",
    ExaminationYear: "2023",
    departmentNames: ["Karachi", "Lahore"],
    sections: 3,
    duration: "4 hours",
    marks: 80,
    date: new Date().toISOString().split("T")[0],
    instruction: "No Instruction just attempt the Paper",
  });

  useEffect(()=>{
    console.log("PaperCheck", paper);
    console.log("PaperIDCheck", paper.id);
    setExsistingInfo({
      ...exsistingInfo,
      subject: paper.subject_name,
      class: paper.class_name,
      ExaminationYear: paper.year,
      duration: paper.duration,
      marks: paper.marks,
    })
    fetch("http://localhost:3000/Examination/reviewSectionByPaperID", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paper_id: paper.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          console.log("Data.data.section", data);
          setSectionLetters(data.data);
          setExsistingInfo((prevInfo) => ({
            ...prevInfo,
            sections: data.data.length,
          }));
        }
      })
    fetch("http://localhost:3000/Examination/reviewQuestionsByPaperID", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paper_id: paper.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          console.log("Data Questions:", data);
          const updatedQuestions = data.data.map((question) => {
            // Find the matching section object
            const matchedSection = sectionLetters.find(
              (section) => section.id === question.section_id
            );

            // Add the `section` field with `name` if match found, otherwise keep it undefined
            return {
              ...question,
              section: matchedSection ? matchedSection.name : null,
            };
          });

          setQuestions(updatedQuestions);

          console.log("Updated Questions:", updatedQuestions);
        }
      })
      .catch((error) => console.error("Error fetching questions:", error));
      fetch("http://localhost:3000/Examination/reviewMCQsByPaperID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paper_id: paper.id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 200) {
            console.log("Data Questions:", data);
            const updatedQuestions = data.data.map((question) => {
              // Find the matching section object
              const matchedSection = sectionLetters.find(
                (section) => section.id === question.section_id
              );
  
              // Add the `section` field with `name` if match found, otherwise keep it undefined
              return {
                ...question,
                section: matchedSection ? matchedSection.name : null,
              };
            });
  
            setMCQs(updatedQuestions);
  
            console.log("Updated Questions:", updatedQuestions);
          }
        })
        .catch((error) => console.error("Error fetching questions:", error));
  }, [paper]);

  useEffect(() => {
    console.log("Updated Sections Length:", exsistingInfo.sections);
    console.log("Previous Section Letters:", sectionLetters);
    
    setSectionLetters(() =>
      Array.from({ length: exsistingInfo.sections }, (_, index) => ({
        id: sectionLetters[index]?.id || 0,
        name: `Section ${String.fromCharCode(65 + index)}`,
        type: sectionLetters[index]?.type || ``,
        description: sectionLetters[index]?.description || ``,
        marks: sectionLetters[index]?.marks || 0,
      }))
    );
  }, [exsistingInfo.sections]);
  
  // const fetchSections = () => {
  //   fetch("http://localhost:3000/Examination/updateQuestion", {
  //       method: "POST",
  //       headers: {
  //           'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({id: Questions.id, name: Questions.name, topic_id: selectedTopic.id, marks: Questions.marks, subject_id: selectedSubject.id, selected: false})
  //   })
  //   .then(response => response.json())
  //   .then((data) => {
  //       if(data.code === 200) {
  //           console.log("Question Uploaded successfully!");
  //       }
  //   })
  // }
  // const redirectToLogin = () => {
  //   alert("Please Login first then you can access this page...");
  //   window.location.href = '/'; // Replace "/login" with the actual login page path
  // };
  const handleSubmitButton = async (action) => {
    console.log("Section", sectionLetters);
    var completed;
    if (action === "") {
      completed = 0;
    } else if ("Submit") {
      completed = 1;
    }
    var paper = 0;
    const user = 1;
    const response = await fetch(
      "http://localhost:3000/Examination/createPaper",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject_id: 1,
          user_id: user,
          month: 3,
          completed: completed,
        }),
      }
    );

    const data = await response.json();

    if (data.code === 200) {
      console.log("Paper Created successfully!");
      paper = data.data.id;
    }

    console.log("PaperId", paper);
    // 2️⃣ Create Sections and Wait for All Responses
    const sectionPromises = sectionLetters.map((sec) =>
      fetch("http://localhost:3000/Examination/createSection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: sec.name,
          paper_id: paper,
          type: sec.type,
          description: sec.description,
          marks: sec.marks,
        }),
      })
        .then((response) => response.json())
        .catch((error) => {
          console.error(`❌ Error creating section ${sec.name}:`, error);
          return null; // Prevent breaking the loop if a request fails
        })
    );

    // 3️⃣ Wait for all section API calls to complete
    const sectionResponses = await Promise.all(sectionPromises);

    // 4️⃣ Update `sectionLetters` with IDs from API responses
    const updatedSections = sectionLetters.map((sec, index) => {
      const response = sectionResponses[index];

      if (!response || !response.data || !response.data.id) {
        console.error(
          `❌ Section creation failed for ${sec.name}, skipping...`
        );
        return sec; // Keep the original section if it failed
      }

      return { ...sec, id: response.data.id };
    });

    setSectionLetters(updatedSections);
    console.log("Updated Sections", updatedSections);

    console.log("Selected Question", selectedQuestion);
    selectedQuestion.map((q) => {
      const foundSection = updatedSections.find(
        (sec) => sec.name === q.section
      );
      fetch("http://localhost:3000/Examination/createQuestionMapping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paper_id: paper,
          question_id: q.id,
          section_id: foundSection.id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 200) {
            console.log("Question Mapping Created successfully! ", q.id);
          }
        });
    });
    selectedMCQ.map((q) => {
      const foundSection = updatedSections.find(
        (sec) => sec.name === q.section
      );
      fetch("http://localhost:3000/Examination/createQuestionMapping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paper_id: paper,
          mcq_id: q.id,
          section_id: foundSection.id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 200) {
            console.log("Question Mapping Created successfully! ", q.id);
          }
        });
    });
    await Promise.all(questionPromises);
    console.log("All Question Mappings Created Successfully!");
  };
  const marksTotal = (section, type) => {
    var sum = 0;
    console.log("selectedQuestion", selectedQuestion);
    console.log("selectedQuestion[0]", selectedQuestion);
    if (type === "Multiple Choice Questions") {
      selectedMCQ.forEach((q) => {
        if (q.section == section) sum = sum + q.marks;
      });
    } else {
      selectedQuestion.forEach((q) => {
        if (q.section == section) sum = sum + q.marks;
      });
    }
    console.log(sum);
    return sum;
  };
  console.log(sectionLetters);
  const MCQMarks = () => {
    var sum = 0;
    selectedMCQ.forEach((q) => {
      sum = sum + 1;
    });
    console.log(sum);
  };
  return (
    <div className="home" style={homeStyle}>
      <Box sx={{ width: "100%", height: "100vh", overflow: "hidden" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "100%",
          }}
        >
          {/* Sidebar or Left Section */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            {/* Header Section */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button
                  variant="text"
                  sx={{
                    display: "flex",
                    px: 2,
                    py: 2,
                    fontSize: "1.25rem",
                    alignItems: "center",
                  }}
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </Button>
                <Typography
                  variant="h3"
                  sx={{ fontFamily: "Mar", opacity: 0.75, ml: 2 }}
                >
                  Paper Editor
                </Typography>
              </Box>
              <Button
                variant="contained"
                onClick={() => handleSubmitButton("")}
                color="primary"
                sx={{ px: 3, py: 1.5, fontSize: "1rem" }}
              >
                Save Paper
              </Button>
              <Button
                variant="contained"
                onClick={() => handleSubmitButton("Submit")}
                color="primary"
                sx={{ px: 3, py: 1.5, fontSize: "1rem" }}
              >
                Submit Paper
              </Button>
            </Box>

            {/* Content Section */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                padding: 2,
              }}
            >
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
              <Box sx={{ width: "91.666667%", my: 2 }}>
                <ModalSelectMCQs
                  setMCQs={setMCQs}
                  SelectedMCQs={selectedMCQ}
                  sections={sectionLetters}
                ></ModalSelectMCQs>
              </Box>
              <Box sx={{ width: "91.666667%", my: 2 }}>
                <ModalSelectQuestions
                  setQuestions={setQuestions}
                  SelectedQuestions={selectedQuestion}
                  sections={sectionLetters}
                ></ModalSelectQuestions>
              </Box>
              {console.log("SectionLetters check", sectionLetters)}
              {sectionLetters.map((letter, index) => (
                <>
                  <Box sx={{ display: "flex", flexDirection: "row", gap: 20 }}>
                    <Typography
                      sx={{
                        fontSize: "2rem", // Customize font size
                        fontWeight: "bold", // Make the text bold
                        color: "#333", // Text color for main content
                        mb: 1, // Add margin-bottom to separate content
                      }}
                    >
                      {letter.name}
                    </Typography>
                    <Box
                      sx={{ display: "flex", flexDirection: "row", gap: 30 }}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "2rem", marginTop: "10px" }}
                        icon={faTimesCircle}
                        onClick={() => {
                          setSectionFlag(true);
                          setSectionIndex(index);
                          setType(letter.type);
                          setDesc(letter.description);
                        }}
                      />
                    </Box>
                    <Dialog
                      open={sectionFlag && sectionIndex === index}
                      onEnter={() => {
                        setType(letter.type);
                        setDesc(letter.description);
                        setMarks(letter.marks);
                      }}
                      onClose={(index) => {
                        setSectionFlag(false);
                        setSectionIndex(null);
                      }}
                      maxWidth="l"
                      sx={{
                        "& .MuiDialog-paper": {
                          borderRadius: "8px",
                          padding: "16px",
                          width: "1000px", // Set the desired fixed width
                          maxWidth: "100%", // Ensures responsiveness
                        },
                      }}
                    >
                      <Card
                        sx={{
                          padding: "20px",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                          backgroundColor: "#ffffff",
                          width: "900px",
                          height: "300px",
                          maxWidth: "100%",
                        }}
                      >
                        <Box
                          sx={{ display: "flex", flexDirection: "row", gap: 5 }}
                        >
                          {console.log("l", letter)}
                          <Box sx={{ display: "flex" }}>
                            <Typography
                              sx={{
                                fontSize: "2rem", // Customize font size
                                fontWeight: "bold", // Make the text bold
                                color: "#333", // Text color for main content
                                mb: 1, // Add margin-bottom to separate content
                              }}
                            >
                              {letter.name}
                            </Typography>
                          </Box>
                          <Box>
                            <FormControl
                              sx={{
                                width: "100%",
                                marginTop: "8px",
                                marginBottom: "8px",
                              }}
                            >
                              <Select
                                value={type}
                                onChange={(e) => {
                                  setType(e.target.value);
                                }}
                                displayEmpty
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    borderRadius: "6px",
                                    "&:hover .MuiOutlinedInput-notchedOutline":
                                      {
                                        borderColor: "#90caf9",
                                      },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                      {
                                        borderColor: "#2196f3",
                                      },
                                  },
                                  "& .MuiSelect-select": {
                                    padding: "12px 14px",
                                    minHeight: "20px",
                                  },
                                  "& .MuiMenuItem-root": {
                                    padding: "12px 16px",
                                    "&:hover": {
                                      backgroundColor: "#f5f5f5",
                                    },
                                    "&.Mui-selected": {
                                      backgroundColor: "#e3f2fd",
                                      "&:hover": {
                                        backgroundColor: "#bbdefb",
                                      },
                                    },
                                  },
                                }}
                              >
                                <MenuItem value="">Section Type</MenuItem>
                                <MenuItem value="Descriptive Questions">
                                  Descriptive Questions
                                </MenuItem>
                                <MenuItem value="Multiple Choice Questions">
                                  Multiple Choice Questions
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                          <Box>
                            <TextField
                              value={desc}
                              onChange={(e) => {
                                setDesc(e.target.value);
                              }}
                            >
                              Description
                            </TextField>
                          </Box>
                          <Box>
                            <TextField
                              type="number"
                              value={marks}
                              onChange={(e) => {
                                setMarks(e.target.value);
                              }}
                            >
                              Marks
                            </TextField>
                          </Box>
                        </Box>
                        <CardActions>
                          <Grid
                            sx={{
                              pt: 0,
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Button
                              sx={{
                                background:
                                  "linear-gradient(90deg, #2196F3 0%, #21CBF3 100%)",
                                color: "white",
                                "&:hover": {
                                  background:
                                    "linear-gradient(90deg, #1976D2 0%, #21CBF3 100%)",
                                },
                              }}
                              onClick={() => {
                                const updatedSections = [...sectionLetters];
                                updatedSections[index] = {
                                  ...letter,
                                  description: desc,
                                  type: type,
                                  marks: marks,
                                };
                                setSectionLetters(updatedSections);
                                setType("");
                                setSectionFlag(false);
                              }}
                            >
                              Save Changes
                            </Button>
                            <Button
                              sx={{
                                ml: 2, // Converts 'ml-2' (margin-left)
                                background:
                                  "linear-gradient(90deg, #2196F3 0%, #21CBF3 100%)", // Simulates gradient variant
                              }}
                              onClick={() => setSectionFlag(false)}
                            >
                              Cancel
                            </Button>
                          </Grid>
                        </CardActions>
                      </Card>
                    </Dialog>
                  </Box>
                  <Box sx={{ width: "91.666667%", my: 2 }}>
                    <Typography
                      sx={{
                        fontSize: "1.25rem", // Customize font size
                        fontWeight: "bold", // Make the text bold
                        color: "#333", // Text color for main content
                        mb: 1, // Add margin-bottom to separate content
                      }}
                    >
                      Selected Question: {marksTotal(letter.name, letter.type)}/
                      {letter.marks}
                    </Typography>
                    {console.log("Letter", selectedQuestion)}
                    {console.log("SectionLetter", letter.name)}
                    {selectedQuestion.length !== 0 &&
                    letter.type === "Descriptive Questions" ? (
                      <DraggableQuestions
                        section={letter}
                        SetQuestions={setQuestions}
                        Questions={selectedQuestion}
                      />
                    ) : (
                      <Typography
                        sx={{
                          fontSize: "1rem", // Slightly smaller font for no questions
                          color: "#999", // Grey color for subtle text
                          fontStyle: "italic", // Italic style for emphasis
                        }}
                      >
                        No Questions Selected yet
                      </Typography>
                    )}
                    {selectedMCQ.length !== 0 &&
                    letter.type === "Multiple Choice Questions" ? (
                      <DraggableQuestions
                        section={letter}
                        SetQuestions={setMCQs}
                        Questions={selectedMCQ}
                      />
                    ) : (
                      <Typography
                        sx={{
                          fontSize: "1rem", // Slightly smaller font for no questions
                          color: "#999", // Grey color for subtle text
                          fontStyle: "italic", // Italic style for emphasis
                        }}
                      >
                        No Questions Selected yet
                      </Typography>
                    )}
                  </Box>
                </>
              ))}
            </Box>
          </Box>

          {/* Paper Viewer Section */}
          {console.log(selectedMCQ)}
          {console.log(selectedQuestion)}
          <Box sx={{ flex: 1, overflow: "auto", height: "100%" }}>
            <Paper
              htmlQuestions={selectedQuestion}
              htmlMCQ={selectedMCQ}
              BasicInfo={exsistingInfo}
              section={sectionLetters}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Teacher;
