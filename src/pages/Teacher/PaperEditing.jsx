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

function PaperHeaderEditInfo({ OldData, setOldData, setEditOpen }) {
  const [editedInfo, setEditedInfo] = useState({ ...OldData })
  const SaveChanges = () => {
    setOldData({ ...editedInfo })
    setEditOpen(false)
  }
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
        <Box display="flex" flexDirection="column" gap={4} justifyContent="center">
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
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
            value={editedInfo.instruction}
            onChange={(value) => setEditedInfo({ ...editedInfo, instruction: value.target.value })}
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
              <TextField fullWidth disabled label="Duration" type="number" value={3} />
            </Grid>

            <Grid item xs={12} lg={6} mb={2}>
              <Typography variant="subtitle1" gutterBottom>
                Paper Date
              </Typography>
              <TextField fullWidth label="Paper Date" type="date" value={OldData.date} />
            </Grid>
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
              ml: 2,
              backgroundColor: "#7451f8",
            }}
            onClick={() => setEditOpen(false)}
          >
            Cancel
          </Button>
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
        my: 2,
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
        <FontAwesomeIcon style={{ fontSize: "3rem" }} icon={faPenSquare} onClick={() => setEditOpen(true)} />
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
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" sx={{ fontFamily: '"font-mar", Arial, sans-serif' }}>
              <Box display="flex" flexWrap="wrap" sx={{ pt: "0.27rem" }}>
                {OldData.departmentNames.map((d) => (
                  <Tag key={d} sx={{ backgroundColor: "#7451f8" }}>
                    {d}
                  </Tag>
                ))}
              </Box>
            </Box>
          </Grid>
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
  const [isSaved, setIsSaved] = useState(false)
  const [sectionFlag, setSectionFlag] = useState(false)
  const [sectionsCheck, setSectionsCheck] = useState([])
  const [token] = useState(localStorage.getItem("token"))

  // Enhanced state for section tracking
  const [newSections, setNewSections] = useState([])
  const [updatedSections, setUpdatedSections] = useState([])
  const [originalSections, setOriginalSections] = useState([])

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
  })

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
      } else {
        // This section exists in database, check if it's modified
        const originalSection = originalSections.find((orig) => orig.id === section.databaseId)

        if (originalSection && !sectionsAreEqual(section, originalSection)) {
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
    console.log("Updated Sections:", updatedSectionsArray)
  }

  // Enhanced useEffect for section management
  useEffect(() => {
    console.log("Updated Sections Length:", exsistingInfo.sections)

    if (exsistingInfo.sections === undefined || exsistingInfo.sections === null) {
      return
    }

    setSectionLetters((prevSectionLetters) => {
      // If we have existing sections from database, don't override them during initial load
      if (prevSectionLetters.length > 0 && prevSectionLetters.some((sec) => sec.isFromDatabase)) {
        if (exsistingInfo.sections > prevSectionLetters.length) {
          const additionalSections = Array.from(
            { length: exsistingInfo.sections - prevSectionLetters.length },
            (_, index) => ({
              id: prevSectionLetters.length + index,
              name: `Section ${String.fromCharCode(65 + prevSectionLetters.length + index)}`,
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
        return prevSectionLetters
      }

      // Generate new sections
      const newSections = Array.from({ length: exsistingInfo.sections }, (_, index) => ({
        id: prevSectionLetters[index]?.id || index,
        name: `Section ${String.fromCharCode(65 + index)}`,
        type: prevSectionLetters[index]?.type || "",
        description: prevSectionLetters[index]?.description || "",
        marks: prevSectionLetters[index]?.marks || 0,
        databaseId: prevSectionLetters[index]?.databaseId || null,
        isFromDatabase: prevSectionLetters[index]?.isFromDatabase || false,
      }))

      setTimeout(() => categorizeSections(newSections), 0)
      return newSections
    })
  }, [exsistingInfo.sections, originalSections])

  // Enhanced fetch sections logic
  useEffect(() => {
    if (fetchedOnce.current) return
    fetchedOnce.current = true

    console.log("PaperCheck", paper)
    console.log("PaperIDCheck", paper.id)

    setExsistingInfo((prev) => ({
      ...prev,
      subject: paper.subject_name,
      class: paper.class_name,
      ExaminationYear: paper.year,
      duration: paper.duration,
      marks: paper.marks,
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
          fetchedQuestions = questionsResponse.data
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
          fetchedMCQs = mcqsResponse.data
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
                section: matchedSection ? matchedSection.name : null,
              }
            })

            console.log("Updated Questions with Sections:", updatedQuestions)
            setQuestions(updatedQuestions)
          }

          // Map sections to MCQs
          if (fetchedMCQs.length > 0) {
            const updatedMCQs = fetchedMCQs.map((mcq) => {
              const matchedSection = sectionsWithTracking.find(
                (section) => Number(section.id) === Number(mcq.section_id),
              )

              return {
                ...mcq,
                section: matchedSection ? matchedSection.name : null,
              }
            })

            console.log("Updated MCQs with Sections:", updatedMCQs)
            setMCQs(updatedMCQs)
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
            const response = await fetch("http://localhost:3000/Examination/updateSection", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                section_id: sec.databaseId,
                section: sec.name,
                type: sec.type,
                description: sec.description,
                marks: sec.marks,
              }),
            })

            const result = await response.json()
            if (result && result.code === 200) {
              console.log(`✅ Section ${sec.name} updated successfully`)
            } else {
              console.error(`❌ Failed to update section ${sec.name}:`, result)
            }
          } catch (error) {
            console.error(`❌ Error updating section ${sec.name}:`, error)
          }
        }
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
      setNewSections([])
      setUpdatedSections([])

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
                  sx={{ px: 3, py: 1.5, fontSize: "1rem", backgroundColor: "#7451f8" }}
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
                    marginTop: { xs: 3, lg: 0 },
                    width: "110%",
                    color: "white",
                    backgroundColor: "#7451f8",
                    "&:hover": { backgroundColor: "#303f9f" },
                  }}
                >
                  Section
                  <FontAwesomeIcon style={{ marginLeft: 8 }} />
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
                />
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
                />
              </Box>

              <SectionHandler
                exsistingInfo={exsistingInfo}
                setExsistingInfo={setExsistingInfo}
                sections={sectionLetters}
                setSections={setSectionLetters}
                sectionFlag={sectionFlag}
                setSectionFlag={setSectionFlag}
                setIsSaved={setIsSaved}
                isSaved={isSaved}
                setNewSectionLetters={setNewSectionLetters}
              />

              {sectionLetters.map((letter, index) => (
                <Box key={index}>
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
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 30 }}>
                      <FontAwesomeIcon
                        style={{ fontSize: "2rem", marginTop: "10px", color: "#7451f8" }}
                        icon={faTimesCircle}
                      />
                    </Box>
                  </Box>

                  <Box sx={{ width: "91.666667%", my: 2 }}>
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

                    {letter.type === "Descriptive Questions" ? (
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
    </div>
  )
}

export default Teacher
