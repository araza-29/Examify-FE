import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Paper from "./Paper";
import PaperKey from "./PaperKey";
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
import PDFComponent, { PaperPDF } from "./PaperKey";


const PaperApprove = () => {
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
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedMCQ, setMCQs] = useState([]);
  const [sectionLetters, setSectionLetters] = useState([]);
  const [isSaved, setIsSaved] = useState(true);
  const [sectionFlag, setSectionFlag] = useState(false);
  const [sectionsCheck, setSectionsCheck] = useState([]);
  const [feedbackFlag, setFeedbackFlag] = useState(false);
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

  useEffect(()=>{
    if (fetchedOnce.current) return; // Prevents second call
    fetchedOnce.current = true;
    console.log("PaperCheck", paper);
    console.log("PaperIDCheck", paper.id);
    
    // Performance marker: Start data fetching
    performance.mark('paperview-fetch-start');
    
    setExsistingInfo({
      ...exsistingInfo,
      subject: paper.subject_name,
      class: paper.class_name,
      ExaminationYear: paper.year,
      examination: paper.type,
      duration: paper.duration,
      marks: paper.marks,
      date: paper.date,
      center: paper.center_name,
      time: paper.time
    })
    
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
        // Performance marker: Data fetched
        performance.mark('paperview-fetch-end');
        performance.measure('paperview-data-fetch', 'paperview-fetch-start', 'paperview-fetch-end');
        
        // Performance marker: Start processing
        performance.mark('paperview-process-start');
        
        if (sectionsResponse.code === 200 && sectionsResponse.data.length !== 0) {
          console.log("Fetched Sections:", sectionsResponse.data);
          setSectionLetters(sectionsResponse.data);
        }
    
        if (questionsResponse.code === 200) {
          console.log("Fetched Questions:", questionsResponse.data);
          
          // Performance marker: Start question processing
          performance.mark('paperview-questions-process-start');
          
          // Ensure sectionLetters is updated before mapping questions
          setQuestions((prev) => {
            const updatedQuestions = questionsResponse.data.map((question) => {
              const matchedSection = sectionsResponse.data.find(
                (section) => Number(section.id) === Number(question.section_id)
              );
    
              return {
                ...question,
                section: matchedSection ? matchedSection.name : null, // Assign the section name if found
              };
            });
    
            console.log("Updated Questions:", updatedQuestions);
            return updatedQuestions;
          });
          
          // Performance marker: Questions processed
          performance.mark('paperview-questions-process-end');
          performance.measure('paperview-questions-processing', 'paperview-questions-process-start', 'paperview-questions-process-end');
        }
        if (mcqsResponse.code === 200) {
          console.log("Fetched Questions:", mcqsResponse.data);
          
          // Performance marker: Start MCQ processing
          performance.mark('paperview-mcqs-process-start');
          
          // Ensure sectionLetters is updated before mapping questions
          setMCQs((prev) => {
            const updatedMCQ = mcqsResponse.data.map((mcq) => {
              const matchedSection = sectionsResponse.data.find(
                (section) => Number(section.id) === Number(mcq.section_id)
              );
    
              return {
                ...mcq,
                section: matchedSection ? matchedSection.name : null, // Assign the section name if found
              };
            });
    
            console.log("Updated Questions:", updatedMCQ);
            return updatedMCQ;
          });
          
          // Performance marker: MCQs processed
          performance.mark('paperview-mcqs-process-end');
          performance.measure('paperview-mcqs-processing', 'paperview-mcqs-process-start', 'paperview-mcqs-process-end');
        }
        
        // Performance marker: Processing complete
        performance.mark('paperview-process-end');
        performance.measure('paperview-data-processing', 'paperview-process-start', 'paperview-process-end');
        
        // Log all performance measurements
        console.log('Performance Measurements:');
        console.log(performance.getEntriesByType('measure'));
      })
      .catch((error) => console.error("Error fetching data:", error));
    
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
  const handleSubmitButton = async (action) => {
    setIsDisabled(true);
    setSectionsCheck([]); // Clears previous data

    console.log("Section", sectionLetters);
    console.log("Existing information:", exsistingInfo);
    console.log("PaperId", paper);
    const userID = localStorage.getItem("userId")

    // 🔹 Fetch sections from the database
    if (action==="approve") {
        fetch("http://localhost:3000/Examination/updatePaper", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                paper_id: paper.id,
                locked: 1,
                completed: 1
            }),
        })
        .then((response) => response.json())
        .catch((error) => {
            console.error(`❌ Error creating section ${sec.name}:`, error);
            return null;
        })
    }
    else if (action==="reject") {
        fetch("http://localhost:3000/Examination/updatePaper", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                paper_id: paper.id,
                locked: 0,
                completed: 0
            }),
        })
        .then((response) => response.json())
        .catch((error) => {
            console.error(`❌ Error creating section ${sec.name}:`, error);
            return null;
        })
        setFeedbackFlag(true)
    }
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
                  Paper Approve
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
              <Box sx={{gap: 100}}>
                <Button
                    variant="contained"
                    onClick={() => handleSubmitButton("reject")}
                    disabled={isDisabled}
                    color="primary"
                    sx={{ px: 3, py: 1.5, fontSize: "1rem", backgroundColor: "#7451f8", mr: 10 }}
                >
                    Reject Paper
                </Button>
                <Button
                    variant="contained"
                    onClick={() => handleSubmitButton("approve")}
                    disabled={isDisabled}
                    color="primary"
                    sx={{ px: 3, py: 1.5, fontSize: "1rem", backgroundColor: "#7451f8", mr: 12 }}
                >
                    Approve paper
                </Button>
              </Box>
              <Feedback flag ={feedbackFlag} setFlag={setFeedbackFlag} paperID={paper.id} />
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
            <Box sx={{ width: "80%", display: "flex", flexDirectoon: "row", gap:5 }}>
                {/* Performance marker: Start PDF rendering */}
                {(() => {
                  performance.mark('paperview-pdf-render-start');
                  console.log('Starting PDF rendering...');
                  return null;
                })()}
                
                <PDFComponent
                htmlQuestions={selectedQuestion}
                htmlMCQ={selectedMCQ}
                BasicInfo={exsistingInfo}
                section={sectionLetters}
                />
                
                {/* Performance marker: End PDF rendering */}
                {(() => {
                  performance.mark('paperview-pdf-render-end');
                  performance.measure('paperview-pdf-rendering', 'paperview-pdf-render-start', 'paperview-pdf-render-end');
                  console.log('PDF rendering complete');
                  return null;
                })()}
            </Box>
            </Box>
        </Box>
      </Box>
    </div>
  );
};

export default PaperApprove;
