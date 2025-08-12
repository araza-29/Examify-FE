import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Paper, { PaperPDF } from "../Paper/Paper";
import toast from 'react-hot-toast';
import { faCheckCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import DraggableQuestions from "../../components/DraggableQuestions/DraggableQuestions";
import SectionHandler from "../../components/sectionHandler/sectionHandler"
import Feedback from "../../components/feedbackForm/feedback"
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
import { QuestionMarkSharp } from "@mui/icons-material";
import { LucideTwitter } from "lucide-react";
import { pdf } from '@react-pdf/renderer';
import { Loader } from '../../components/sectionHandler/sectionHandler';


const PaperView = () => {
  const location = useLocation();
  const [paper, setPaper] = useState(location.state?.paper || []);
  console.log("PaperView Paper:", paper);
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
  const [selectedMCQ, setMCQs] = useState([]);
  const [sectionLetters, setSectionLetters] = useState([]);
  const [isSaved, setIsSaved] = useState(true);
  const [sectionFlag, setSectionFlag] = useState(false);
  const [sectionsCheck, setSectionsCheck] = useState([]);
  let [token] = useState(localStorage.getItem("token"));
  const [exsistingInfo, setExsistingInfo] = useState({
    header: "THE EDUCATION LINK",
    examination: "PRELIMINARY",
    subject: "COMPUTER-X (JINNAH)",
    ExaminationYear: "2024-25",
    sections: 3,
    duration: "3",
    time: "6:00PM to 9:00PM",
    date: "01-12-2024",
    marks: 60,
    instruction: "Attempt any 8 questions from this section. All questions carry equal marks.",
    departmentNames: ["Jinnah", "Iqbal"],
    medium: "English"
  })
const [loading, setLoading] = useState(true);

  
  useEffect(() => {
      const handleBeforeUnload = (event) => {
        console.log("IsSaved", isSaved);  
        if(!isSaved) {
          event.preventDefault();
          event.returnValue = "Are you sure?";
        }
      };
      window.addEventListener("beforeunload", handleBeforeUnload);
      return () => {
          window.removeEventListener("beforeunload", handleBeforeUnload);
      };
}, [isSaved]);

  function convertTo12HourRange(timeStr, durationHours) {
    let [hour, minute, second] = timeStr.split(":").map(Number);
    if (hour >= 24) {
      hour = hour - 24;
    }

    const start = new Date();
    start.setHours(hour, minute, 0, 0);

    const end = new Date(start);
    end.setHours(start.getHours() + Number(durationHours));

    const formatTime = (date) => {
      const h = date.getHours() % 12 || 12;
      const m = date.getMinutes().toString().padStart(2, "0");
      const ampm = date.getHours() >= 12 ? "PM" : "AM";
      return `${h}:${m} ${ampm}`;
    };

    return `${formatTime(start)} to ${formatTime(end)}`;
  }
  useEffect(()=>{
    if (fetchedOnce.current) return; // Prevents second call
    fetchedOnce.current = true;
    setLoading(true);
    setExsistingInfo((prev) => ({
      ...prev,
      subject: paper.subject_name,
      class: paper.class_name,
      ExaminationYear: paper.year,
      examination: paper.type ? paper.type.toUpperCase() : "MONTHLY",
      duration: paper.duration,
      marks: paper.marks,
      date: paper.date,
      center: paper.center_name,
      medium: paper.medium,
      time: convertTo12HourRange(paper.time, paper.duration)
    }))

    // Start the timer (2 seconds)
    const minLoader = new Promise(resolve => setTimeout(resolve, 10000));

    // Start the data fetch
    Promise.all([
      fetch("http://localhost:3000/Examination/reviewSectionByPaperID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paper_id: paper.id }),
      }).then((response) => response.json()),

      fetch("http://localhost:3000/Examination/reviewQuestionsWithAnswerByPaperID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paper_id: paper.id }),
      }).then((response) => response.json()),

      fetch("http://localhost:3000/Examination/reviewMCQsByPaperID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paper_id: paper.id }),
      }).then((response) => response.json()),
    ])
      .then(([sectionsResponse, questionsResponse, mcqsResponse]) => {
        // Process and render the paper IMMEDIATELY
        if (sectionsResponse.code === 200 && sectionsResponse.data.length !== 0) {
          const sortedSections = [...sectionsResponse.data].sort((a, b) => a.name.localeCompare(b.name));
          setSectionLetters(sortedSections);
        }
        if (questionsResponse.code === 200) {
          setQuestions((prev) => {
            const updatedQuestions = questionsResponse.data.map((question) => {
              const matchedSection = sectionsResponse.data.find(
                (section) => Number(section.id) === Number(question.section_id)
              );
              return {
                ...question,
                section: matchedSection ? matchedSection.name : null,
              };
            });
            return updatedQuestions;
          });
        }
        if (mcqsResponse.code === 200) {
          setMCQs((prev) => {
            const updatedMCQ = mcqsResponse.data.map((mcq) => {
              const matchedSection = sectionsResponse.data.find(
                (section) => Number(section.id) === Number(mcq.section_id)
              );
              return {
                ...mcq,
                section: matchedSection ? matchedSection.name : null,
              };
            });
            return updatedMCQ;
          });
        }
        // Wait for the timer to finish before hiding the loader
        minLoader.then(() => setLoading(false));
      })
      .catch((error) => {
        minLoader.then(() => setLoading(false));
      });
    
  }, [paper]);

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
          id: prevSectionLetters[index]?.id ?? index,  // Maintain ID or assign index
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

  const handleBack = () => {
    if(isSaved){
      navigate("/Papers")
    }
    else {
      toast.error("Paper not saved!")
    }
  }

  const handleDownloadPDF = async () => {
    const doc = (
      <PaperPDF
        BasicInfo={exsistingInfo}
        htmlQuestions={selectedQuestion}
        htmlMCQ={selectedMCQ}
        section={sectionLetters}
      />
    );
    const blob = await pdf(doc).toBlob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Paper_${paper.id || 'download'}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  };
  
  return (
    <div className="home" style={homeStyle}>
      <Box sx={{ width: "100%", height: "100vh", overflow: "hidden" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
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
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ ml: 2 }}
                  onClick={handleDownloadPDF}
                >
                  Download PDF
                </Button>
              </Box>
            </Box>

            {/* Content Section */}
          </Box>
          
          {/* Paper Viewer Section */}
          {console.log(selectedMCQ)}
          {console.log(selectedQuestion)}
          <Box
            sx={{
                flex: 8,
                overflowY: "auto",
                height: "20%",
                display: "flex",
                justifyContent: "center",
                alignItems: "start", // or "center" if you want vertical center
            }}
            >
            <Box sx={{ position: 'relative', width: '80%', display: 'flex', flexDirectoon: 'row', gap:5, minHeight: 400, justifyContent: 'center', alignItems: 'center' }}>
              <Paper
                htmlQuestions={selectedQuestion}
                htmlMCQ={selectedMCQ}
                BasicInfo={exsistingInfo}
                section={sectionLetters}
                webPreview={true}
              />
              {loading && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'rgba(255,255,255,0.8)', // optional: semi-transparent overlay
                    zIndex: 10,
                  }}
                >
                  <Loader />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default PaperView;
