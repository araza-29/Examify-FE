import {Card,CardActions,CardContent,TextField, Typography,Button,Box} from '@mui/material'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DropDown from '../../components/DropDown/DropDown';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from 'react';
import { Subject } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function MCQCreater() {
        const navigate = useNavigate();
        const [MCQ, setMCQ] = useState([]);
        const [userId, setUserId] = useState(5);
        const [classes,setClasses] = useState([]);
        const[selectedClass,setSelectedClass] = useState([]);
        const [subject,setSubject] = useState([]);
        const[selectedSubject,setSelectedSubject] = useState([]);
        const [Chapters, setChapters] = useState([]);
        const [textboxes, setTextBoxes] = useState([]);
        const [Topic, setTopics] = useState([]);
        const [selectedChapters, setSelectedChapters] = useState([]);
        const [selectedTopic, setSelectedTopics] = useState([]);
        const [choices, setChoices] = useState([
            { id: 1, value: MCQ?.choice1 || "" },
            { id: 2, value: MCQ?.choice2 || "" },
            { id: 3, value: MCQ?.choice3 || "" },
            { id: 4, value: MCQ?.choice4 || "" }
          ]);
        const handleChange = (id, newValue) => {
            setChoices(choices.map(box => 
            box.id === id ? { ...box, value: newValue } : box
            ));
        }
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
            fetch("http://localhost:3000/Examination/createMCQ", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({mcq_id: MCQ.id, name: MCQ.name, topic_id: selectedTopic.id, marks: MCQ.marks, subject_id: selectedSubject.id, selected: false, choice1: choices[0]?.value || null, choice2: choices[1]?.value || null, choice3: choices[2]?.value || null, choice4: choices[3]?.value || null, answer: MCQ.answer})
            })
            .then(response => response.json())
            .then((data) => {
                if(data.code === 200) {
                    console.log("MCQ Uploaded successfully!");
                    toast.success("MCQ created!")
                }
            })
            navigate('/MCQSbank')
        }
        const onCancel = () => {
            navigate('/MCQSbank')
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
            if(selectedClass && selectedClass.id){
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
            if(selectedSubject && selectedSubject.id){
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
            if(selectedChapters && selectedChapters.id){
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
            <Box sx={{display: "flex"}}>
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
                                    Create MCQs
                                </Typography>
                            </Box>
                            <TextField
                                variant="outlined"
                                label="Write your MCQ here"
                                value={MCQ.name}
                                onChange={(event)=>setMCQ({...MCQ, name: event.target.value})}
                                sx={{ width: '100%', mb: 2 }}
                            />
                            <TextField
                                variant="outlined"
                                label="Marks"
                                value={MCQ.marks}
                                onChange = {(event)=>setMCQ({...MCQ, marks: event.target.value})}
                                sx={{ width: '100%', mb: 2 }}
                            />
                            {choices.map(box => (
                                <TextField
                                variant="outlined"
                                label="Choices"
                                value={box.value}
                                onChange = {(event)=>handleChange(box.id, event.target.value)}
                                sx={{ width: '100%', mb: 2 }}
                            />
                            ))}
                            <TextField
                                variant="outlined"
                                label="Answer"
                                value={MCQ.answer}
                                onChange = {(event)=>setMCQ({...MCQ, answer: event.target.value})}
                                sx={{ width: '100%', mb: 2 }}
                            />
                            <Box>
                                <DropDown name = {"Classes"} data = {classes} selectedData={selectedClass} setSelectedData={setSelectedClass} width={'100%' }/>
                            </Box>
                            <Box>
                                <DropDown name = {"Subjects"} data = {subject} selectedData={selectedSubject} setSelectedData={setSelectedSubject} width={'100%' }/>
                            </Box>
                            <Box>
                                <DropDown name = {"Chapters"} data = {Chapters} selectedData={selectedChapters} setSelectedData={setSelectedChapters} width={'100%' }/>
                            </Box>
                            <Box>
                                <DropDown name = {"Topics"} data = {Topic} selectedData={selectedTopic} setSelectedData={setSelectedTopics} width={'100%' }/>
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

export default MCQCreater