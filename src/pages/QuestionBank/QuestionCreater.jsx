import {Card,CardActions,CardContent,TextField, Typography,Button,Box,Input, FormControl, Select, InputLabel, MenuItem} from '@mui/material'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DropDown from '../../components/DropDown/DropDown';
import {useEffect, useState} from 'react';
import { Subject } from '@mui/icons-material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
function QuestionCreater() {
        const navigate = useNavigate();
        const [Question, setQuestion] = useState([]);
        const [userId, setUserId] = useState(parseInt(localStorage.getItem("userId"), 10));
        const [subject,setSubject] = useState([]);
        const[selectedSubject,setSelectedSubject] = useState(null);
        const [classes,setClasses] = useState([]);
        const[selectedClass,setSelectedClass] = useState(null);
        const [Chapters, setChapters] = useState([]);
        const [Topic, setTopics] = useState([]);
        const [selectedChapters, setSelectedChapters] = useState(null);
        const [selectedTopic, setSelectedTopics] = useState(null);
        const [image, setImage] = useState(null);
        useEffect(()=>{
            setSelectedClass(null);
            fetchClasses();
        },[userId])
        useEffect(()=>{
            setSelectedSubject(null);
            fetchSubject();
        },[selectedClass])
        useEffect(()=> {
            setSelectedChapters(null);
            fetchChapters();
          },[selectedSubject])
          useEffect(()=> {
            setSelectedTopics(null);
            fetchTopics();
          },[selectedChapters])
       const onSave = () => {
            console.log("SelectedTopic", selectedTopic);
            console.log("SelectedTopic", selectedSubject);
            fetch("http://localhost:3000/Examination/createQuestion", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: Question.name, topic_id: selectedTopic.id, marks: Question.marks, subject_id: selectedSubject.id, selected: false, type: Question.type})
            })
            .then(response => response.json())
            .then((data) => {
                if(data.code === 200) {
                    console.log("Question Uploaded successfully!", data);
                    var questionId = data.data.id;
                    fetch("http://localhost:3000/Examination/createAnswer", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({question_id: questionId, answer: Question.answer})
                    })
                    .then(response => response.json())
                    .then((data) => {
                        if(data.code === 200) {
                            console.log("Answer Uploaded successfully!");
                            toast.success("Question created sucessfully!")
                        }
                    })
                }
            })
            navigate('/questionbank')
        }
        const onCancel = () => {
            navigate('/questionbank')
        }

        const fetchClasses = () => {
            if(userId){
            fetch("http://localhost:3000/Examination/reviewClassesByUserID",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({user_id: userId})
            })
            .then(response => response.json())
            .then((data) => {
                console.log("Class data", data);
                if(data.code === 200) {
                    setClasses(data.data);
                }
                else {
                    console.log("Class data not found");
                }
            }).catch((error) => {
                console.error("Error fetching class:", error);
            })
          }
        }
        const fetchSubject = () => {
            if(selectedClass){
            fetch("http://localhost:3000/Examination/reviewSubjectsByClassID",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({class_id: selectedClass.id})
            })
            .then(response => response.json())
            .then((data) => {
                console.log("Subject data", data);
                if(data.code === 200) {
                    setSubject(data.data);
                }
                else {
                    console.log("Subject data not found");
                }
            }).catch((error) => {
                console.error("Error fetching subject:", error);
            })
          }
        }
          const fetchChapters = () => {
            if(selectedSubject){
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
          }
          const fetchTopics = () => {
            if(selectedChapters){
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
        return(
        <>
        <Box sx={{display:"flex"}}>
            <Box sx={{flex: 1}}>
                <Sidebar/>
            </Box>
            <Box sx={{flex: 6}}>
                <Navbar/>
                <Box sx ={{padding: 3}}>
                        <Box sx={{display: "flex", mb: 2,}}>
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
                                onClick={() => navigate(-1)}
                            >
                            <FontAwesomeIcon icon={faArrowLeft} />
                            </Button>
                            <Typography variant="h6" sx={{ mt: 1, color: 'text.primary', fontWeight: 'bold' }}>
                                Create Questions
                            </Typography>
                        </Box>
                        <TextField
                            variant="outlined"
                            label="Write your question here"
                            value={Question.name}
                            onChange={(event)=>setQuestion({...Question, name: event.target.value})}
                            sx={{ width: '100%', mb: 2 }}
                        />
                        <TextField
                            variant="outlined"
                            label="Marks"
                            value={Question.marks}
                            onChange = {(event)=>setQuestion({...Question, marks: event.target.value})}
                            sx={{ width: '100%', mb: 2 }}
                        />
                        <FormControl sx={{width: '100%', mb: 2 }}>
                            <InputLabel sx={{ color: 'primary.main' }}>Question Type</InputLabel>
                            <Select
                                value={Question?.type || ""}
                                name="searchTopic"
                                onChange={(event) => setQuestion({...Question, type: event.target.value})}
                                sx={{ 
                                    backgroundColor: 'background.paper', 
                                    borderRadius: 1 
                                }}
                            >
                                <MenuItem key={1} value="long">Descriptive Questions</MenuItem>
                                <MenuItem key={2} value="short">Short Questions</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            variant="outlined"
                            label="Answer"
                            value={Question.answer}
                            onChange={(event)=>setQuestion({...Question, answer: event.target.value})}
                            sx={{ width: '100%', mb: 2 }}
                        />
                        <Box sx={{ width: "97%",margin: "auto", display: "flex", alignItems: "center", gap: 2, p: 2, border: "1px dashed #ccc", borderRadius: 2 }}>
                            <Button
                                variant="contained"
                                component="label"
                                sx={{ textTransform: "none" }}
                            >
                                Upload File
                                <input
                                    type="file"
                                    hidden
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                            </Button>
                            <TextField
                                variant="outlined"
                                sx={{width: "90%"}}
                                value={image ? image.name : ""}
                                placeholder="No file selected"
                                InputProps={{ readOnly: true }}
                            />
                        </Box>
                        <Box>
                            <DropDown name = {"Classes"} data = {classes} selectedData={selectedClass} setSelectedData={setSelectedClass} width={"100%"}/>
                            <DropDown name = {"Subjects"} data = {subject} selectedData={selectedSubject} setSelectedData={setSelectedSubject} width={"100%"}/>
                            <DropDown name = {"Chapters"} data = {Chapters} selectedData={selectedChapters} setSelectedData={setSelectedChapters} width={"100%"}/>
                            <DropDown name = {"Topics"} data = {Topic} selectedData={selectedTopic} setSelectedData={setSelectedTopics} width={"100%"}/>
                        </Box>
                        <Box sx={{mt: 3}}>
                            <Button variant="contained" color="primary" onClick = {onSave} sx={{ fontWeight: 'bold', marginRight: 3 }}>
                                Save
                            </Button>
                            <Button variant="contained" onClick = {onCancel} color="primary" sx={{ fontWeight: 'bold' }}>
                                Cancel
                            </Button>
                        </Box>
                    </Box>
            </Box>
        </Box>
        </>
        );
    }

export default QuestionCreater