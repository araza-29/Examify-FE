"use client"
import Paper from "../Paper/Paper"
import toast from "react-hot-toast"
import DraggableQuestions from "../../components/DraggableQuestions/DraggableQuestions"
import SectionHandler from "../../components/sectionHandler/sectionHandler"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
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
} from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faPenSquare,
  faCalendar,
  faClock,
  faClipboard,
  faArrowLeft,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons"
import { ModalSelectQuestions } from "./ModalSelectQuestions"
import { ModalSelectMCQs } from "./ModalSelectMCQs"
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';
import { hasSectionType } from '../../components/sectionHandler/sectionHandler';

function PaperHeaderEditInfo({ OldData, setOldData, setEditOpen }) {
  const [editedInfo, setEditedInfo] = useState({ ...OldData })
  console.log("CHECKING PINACOLATA", editedInfo.examination, OldData.examination)
  const SaveChanges = () => {
    setOldData({ ...editedInfo })
    setEditOpen(false)
  }
  return (
    <Card
      sx={{
        width: "100%",
        height: 450,
        display: "flex",
        flexDirection: "column",
        borderRadius: '8px',
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Box display="flex" flexDirection="column" gap={4} justifyContent="center">
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "#7451f8"  }}>
            Edit Headers Info
          </Typography>

          <FormControl fullWidth sx={{  }}>
            <InputLabel id="examination">Examination</InputLabel>
            <Select
              labelId="exam"
              value={editedInfo.examination || "MONTHLY"}
              onChange={(event) => setEditedInfo({ ...editedInfo, examination: event.target.value })}
              label="exam"
            >
              <MenuItem value="MONTHLY">Monthly</MenuItem>
              <MenuItem value="PRELIMINARY">Preliminary</MenuItem>
              <MenuItem value="MOCK">Mock</MenuItem>
            </Select>
          </FormControl>

          <Box display="flex" flexWrap="wrap" justifyContent="space-between">
            <Box flexBasis="48%" mb={2}>
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
            <Grid item flexBasis="48%" xs={12} lg={6} pr={{ lg: 0.75 }} mb={2}>
              <TextField 
                fullWidth 
                disabled 
                label="Duration" 
                type="number" 
                value={3} 
              />
            </Grid>

            <Grid item flexBasis="48%" xs={12} lg={10} 
              sx={{
                flexGrow: 1,  // Allows expansion to available space
                paddingLeft: { lg: 3 },  // Left padding only on large screens
                marginBottom: 2,
                // Remove right padding/margin to maximize right expansion
                "& .MuiTextField-root": {  // Target the TextField
                  width: "100%",  // Ensure full width
                  "& .MuiInputBase-root": {  // Target the input
                    paddingRight: "14px",  // Add internal right padding if needed
                  }
                }
              }} mb={2}>
              <TextField 
                fullWidth 
                disabled
                label="Paper Date" 
                type="date" 
                value={OldData.date} 
              />
            </Grid>
          </Box>
        </Box>
      </CardContent>
      <CardActions sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        padding: '16px', 
        position: 'relative',
        bottom: '10px' // Lifts the buttons up by 20px
      }}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <Button
              sx={{
                backgroundColor: "#7451f8",
                color: "white",
                '&:hover': {
                  backgroundColor: '#5a3acb',
                  transform: 'scale(1.02)',
                  transition: 'all 0.2s ease'
                }
              }}
              onClick={SaveChanges}
            >
              Save Changes
            </Button>
          </Grid>
          <Grid item>
            <Button
              sx={{
                color: "white",
                backgroundColor: "#7451f8",
                '&:hover': {
                  backgroundColor: '#5a3acb',
                  transform: 'scale(1.02)',
                  transition: 'all 0.2s ease'
                }
              }}
              onClick={() => setEditOpen(false)}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  )
}

function PaperHeaderInfo({ OldData, setOldData, setEditOpen }) {
  const Tag = ({ children }) => {
    return (
      <Box
        display="inline-flex"
        alignItems="center"
        px={1.5}
        py={0.75}
        m={0.5}
        borderRadius="16px"
        lineHeight="1.2"
        bgcolor="#2F2F2F"
        color="#9E9E9E"
        fontSize="0.75rem"
        textTransform="uppercase"
        sx={{ userSelect: "none", boxShadow: 1 }}
      >
        <Typography component="span">{children}</Typography>
      </Box>
    )
  }
  return (
    <Box
      sx={{
        width: "91.666%",
        height: "30%",
        bgcolor: "white",
        borderRadius: 2,
        p: 4,
        boxShadow: 3,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" sx={{ fontSize: "2rem", fontWeight: "bold", opacity: 0.75 }}>
          Header Info
        </Typography>
        <Button
          onClick={() => setEditOpen(true)}
          variant="outlined"
          sx={{
            minWidth: 'auto',
            padding: '8px',
            borderRadius: '8px',
            borderColor: 'rgba(255, 255, 255, 0.7)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'white',
              transform: 'scale(1.05)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          <FontAwesomeIcon 
            icon={faPenSquare} 
            style={{ 
              fontSize: '2rem',
              transition: 'inherit',
              color: "black"
            }} 
          />
        </Button>
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
              <FontAwesomeIcon style={{ marginRight: "0.5rem" }} icon={faClipboard} />
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
              <FontAwesomeIcon style={{ marginRight: "0.5rem" }} icon={faCalendar} />
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
              <FontAwesomeIcon style={{ marginRight: "0.5rem" }} icon={faPenSquare} />
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
              <FontAwesomeIcon style={{ marginRight: "0.5rem" }} icon={faClock} />
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
              <FontAwesomeIcon style={{ marginRight: "0.5rem" }} icon={faCalendar} />
              <Typography> {OldData.date}</Typography>
            </Box>
          </Grid>
          {/* <Grid item xs={12}>
            <Box display="flex" alignItems="center" sx={{ fontFamily: '"font-mar", Arial, sans-serif' }}>
              <Box display="flex" flexWrap="wrap" sx={{ pt: "0.27rem" }}>
                {OldData.departmentNames.map((d) => (
                  <Tag key={d} sx={{ backgroundColor: "#7451f8" }}>
                    {d}
                  </Tag>
                ))}
              </Box>
            </Box>
          </Grid> */}
        </Grid>
      </Box>
    </Box>
  )
}

const Teacher = () => {
  const location = useLocation()
  const [paper, setPaper] = useState(location.state?.paper || [])
  const fetchedOnce = useRef(false)
  const navigate = useNavigate()

  // State variables
  const [AllowEdit, setAllowEdit] = useState(false)
  const [selectedQuestion, setQuestions] = useState([])
  const [newQuestion, setNewQuestion] = useState(null)
  const [deletedQuestion, setDeletedQuestion] = useState([])
  const [newMCQ, setNewMCQ] = useState(null)
  const [isDisabled, setIsDisabled] = useState(false)
  const [selectedMCQ, setMCQs] = useState([])
  const [deletedMCQ, setDeletedMCQ] = useState([])
  const [sectionLetters, setSectionLetters] = useState([])
  const [oldSectionLetters, setOldSectionLetters] = useState([])
  const [newSectionLetters, setNewSectionLetters] = useState(null)
  const [isSaved, setIsSaved] = useState(true)
  const [sectionFlag, setSectionFlag] = useState(false)
  const [sectionsCheck, setSectionsCheck] = useState([])
  const [token] = useState(localStorage.getItem("token"))

  // Enhanced state for section tracking
  const [newSections, setNewSections] = useState([])
  const [updatedSections, setUpdatedSections] = useState([])
  const [originalSections, setOriginalSections] = useState([])
  const [deletedSections, setDeletedSections] = useState([])

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

  function convertTo12HourRange(timeStr, durationHours) {
    // Fix "24" hour by converting it to 0 and adding a day if needed
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
      return `${h}:${m}${ampm}`;
    };

    return `${formatTime(start)} to ${formatTime(end)}`;
  }

  // Prevent page refresh without saving
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      console.log("IsSaved", isSaved)
      if (!isSaved || isDisabled) {
        event.preventDefault()
        event.returnValue = "Are you sure?"
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [isSaved])

  // Filter questions based on section changes
  useEffect(() => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter(
        (q) =>
          !sectionLetters.some((section) => section.name === q.section && section.type === "Multiple Choice Questions"),
      ),
    )
    setMCQs((prevMCQs) =>
      prevMCQs.filter(
        (q) =>
          !sectionLetters.some((section) => section.name === q.section && section.type === "Descriptive Questions"),
      ),
    )
  }, [sectionLetters])

  // Enhanced sectionsAreEqual function
  const sectionsAreEqual = (section1, section2) => {
    
    console.log("SectionCheck1", section1)
    
    console.log("SectionCheck2", section2)
    return (
      section1.name === section2.name &&
      section1.type === section2.type &&
      section1.description === section2.description &&
      section1.marks === section2.marks
    )
  }

  // Function to categorize sections into new, updated, and unchanged
  const categorizeSections = (currentSections) => {
    const newSectionsArray = []
    const updatedSectionsArray = []

    currentSections.forEach((section) => {
      if (!section.databaseId) {
        // This is a completely new section
        newSectionsArray.push(section)
        console.log("ssection", section)
      } else {
        // This section exists in database, check if it's modified
        const originalSection = originalSections.find((orig) => orig.id === section.databaseId)
        console.log("Equal check", sectionsAreEqual(section, originalSection))
        if (originalSection && !sectionsAreEqual(section, originalSection)) {
          console.log("OriginalSection", originalSection, section)
          // Section has been modified
          updatedSectionsArray.push({
            ...section,
            originalData: originalSection,
          })
        }
      }
    })

    setNewSections(newSectionsArray)
    setUpdatedSections(updatedSectionsArray)

    console.log("New Sections:", newSectionsArray)
    console.log("Updated Sections in categorize:", updatedSectionsArray)
  }

  // Enhanced useEffect for section management
  useEffect(() => {
  console.log("Updated Sections Length:", exsistingInfo.sections)

  if (exsistingInfo.sections === undefined || exsistingInfo.sections === null) {
    return
  }
  
  console.log("Sections existing", sectionLetters)
  
  setSectionLetters((prevSectionLetters) => {
    // If we have existing sections from database, don't override them during initial load
    if(exsistingInfo.medium === "English") {
      if (prevSectionLetters.length > 0 && prevSectionLetters.some((sec) => sec.isFromDatabase)) {
        if (exsistingInfo.sections > prevSectionLetters.length) {
          const additionalSections = Array.from(
            { length: exsistingInfo.sections - prevSectionLetters.length },
            (_, index) => ({
              id: prevSectionLetters.length + index,
              name: `Section "${String.fromCharCode(65 + prevSectionLetters.length + index)}"`,
              type: "",
              description: "",
              marks: 0,
              databaseId: null,
              isFromDatabase: false,
            }),
          )

          const updatedSections = [...prevSectionLetters, ...additionalSections]
          setTimeout(() => categorizeSections(updatedSections), 0)
          return updatedSections
        } else if (exsistingInfo.sections < prevSectionLetters.length) {
          const trimmedSections = prevSectionLetters.slice(0, exsistingInfo.sections)
          setTimeout(() => categorizeSections(trimmedSections), 0)
          return trimmedSections
        }
        setTimeout(() => categorizeSections(prevSectionLetters), 0)
        console.log("Sections updated", prevSectionLetters)
        return prevSectionLetters
      }

      // Generate new sections - PRESERVE EXISTING VALUES
      const usedNames = new Set(prevSectionLetters.map(sec => sec.name));
      const newSections = Array.from({ length: exsistingInfo.sections }, (_, index) => {
        const existingSection = prevSectionLetters[index]
        // If section exists, preserve all its values
        if (existingSection) {
          usedNames.add(existingSection.name);
          return {
            ...existingSection,
            id: existingSection.id || index,
          }
        }
        // Only create default values for completely new sections
        // Ensure unique section name
        let charCode = 65 + index;
        let name;
        do {
          name = `Section "${String.fromCharCode(charCode)}"`;
          charCode++;
        } while (usedNames.has(name));
        usedNames.add(name);
        return {
          id: index,
          name,
          type: "",
          description: "",
          marks: 0,
          databaseId: null,
          isFromDatabase: false,
        }
      })
      setTimeout(() => categorizeSections(newSections), 0)
      return newSections
    }
    // Urdu alphabet mapping
else if(exsistingInfo.medium === "Urdu") {
  const urduAlphabet = ['الف', 'ب', 'پ', 'ت', 'ٹ', 'ث', 'ج', 'چ', 'ح', 'خ', 'د', 'ڈ', 'ذ', 'ر', 'ڑ', 'ز', 'ژ', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ک', 'گ', 'ل', 'م', 'ن', 'و', 'ہ', 'ء', 'ی', 'ے'];
  // Generate new sections - PRESERVE EXISTING VALUES
  const usedNames = new Set(prevSectionLetters.map(sec => sec.name));
  const getUrduLetter = (index) => {
    if (index < urduAlphabet.length) {
      return urduAlphabet[index];
    }
    // For indices beyond the alphabet, fallback to the index number
    return (index + 1).toString();
  };
  const newSections = Array.from({ length: exsistingInfo.sections }, (_, index) => {
    const existingSection = prevSectionLetters[index]
    if (existingSection) {
      usedNames.add(existingSection.name);
      return {
        ...existingSection,
        id: existingSection.id || index,
      }
    }
    // Ensure unique section name
    let letterIndex = index;
    let name;
    do {
      name = `حصہ "${getUrduLetter(letterIndex)}"`;
      letterIndex++;
    } while (usedNames.has(name));
    usedNames.add(name);
    return {
      id: index,
      name,
      type: "",
      description: "",
      marks: 0,
      databaseId: null,
      isFromDatabase: false,
    }
  })
  setTimeout(() => categorizeSections(newSections), 0)
  return newSections
}
  return prevSectionLetters
  })
}, [exsistingInfo.sections, originalSections, sectionLetters, exsistingInfo.medium])

  // Enhanced fetch sections logic
  useEffect(() => {
    if (fetchedOnce.current) return
    fetchedOnce.current = true

    console.log("PaperCheck", paper)
    console.log("PaperIDCheck", paper.id)
    console.log("Paper type from backend:", paper.type)

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

    const fetchDataSequentially = async () => {
      try {
        // Step 1: Fetch Questions
        console.log("Step 1: Fetching Questions...")
        const questionsResponse = await fetch("http://localhost:3000/Examination/reviewQuestionsByPaperID", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paper_id: paper.id }),
        }).then((response) => response.json())

        let fetchedQuestions = []
        if (questionsResponse.code === 200) {
          console.log("Fetched Questions:", questionsResponse.data)
          fetchedQuestions = deduplicateById(questionsResponse.data)
        }

        // Step 2: Fetch MCQs
        console.log("Step 2: Fetching MCQs...")
        const mcqsResponse = await fetch("http://localhost:3000/Examination/reviewMCQsByPaperID", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paper_id: paper.id }),
        }).then((response) => response.json())

        let fetchedMCQs = []
        if (mcqsResponse.code === 200) {
          console.log("Fetched MCQs:", mcqsResponse.data)
          fetchedMCQs = deduplicateById(mcqsResponse.data)
        }

        // Step 3: Fetch Sections
        console.log("Step 3: Fetching Sections...")
        const sectionsResponse = await fetch("http://localhost:3000/Examination/reviewSectionByPaperID", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paper_id: paper.id }),
        }).then((response) => response.json())

        if (sectionsResponse.code === 200 && sectionsResponse.data.length !== 0) {
          console.log("Fetched Sections:", sectionsResponse.data)

          const sortedSections = sectionsResponse.data.sort((a, b) => {
            return a.name.localeCompare(b.name)
          })

          const sectionsWithTracking = sortedSections.map((section) => ({
            ...section,
            databaseId: section.id,
            isFromDatabase: true,
          }))

          setSectionLetters(sectionsWithTracking)
          setOriginalSections(sectionsWithTracking)
          setOldSectionLetters(sectionsWithTracking)

          setExsistingInfo((prev) => ({
            ...prev,
            sections: prev.sections || sectionsWithTracking.length,
          }))

          // Map sections to questions
          if (fetchedQuestions.length > 0) {
            const updatedQuestions = fetchedQuestions.map((question) => {
              const matchedSection = sectionsWithTracking.find(
                (section) => Number(section.id) === Number(question.section_id),
              )
              return {
                ...question,
                section_id: matchedSection ? matchedSection.id : null,
                section: matchedSection ? matchedSection.name : null,
              }
            })

            console.log("Updated Questions with Sections:", updatedQuestions)
            setQuestions(deduplicateById(updatedQuestions))
          }

          // Map sections to MCQs
          if (fetchedMCQs.length > 0) {
            const updatedMCQs = fetchedMCQs.map((mcq) => {
              const matchedSection = sectionsWithTracking.find(
                (section) => Number(section.id) === Number(mcq.section_id),
              )
              return {
                ...mcq,
                section_id: matchedSection ? matchedSection.id : null,
                section: matchedSection ? matchedSection.name : null,
              }
            })

            console.log("Updated MCQs with Sections:", updatedMCQs)
            setMCQs(deduplicateById(updatedMCQs))
          }
        } else {
          console.log("No sections found in database, preserving auto-generated sections")
          setOriginalSections([])
          setOldSectionLetters([])
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchDataSequentially()
  }, [])

  // FIXED Enhanced submit handler
  const handleSubmitButton = async (action) => {
    setIsDisabled(true)
    setSectionsCheck([])

    console.log("Current Sections:", sectionLetters)
    console.log("New Sections to Create:", newSections)
    console.log("Updated Sections:", updatedSections)
    console.log("Existing information:", exsistingInfo)
    console.log("PaperId", paper)

    try {
      // Handle paper completion if submitting
      if (action === "Submit") {
        var totalMarks = selectedQuestion.reduce((sum, question) => {
          return sum + Number(question.marks)
        }, 0)
        totalMarks += selectedMCQ.reduce((sum, question) => {
          return sum + 1
        }, 0)

        if (totalMarks !== exsistingInfo.marks) {
          toast.error(`Paper can't be submitted because the paper isn't of assigned marks!`)
          setIsDisabled(false)
          return
        }

        // Update paper completion status
        await fetch("http://localhost:3000/Examination/updatePaper", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paper_id: paper.id,
            completed: 1,
          }),
        })
      }

      // 1. Create new sections and store their database IDs
      const sectionIdMapping = new Map() // Map original section ID to database ID

      if (newSections.length > 0) {
        console.log("Creating new sections...")

        for (const sec of newSections) {
          try {
            const response = await fetch("http://localhost:3000/Examination/createSection", {
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

            const result = await response.json()
            if (result && result.data && result.data.id) {
              // Store the mapping between original section and new database ID
              sectionIdMapping.set(sec.name, result.data.id)
              console.log(`✅ Section ${sec.name} created with ID: ${result.data.id}`)
              setNewSections([])
            } else {
              console.error(`❌ Failed to create section ${sec.name}:`, result)
            }
          } catch (error) {
            console.error(`❌ Error creating section ${sec.name}:`, error)
          }
        }

        // Update section letters with new database IDs
        setSectionLetters((prevSections) => {
          return prevSections.map((section) => {
            const newDatabaseId = sectionIdMapping.get(section.name)
            if (newDatabaseId && !section.databaseId) {
              return {
                ...section,
                databaseId: newDatabaseId,
                isFromDatabase: true,
              }
            }
            return section
          })
        })
      }

      // 2. Update existing sections
      if (updatedSections.length > 0) {
        console.log("Updating existing sections...")

        for (const sec of updatedSections) {
          try {
            const response = await fetch("http://localhost:3000/Examination/updateSections", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                section_id: sec.databaseId,
                section: sec.name,
                type: sec.type,
                description: sec.description,
                marks: sec.marks,
                paper_id: paper.id
              }),
            })

            const result = await response.json()
            if (result && result.code === 200) {
              console.log(`✅ Section ${sec.name} updated successfully`)
              setUpdatedSections([])
            } else {
              console.error(`❌ Failed to update section ${sec.name}:`, result)
            }
          } catch (error) {
            console.error(`❌ Error updating section ${sec.name}:`, error)
          }
        }
      }
      // --- DELETE REMOVED SECTIONS ---
      if (deletedSections && deletedSections.length > 0) {
        for (const sectionId of deletedSections) {
          try {
            const response = await fetch(`http://localhost:3000/Examination/deleteSection`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                section_id: sectionId,
                paper_id: paper.id
              }),
            })
            const result = await response.json()
            if (result && result.code === 200) {
              console.log(`✅ Section deleted successfully: ${sectionId}`)
            } else {
              console.error(`❌ Failed to delete section: ${sectionId}`, result)
            }
          } catch (error) {
            console.error(`❌ Error deleting section: ${sectionId}`, error)
          }
        }
        setDeletedSections([])
      }
      if (deletedQuestion !== null && deletedQuestion.length > 0) {
        const questionMapping = deletedQuestion.map(async (q)=>{
           const response = await fetch("http://localhost:3000/Examination/deleteQuestionMapping", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                paper_id: paper.id,
                question_id: q.id
              }),
            })

            const data = await response.json()
            if (data.code === 200) {
              console.log("✅ Question Mapping deleted successfully!", q.id)
              setDeletedQuestion([])
            } else {
              console.error("❌ Failed to create question mapping:", data)
            }
        })
      }
      if (deletedMCQ !== null && deletedMCQ.length > 0) {
        const questionMapping = deletedMCQ.map(async (q)=>{
           const response = await fetch("http://localhost:3000/Examination/deleteMCQMapping", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                paper_id: paper.id,
                mcq_id: q.id
              }),
            })

            const data = await response.json()
            if (data.code === 200) {
              console.log("✅ MCQ Mapping deleted successfully!", q.id)
              setDeletedMCQ([])
            } else {
              console.error("❌ Failed to create question mapping:", data)
            }
        })
      }
      // 3. FIXED: Handle question mappings with proper section ID resolution
      console.log("Creating question mappings...", newQuestion)
      if (newQuestion !== null && newQuestion.length > 0) {
        console.log("Creating question mappings...", newQuestion)

        const questionMappingPromises = newQuestion.map(async (q) => {
          // Find section - check both database ID and name mapping
          let foundSection = sectionLetters.find((sec) => sec.name === q.section)

          // If section was newly created, use the mapped database ID
          if (!foundSection?.databaseId && sectionIdMapping.has(q.section)) {
            foundSection = {
              ...foundSection,
              databaseId: sectionIdMapping.get(q.section),
            }
          }

          if (!foundSection?.databaseId) {
            console.error(`❌ No section found for question ${q.id} with section ${q.section}`)
            return
          }

          try {
            const response = await fetch("http://localhost:3000/Examination/createQuestionMapping", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                paper_id: paper.id,
                question_id: q.id,
                section_id: foundSection.databaseId, // Use databaseId instead of id
              }),
            })

            const data = await response.json()
            if (data.code === 200) {
              console.log("✅ Question Mapping Created successfully!", q.id)
              setNewQuestion([])
            } else {
              console.error("❌ Failed to create question mapping:", data)
            }
          } catch (error) {
            console.error("❌ Error creating question mapping:", error)
          }
        })

        await Promise.all(questionMappingPromises)
      }

      // 4. FIXED: Handle MCQ mappings with proper section ID resolution
      console.log("Creating MCQ mappings...", newMCQ)
      if (newMCQ !== null && newMCQ.length > 0) {
        console.log("Creating MCQ mappings...", newMCQ)

        const mcqMappingPromises = newMCQ.map(async (q) => {
          // Find section - check both database ID and name mapping
          let foundSection = sectionLetters.find((sec) => sec.name === q.section)

          // If section was newly created, use the mapped database ID
          if (!foundSection?.databaseId && sectionIdMapping.has(q.section)) {
            foundSection = {
              ...foundSection,
              databaseId: sectionIdMapping.get(q.section),
            }
          }

          if (!foundSection?.databaseId) {
            console.error(`❌ No section found for MCQ ${q.id} with section ${q.section}`)
            return
          }

          try {
            const response = await fetch("http://localhost:3000/Examination/createQuestionMapping", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                paper_id: paper.id,
                mcqs_id: q.id,
                section_id: foundSection.databaseId, // Use databaseId instead of id
              }),
            })

            const data = await response.json()
            if (data.code === 200) {
              console.log("✅ MCQ Mapping Created successfully!", q.id)
              setNewMCQ(null)
            } else {
              console.error("❌ Failed to create MCQ mapping:", data)
            }
          } catch (error) {
            console.error("❌ Error creating MCQ mapping:", error)
          }
        })

        await Promise.all(mcqMappingPromises)
      }

      console.log("✅ All operations completed successfully!")

      // Clear the tracking arrays after successful operations

      // Update original sections to current state for future comparisons
      setTimeout(() => {
        setOriginalSections([...sectionLetters])
      }, 100)

      toast.success(`Paper ${action}ed!`)
      setIsSaved(true)
    } catch (error) {
      console.error("❌ Error in handleSubmitButton:", error)
      toast.error("An error occurred while processing sections")
    } finally {
      setIsDisabled(false)
    }
  }

  const handleBack = () => {
    if (isSaved) {
      navigate("/Papers")
    } else {
      toast.error("Paper not saved!")
    }
  }

  const marksTotal = (section, type) => {
    var sum = 0
    console.log("selectedQuestion", selectedQuestion)
    if (type === "Multiple Choice Questions") {
      selectedMCQ.forEach((q) => {
        if (q.section == section) sum = sum + 1
      })
    } else {
      selectedQuestion.forEach((q) => {
        if (q.section == section) sum = sum + q.marks
      })
    }
    console.log(sum)
    return sum
  }

  const homeStyle = {
    display: "flex",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#f0f2f5",
  }

  // --- DEDUPLICATION UTILS ---
  function deduplicateById(arr) {
    const seen = new Set();
    return arr.filter(item => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  }

  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  const handleOpenFeedback = async () => {
    setFeedbackOpen(true);
    setFeedbackLoading(true);
    try {
      const res = await fetch('http://localhost:3000/Examination/reviewFeedbackByPaperID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paper_id: paper.id })
      });
      const data = await res.json();
      setFeedbacks(data.data || []);
    } catch (e) {
      setFeedbacks([]);
    }
    setFeedbackLoading(false);
  };
  const handleCloseFeedback = () => setFeedbackOpen(false);

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
                <Typography variant="h3" sx={{ fontSize: "2.5rem", fontWeight: "bold", ml: 2, color: "#7451f8" }}>
                  Paper Editor
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => handleSubmitButton("save")}
                  disabled={isDisabled}
                  color="primary"
                  sx={{ px: 3, py: 1.5, fontSize: "1rem", backgroundColor: "#7451f8" ,
                    '&:hover': {
                        backgroundColor: '#5a3acb',
                        transform: 'scale(1.02)',
                        transition: 'all 0.2s ease'
                    }}}
                >
                  Save Paper
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleSubmitButton("Submit")}
                  disabled={isDisabled}
                  color="primary"
                  sx={{ px: 3, py: 1.5, fontSize: "1rem", backgroundColor: "#7451f8",
                    '&:hover': {
                        backgroundColor: '#5a3acb',
                        transform: 'scale(1.02)',
                        transition: 'all 0.2s ease'
                    } }}
                >
                  Submit Paper
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ px: 2, py: 1.5, fontSize: "1rem", backgroundColor: "#7451f8",
                    '&:hover': {
                        backgroundColor: '#5a3acb',
                        transform: 'scale(1.02)',
                        transition: 'all 0.2s ease'
                    } }}
                  onClick={handleOpenFeedback}
                >
                  View Feedback
                </Button>
              </Box>
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
                <PaperHeaderInfo OldData={exsistingInfo} setEditOpen={setAllowEdit} setOldData={setExsistingInfo} />
              ) : (
                <PaperHeaderEditInfo OldData={exsistingInfo} setEditOpen={setAllowEdit} setOldData={setExsistingInfo} />
              )}

              <Box sx={{ width: "91.666667%", my: 2 }}>
                <Button
                  onClick={() => setSectionFlag(true)}
                  sx={{
                    marginRight: { xs: 0, md: 3 },
                    marginTop: { xs: 1, lg: 0 },
                    width: "110%",
                    color: "white",
                    backgroundColor: "#7451f8",
                    '&:hover': {
                        backgroundColor: '#5a3acb',
                        transform: 'scale(1.02)',
                        transition: 'all 0.2s ease'
                    }
                  }}
                >
                  Section Handler
                  <FontAwesomeIcon style={{ marginLeft: 8 }} />
                </Button>
              </Box>

              {sectionLetters.some(sec => sec.type === "Multiple Choice Questions") && (
                <Box sx={{ width: "91.666667%", mb: 2 }}>
                  <ModalSelectMCQs
                    setMCQs={setMCQs}
                    SelectedMCQs={[...selectedMCQ]}
                    sections={sectionLetters}
                    setIsSaved={setIsSaved}
                    subject_id={paper.subject_id}
                    class_id={paper.class_id}
                    setNewMCQ={setNewMCQ}
                    medium={exsistingInfo.medium}
                    disabled={!hasSectionType(sectionLetters, 'Multiple Choice Questions')}
                  />
                </Box>
              )}

              {sectionLetters.some(sec => sec.type === "Short Questions" || sec.type === "Descriptive Questions") && (
                <Box sx={{ width: "91.666667%", mb: 2 }}>
                  <ModalSelectQuestions
                    setQuestions={setQuestions}
                    SelectedQuestions={[...selectedQuestion]}
                    sections={sectionLetters}
                    setIsSaved={setIsSaved}
                    subject_id={paper.subject_id}
                    class_id={paper.class_id}
                    setNewQuestion={setNewQuestion}
                    medium={exsistingInfo.medium}
                    disabled={!(hasSectionType(sectionLetters, 'Short Questions') || hasSectionType(sectionLetters, 'Descriptive Questions'))}
                  />
                </Box>
              )}

              <SectionHandler
                exsistingInfo={exsistingInfo}
                setExsistingInfo={setExsistingInfo}
                sections={sectionLetters}
                setSections={setSectionLetters}
                sectionFlag={sectionFlag}
                setSectionFlag={setSectionFlag}
                setIsSaved={setIsSaved}
                isSaved={isSaved}
                deletedSections={deletedSections}
                setDeletedSections={setDeletedSections}
              />

              {sectionLetters.map((letter, index) => (
                <Box key={index}>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Typography
                      sx={{
                        fontSize: "2rem",
                        fontWeight: "bold",
                        color: "#7451f8",
                      }}
                    >
                      {letter.name}
                    </Typography>
                  </Box>

                  <Box sx={{ width: "91.666667%", mb: 1 }}>
                    <Typography
                      sx={{
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        color: "#333",
                        mb: 1,
                      }}
                    >
                      Selected Question: {marksTotal(letter.name, letter.type)}/{letter.marks}
                    </Typography>

                    {letter.type !== "Multiple Choice Questions" ? (
                      selectedQuestion.length !== 0 ? (
                        <DraggableQuestions section={letter} SetQuestions={setQuestions} Questions={selectedQuestion} setDeletedQuestions={setDeletedQuestion}/>
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
                        <DraggableQuestions section={letter} SetQuestions={setMCQs} Questions={selectedMCQ} setDeletedQuestions={setDeletedMCQ}/>
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
                    ) : null}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Paper Viewer Section */}
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
      <Dialog open={feedbackOpen} onClose={handleCloseFeedback} maxWidth="sm" fullWidth>
        <DialogTitle>Paper Feedback</DialogTitle>
        <DialogContent dividers style={{ minHeight: 120, maxHeight: 400 }}>
          {feedbackLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height={120}>
              <CircularProgress />
            </Box>
          ) : feedbacks.length === 0 ? (
            <Typography>No feedback found for this paper.</Typography>
          ) : (
            <Box>
              {feedbacks.map((fb, idx) => (
                <Box key={idx} mb={2} p={2} border={1} borderColor="#eee" borderRadius={2}>
                  <Typography variant="body1">{fb.review}</Typography>
                  <Typography variant="caption" color="text.secondary">User ID: {fb.user_id}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFeedback} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Teacher
