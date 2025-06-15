import {Card,CardActions,CardContent,TextField, Typography,Button,Box, FormControl, Select, InputLabel, MenuItem} from '@mui/material'
import DropDown from '../../components/DropDown/DropDown';
import {useEffect, useState} from 'react';
import toast from 'react-hot-toast';

function QuestionEditor({Questions, setFlag, setQuestion}) {
    console.log("QuestionInfo",Questions);
    const [userId, setUserId] = useState(5);
    const [subject,setSubject] = useState([]);
    const [classes,setClasses] = useState([]);
    const[selectedClass,setSelectedClass] = useState(null);
    const [editedQuestion, setEditedQuestion] = useState(Questions);
    const[selectedSubject,setSelectedSubject] = useState({id: Questions.subject_id,name: Questions.subject_name});
    const [Chapters, setChapters] = useState([]);
    const [Topic, setTopics] = useState([]);
    const [selectedChapters, setSelectedChapters] = useState({id: Questions.chapter_id,name: Questions.chapter_name});
    const [selectedTopic, setSelectedTopics] = useState({id: Questions.topic_id,name: Questions.topic_name});
    useEffect(()=>{
        fetch("http://localhost:3000/Examination/reviewAnswer", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({question_id: Questions.id})
        })
        .then(response => response.json())
        .then((data) => {
            if(data.code === 200) {
                setQuestion({...Questions, answer_id: data.data.id, answer: data.data.answer})
                setEditedQuestion({...editedQuestion, answer_id: data.data.id, answer: data.data.answer})
                console.log("Asnwers fetched!")
            }
        })
    },[])
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
        fetch("http://localhost:3000/Examination/updateQuestion", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: editedQuestion.id, name: editedQuestion.name, topic_id: selectedTopic.id, marks: editedQuestion.marks, subject_id: selectedSubject.id, selected: false})
        })
        .then(response => response.json())
        .then((data) => {
            if(data.code === 200) {
                console.log("Question Uploaded successfully!");
                if(editedQuestion.answer != Questions.answer) {
                    fetch("http://localhost:3000/Examination/updateAnswer",{
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({question_id: editedQuestion.id, answer: editedQuestion.answer})
                    })
                    .then(response => response.json())
                    .then((data) => {
                        console.log("Subject data", data);
                        if(data.code === 200) {
                            toast.success("Question Edited Sucessfully!")
                        }
                        else {
                            console.log("Chapter data not found");
                        }
                    })
                }
                else{
                toast.success("Question Edited Sucessfully!")
                }
            }
        })

        setQuestion({...editedQuestion,topic_id: selectedTopic.id,topic_name: selectedTopic.name,chapter_id: selectedChapters.id, chapter_name:selectedChapters.name, subject_id: selectedSubject.id, subject_name: selectedSubject.name})
        setFlag(false);
    }
    const onCancel = () => {
        setFlag(false)
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
            <Card sx={{ width: "90%", m: 'auto', mt: 4, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, color: 'text.primary', fontWeight: 'bold' }}>
                        Edit Question
                    </Typography>
                    <TextField
                        variant="outlined"
                        label="Write your question here"
                        value={editedQuestion.name}
                        onChange={(event)=>setEditedQuestion({...editedQuestion, name: event.target.value})}
                        sx={{ width: '100%', mb: 2 }}
                    />
                    <TextField
                        variant="outlined"
                        label="Marks"
                        value={editedQuestion.marks}
                        onChange={(event)=>setEditedQuestion({...editedQuestion, marks: event.target.value})}
                        sx={{ width: '100%', mb: 2 }}
                    />
                    <FormControl sx={{ width: '100%', mb: 2 }}>
                        <InputLabel sx={{ color: 'primary.main' }}>Question Type</InputLabel>
                        <Select
                            value={editedQuestion?.type || ""}
                            name="searchTopic"
                            onChange={(event) => setEditedQuestion({...editedQuestion, type: event.target.value})}
                            sx={{ 
                                backgroundColor: 'background.paper', 
                                borderRadius: 1 
                            }}
                        >
                            <MenuItem key={1} value="long">Long Questions</MenuItem>
                            <MenuItem key={2} value="short">Short Questions</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        variant="outlined"
                        label="Answer"
                        value={editedQuestion.answer}
                        onChange={(event)=>setEditedQuestion({...editedQuestion, answer: event.target.value})}
                        sx={{ width: '100%', mb: 2 }}
                    />
                    <Box>
                        <DropDown name = {"Subjects"} data ={subject} selectedData={selectedSubject} setSelectedData={setSelectedSubject} sx={{ width: '100%' }}/>
                    </Box>
                    <Box>
                        <DropDown name = {"Chapters"} data = {Chapters} selectedData={selectedChapters} setSelectedData={setSelectedChapters} sx={{ width: '100%' }}/>
                    </Box>
                    <Box>
                        <DropDown name = {"Topics"} data = {Topic} selectedData={selectedTopic} setSelectedData={setSelectedTopics} sx={{ width: '100%' }}/>
                    </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', pr: 2 }}>
                    <Button variant="contained" onClick = {onSave} color="primary" sx={{ fontWeight: 'bold' }}>
                        Save
                    </Button>
                    <Button variant="contained" onClick = {onCancel} color="primary" sx={{ fontWeight: 'bold' }}>
                        Cancel
                    </Button>
                </CardActions>
            </Card>
    
        </>
        );
    }

export default QuestionEditor