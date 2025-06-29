import {Card,CardActions,CardContent,TextField, Typography,Button,Box} from '@mui/material'
import DropDown from '../../components/DropDown/DropDown';
import {useEffect, useState} from 'react';
import toast from 'react-hot-toast';
 
function MCQEditor({MCQ, setFlag, setMCQ, onSaveMCQ}) {
    console.log("MCQInfo",MCQ);
    const [userId, setUserId] = useState(5);
    const [subject,setSubject] = useState([]);
    const [editedMCQ, setEditedMCQ] = useState(MCQ)
    const [classes,setClasses] = useState([]);
    const[selectedClass,setSelectedClass] = useState([]);
    const[selectedSubject,setSelectedSubject] = useState({id: MCQ.subject_id,name: MCQ.subject_name});
    const [Chapters, setChapters] = useState([]);
    const [Topic, setTopics] = useState([]);
    const [selectedChapters, setSelectedChapters] = useState({id: MCQ.chapter_id,name: MCQ.chapter_name});
    const [selectedTopic, setSelectedTopics] = useState({id: MCQ.topic_id,name: MCQ.topic_name});
    const [choices, setChoices] = useState([
        { id: 1, value: MCQ?.choice1 || "" },
        { id: 2, value: MCQ?.choice2 || "" },
        { id: 3, value: MCQ?.choice3 || "" },
        { id: 4, value: MCQ?.choice4 || "" }
      ]);
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
    //   const addChoices = () => {
    //     if(choices.length<4){
    //         const newId = choices.length + 1;
    //         setChoices([...choices, { id: newId, value: '' }]);
    //     }
    //     else {
    //         toast.error("Already 4 choices exists!")
    //     }
    // };
    const handleChange = (id, newValue) => {
        setChoices(choices.map(box => 
        box.id === id ? { ...box, value: newValue } : box
        ));
    }
    const onSave = () => {
        console.log("SelectedTopic", selectedTopic);
        console.log("SelectedTopic", selectedSubject);
        fetch("http://localhost:3000/Examination/updateMCQ", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({mcq_id: editedMCQ.id, name: editedMCQ.name, topic_id: selectedTopic.id, marks: editedMCQ.marks, subject_id: selectedSubject.id, selected: false, choice1: choices[0].value, choice2: choices[1].value, choice3: choices[2].value, choice4: choices[3].value})
        })
        .then(response => response.json())
        .then((data) => {
            if(data.code === 200) {
                console.log("MCQ Uploaded successfully!");
                toast.success("MCQ updated sucessfully! ")
            }
        })
        setMCQ({...editedMCQ,topic_id: selectedTopic.id,topic_name: selectedTopic.name,chapter_id: selectedChapters.id, chapter_name:selectedChapters.name, subject_id: selectedSubject.id, subject_name: selectedSubject.name ,choice1: choices[0].value, choice2: choices[1].value, choice3: choices[2].value, choice4: choices[3].value})
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
            <Box sx={{margin: 2}}>
                    <Typography variant="h6" sx={{ mb: 2, color: 'text.primary', fontWeight: 'bold' }}>
                        Create MCQ
                    </Typography>
                    <TextField
                        variant="outlined"
                        label="Write your MCQ here"
                        value={editedMCQ.name}
                        onChange={(event)=>setEditedMCQ({...editedMCQ, name: event.target.value})}
                        sx={{ width: '100%', mb: 2 }}
                    />
                    <TextField
                        variant="outlined"
                        label="Medium"
                        value={editedMCQ.medium}
                        onChange={(event)=>setEditedMCQ({...editedMCQ, medium: event.target.value})}
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
                        value={editedMCQ.answer}
                        onChange = {(event)=>setEditedMCQ({...editedMCQ, answer: event.target.value})}
                        sx={{ width: '100%', mb: 2 }}
                    />
                    <Box>
                        <DropDown name = {"Classes"} data = {classes} selectedData={selectedClass} setSelectedData={setSelectedClass} width={"100%"}/>
                        <DropDown name = {"Subjects"} data = {subject} selectedData={selectedSubject} setSelectedData={setSelectedSubject} width={"100%"}/>
                        <DropDown name = {"Chapters"} data = {Chapters} selectedData={selectedChapters} setSelectedData={setSelectedChapters} width={"100%"}/>
                        <DropDown name = {"Topics"} data = {Topic} selectedData={selectedTopic} setSelectedData={setSelectedTopics} width={"100%"}/>
                    </Box>
                    <Box>
                    <Button variant="contained" onClick = {onSave} color="primary" sx={{ fontWeight: 'bold', mr: 2, backgroundColor: "#7451f8" }}>
                        Save
                    </Button>
                    <Button variant="contained" onClick = {onCancel} color="primary" sx={{ fontWeight: 'bold', backgroundColor: "#7451f8" }}>
                        Cancel
                    </Button>
                    </Box>

            </Box>
    
        </>
        );
    }

export default MCQEditor