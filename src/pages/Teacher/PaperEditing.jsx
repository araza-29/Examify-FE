import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Paper from "../Paper/Paper";
import toast from 'react-hot-toast';
import { faCheckCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import DraggableQuestions from "../../components/DraggableQuestions/DraggableQuestions";
import SectionHandler from "../../components/sectionHandler/sectionHandler"
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
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
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold"}}>
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
              backgroundColor: "#7451f8",
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
              backgroundColor: "#7451f8", // Simulates gradient variant
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
          sx={{ fontSize: "2rem", fontWeight: "bold", opacity: 0.75}}
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
                  <Tag key={d} sx={{backgroundColor: "#7451f8"}}>{d}</Tag>
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
  const fetchedOnce = useRef(false);
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
  const navigate = useNavigate();
  const [AllowEdit, setAllowEdit] = useState(false);
  const [selectedQuestion, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState(null);
  const [newMCQ, setNewMCQ] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedMCQ, setMCQs] = useState([]);
  const [sectionLetters, setSectionLetters] = useState([]);
  const [oldSectionLetters, setOldSectionLetters] = useState([]);
  const [newSectionLetters, setNewSectionLetters] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [sectionFlag, setSectionFlag] = useState(false);
  const [sectionsCheck, setSectionsCheck] = useState([]);
  let [token] = useState(localStorage.getItem("token"));
  const [exsistingInfo, setExsistingInfo] = useState({
    header: 'THE EDUCATION LINK',
    examination: 'PRELIMINARY',
    subject: 'COMPUTER-X (JINNAH)',
    ExaminationYear: '2024-25',
    sections: 3,
    duration: '3',
    time: "6:00PM to 9:00PM",
    date: '01-12-2024',
    marks: 60,
    instruction: 'Attempt any 8 questions from this section. All questions carry equal marks.',
    // header: "FAST NUCES".toUpperCase(),
    // centerName: [],
    // class: "Class",
    // subject: "Subject Name",
    // ExaminationYear: "2023",
    departmentNames: ["Jinnah", "Iqbal"],
    // sections: 3,
    // duration: "4 hours",
    // marks: 80,
    // date: new Date().toISOString().split("T")[0],
    // instruction: "No Instruction just attempt the Paper",
  });

  useEffect(() => {
      const handleBeforeUnload = (event) => {
        console.log("IsSaved", isSaved);  
        if(!isSaved || isDisabled) {
          event.preventDefault();
          event.returnValue = "Are you sure?";
        }
      };
      window.addEventListener("beforeunload", handleBeforeUnload);
      return () => {
          window.removeEventListener("beforeunload", handleBeforeUnload);
      };
}, [isSaved]);

  useEffect(() => {
  if (fetchedOnce.current) return; // Prevents second call
  fetchedOnce.current = true;
  console.log("PaperCheck", paper);
  console.log("PaperIDCheck", paper.id);
  
  setExsistingInfo({
    ...exsistingInfo,
    subject: paper.subject_name,
    class: paper.class_name,
    ExaminationYear: paper.year,
    duration: paper.duration,
    marks: paper.marks,
  });

  const sectionsAreEqual = (section1, section2) => {
    return (
      section1.name === section2.name &&
      section1.type === section2.type &&
      section1.description === section2.description &&
      section1.marks === section2.marks
    );
  };

  const fetchDataSequentially = async () => {
    try {
      // Step 1: Fetch Questions first
      console.log("Step 1: Fetching Questions...");
      const questionsResponse = await fetch("http://localhost:3000/Examination/reviewQuestionsByPaperID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paper_id: paper.id }),
      }).then((response) => response.json());

      let fetchedQuestions = [];
      if (questionsResponse.code === 200) {
        console.log("Fetched Questions:", questionsResponse.data);
        fetchedQuestions = questionsResponse.data;
      }

      // Step 2: Fetch MCQs second
      console.log("Step 2: Fetching MCQs...");
      const mcqsResponse = await fetch("http://localhost:3000/Examination/reviewMCQsByPaperID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paper_id: paper.id }),
      }).then((response) => response.json());

      let fetchedMCQs = [];
      if (mcqsResponse.code === 200) {
        console.log("Fetched MCQs:", mcqsResponse.data);
        fetchedMCQs = mcqsResponse.data;
      }

      // Step 3: Fetch Sections last (after questions and MCQs are stored)
      console.log("Step 3: Fetching Sections...");
      const sectionsResponse = await fetch("http://localhost:3000/Examination/reviewSectionByPaperID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paper_id: paper.id }),
      }).then((response) => response.json());

      if (sectionsResponse.code === 200 && sectionsResponse.data.length !== 0) {
        console.log("Fetched Sections:", sectionsResponse.data);
        
        // Sort sections by name in ascending order (A, B, C, etc.)
        const sortedSections = sectionsResponse.data.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        
        setSectionLetters(sortedSections);
        setOldSectionLetters(sortedSections);

        // Step 4: Map sections to questions now that we have all data
        if (fetchedQuestions.length > 0) {
          const updatedQuestions = fetchedQuestions.map((question) => {
            const matchedSection = sortedSections.find(
              (section) => Number(section.id) === Number(question.section_id)
            );

            return {
              ...question,
              section: matchedSection ? matchedSection.name : null,
            };
          });

          console.log("Updated Questions with Sections:", updatedQuestions);
          setQuestions(updatedQuestions);
        }

        // Step 5: Map sections to MCQs
        if (fetchedMCQs.length > 0) {
          const updatedMCQs = fetchedMCQs.map((mcq) => {
            const matchedSection = sortedSections.find(
              (section) => Number(section.id) === Number(mcq.section_id)
            );

            return {
              ...mcq,
              section: matchedSection ? matchedSection.name : null,
            };
          });

          console.log("Updated MCQs with Sections:", updatedMCQs);
          setMCQs(updatedMCQs);
        }
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchDataSequentially();
}, []);

  useEffect(() => {
    setQuestions((prevQuestions) =>
        prevQuestions.filter(
            (q) =>
                !sectionLetters.some(
                    (section) => section.name === q.section && section.type === "Multiple Choice Questions"
                )
        )
    );
    setMCQs((prevMCQs) =>
      prevMCQs.filter(
          (q) =>
              !sectionLetters.some(
                  (section) => section.name === q.section && section.type === "Descriptive Questions"
              )
      )
  );
}, [sectionLetters]); // Runs whenever `sectionLetters` update


useEffect(() => {
  console.log("Updated Sections Length:", exsistingInfo.sections);

  setSectionLetters((prevSectionLetters) => {
      const newSections = Array.from({ length: exsistingInfo.sections }, (_, index) => ({
          id: prevSectionLetters[index]?.id,  // Maintain ID or assign index
          name: `Section ${String.fromCharCode(65 + index)}`, // A, B, C...
          type: prevSectionLetters[index]?.type || "",
          description: prevSectionLetters[index]?.description || "",
          marks: prevSectionLetters[index]?.marks || 0,
      }));

      // Sort sections alphabetically by name
      return newSections
  });
}, [exsistingInfo.sections]);

 // ✅ Removed sectionLetters from dependencies
  // ✅ Add sectionLetters dependency

  
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
    setIsDisabled(true);
    setSectionsCheck([]); // Clears previous data

    console.log("Section", sectionLetters);
    console.log("Existing information:", exsistingInfo);
    console.log("PaperId", paper);

    // 🔹 Fetch sections from the database
    if(action==="Submit") {
      var totalMarks = selectedQuestion.reduce((sum, question) => {
        return sum + Number(question.marks);
      }, 0);
      totalMarks += selectedMCQ.reduce((sum, question) => {
        return sum + 1;
      }, 0);
      if(totalMarks !== exsistingInfo.marks) {
        toast.error(`Paper can't be submitted because the paper isn't of assigned marks!`);
        setIsDisabled(false);
        return;
      }
      fetch("http://localhost:3000/Examination/updatePaper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            paper_id: paper.id,
            completed: 1
        }),
    })
        .then((response) => response.json())
        .catch((error) => {
            console.error(`❌ Error creating section ${sec.name}:`, error);
            return null;
        })
    }
      if(newSectionLetters !== null) {
        const sectionPromises = newSectionLetters.map((sec) =>
            fetch("http://localhost:3000/Examination/createSection", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    section: sec.name,
                    paper_id: paper.id,
                    type: sec.type,
                    description: sec.description,
                    marks: sec.marks,
                }),
            })
                .then((response) => response.json())
                .catch((error) => {
                    console.error(`❌ Error creating section ${sec.name}:`, error);
                    return null;
                })
        );

        const sectionResponses = await Promise.all(sectionPromises);
        const updatedSections = sectionLetters.map((sec, index) => {
            const response = sectionResponses[index];

            if (!response || !response.data || !response.data.id) {
                console.error(`❌ Section creation failed for ${sec.name}, skipping...`);
                return sec;
            }

            return { ...sec, id: response.data.id };
        });

        setSectionLetters({...sectionLetters, ...updatedSections});
        setNewSectionLetters(null);
        console.log("Updated Sections", updatedSections);
      }
      if(newQuestion !== null) {
        console.log("Selected Question", selectedQuestion);
        const question = newQuestion.map((q) => {
            const foundSection = sectionLetters.find((sec) => sec.name === q.section);
            fetch("http://localhost:3000/Examination/createQuestionMapping", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    paper_id: paper.id, // ✅ Use `paper.id` instead of `paper`
                    question_id: q.id,
                    section_id: foundSection?.id, // ✅ Handle possible `undefined`
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.code === 200) {
                        console.log("✅ Question Mapping Created successfully!", q.id);
                    }
                });
        });
        const questioResponses = await Promise.all(question);
        setNewQuestion(null);
      }
      if(newMCQ !== null) { 
        const mcq = newMCQ.map((q) => {
          const foundSection = sectionLetters.find((sec) => sec.name === q.section);
          fetch("http://localhost:3000/Examination/createQuestionMapping", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                  paper_id: paper.id, // ✅ Use `paper.id` instead of `paper`
                  mcqs_id: q.id,
                  section_id: foundSection?.id, // ✅ Handle possible `undefined`
              }),
          })
              .then((response) => response.json())
              .then((data) => {
                  if (data.code === 200) {
                      console.log("✅ Question Mapping Created successfully!", q.id);
                  }
              });
      });
        const mcqResponses = await Promise.all(mcq);
        setNewMCQ(null);
    }
        console.log("✅ All Question Mappings Created Successfully!");
        toast.success(`Paper ${action}ed!`);
    setIsSaved(true);
    setIsDisabled(false); // ✅ Re-enable button at the end
};
  const handleBack = () => {
    if(isSaved){
      navigate("/Papers")
    }
    else {
      toast.error("Paper not saved!")
    }
  }
  const marksTotal = (section, type) => {
    var sum = 0;
    console.log("selectedQuestion", selectedQuestion);
    console.log("selectedQuestion[0]", selectedQuestion);
    if (type === "Multiple Choice Questions") {
      selectedMCQ.forEach((q) => {
        if (q.section == section) sum = sum + 1;
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
                    color: "#7451f8",
                  }}
                  onClick={() => handleBack()}
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </Button>
                <Typography
                  variant="h3"
                  sx={{fontSize: "2.5rem", fontWeight: "bold", ml: 2, color: "#7451f8",}}
                >
                  Paper Editor
                </Typography>
              </Box>
              <Button
                variant="contained"
                onClick={() => handleSubmitButton("save")}
                disabled={isDisabled}
                color="primary"
                sx={{ px: 3, py: 1.5, fontSize: "1rem", backgroundColor: "#7451f8", }}
              >
                Save Paper
              </Button>
              <Button
                variant="contained"
                onClick={() => handleSubmitButton("Submit")}
                disabled={isDisabled}
                color="primary"
                sx={{ px: 3, py: 1.5, fontSize: "1rem", backgroundColor: "#7451f8" }}
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
                <Button onClick={() => {
                          setSectionFlag(true);
                        }}
                        sx={{ marginRight: { xs: 0, md: 3 }, marginTop: { xs: 3, lg: 0 }, width: '110%', color: 'white', backgroundColor: "#7451f8",'&:hover': {backgroundColor: '#303f9f'}}}>
                      Section
                      <FontAwesomeIcon style={{ marginLeft: 8, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', color: 'white', borderRadius: '50%' }} />
                  </Button>
              </Box>
              <Box sx={{ width: "91.666667%", my: 2 }}>
                <ModalSelectMCQs
                  setMCQs={setMCQs}
                  SelectedMCQs={selectedMCQ}
                  sections={sectionLetters}
                  setIsSaved={setIsSaved}
                  subject_id={paper.subject_id}
                  class_id={paper.class_id}
                  setNewMCQ={setNewMCQ}
                ></ModalSelectMCQs>
              </Box>
              <Box sx={{ width: "91.666667%", my: 2 }}>
                <ModalSelectQuestions
                  setQuestions={setQuestions}
                  SelectedQuestions={selectedQuestion}
                  sections={sectionLetters}
                  setIsSaved={setIsSaved}
                  subject_id={paper.subject_id}
                  class_id={paper.class_id}
                  setNewQuestion={setNewQuestion}
                ></ModalSelectQuestions>
              </Box>
              <SectionHandler exsistingInfo={exsistingInfo} setExsistingInfo={setExsistingInfo} sections={sectionLetters} setSections={setSectionLetters} sectionFlag={sectionFlag} setSectionFlag={setSectionFlag} setIsSaved={setIsSaved} isSaved={isSaved} setNewSectionLetters={setNewSectionLetters}/>
              {console.log("SectionLetters check", isSaved)}
              {sectionLetters.map((letter, index) => (
                <>
                  <Box sx={{ display: "flex", flexDirection: "row", gap: 20 }}>
                    <Typography
                      sx={{
                        fontSize: "2rem", 
                        fontWeight: "bold",
                        color: "#7451f8",
                        mb: 1,
                      }}
                    >
                      {letter.name}
                    </Typography>
                    <Box
                      sx={{ display: "flex", flexDirection: "row", gap: 30 }}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "2rem", marginTop: "10px", color: "#7451f8", }}
                        icon={faTimesCircle}
                      />
                    </Box>
                    
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
                    {letter.type === "Descriptive Questions" ? (
                        selectedQuestion.length !== 0 ? (
                          <DraggableQuestions
                            section={letter}
                            SetQuestions={setQuestions}
                            Questions={selectedQuestion}
                          />
                        ) : (
                          <Typography
                            sx={{
                              fontSize: "1rem",
                              color: "#999",
                              fontStyle: "italic",
                            }}
                          >
                            No Questions Selected yet
                          </Typography>
                        )
                      ) : letter.type === "Multiple Choice Questions" ? (
                        selectedMCQ.length !== 0 ? (
                          <DraggableQuestions
                            section={letter}
                            SetQuestions={setMCQs}
                            Questions={selectedMCQ}
                          />
                        ) : (
                          <Typography
                            sx={{
                              fontSize: "1rem",
                              color: "#999",
                              fontStyle: "italic",
                            }}
                          >
                            No Questions Selected yet
                          </Typography>
                        )
                      ):(<></>)}
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
