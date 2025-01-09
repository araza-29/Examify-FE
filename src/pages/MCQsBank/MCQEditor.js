import {Card,CardActions,CardContent,TextField, Typography,Button,Box} from '@mui/material'
import DropDown from './DropDown';
import {useEffect, useState} from 'react';
 
function MCQEditor({MCQ, setFlag, setMCQ}) {
    console.log("MCQInfo",MCQ);
    const [userId, setUserId] = useState(1);
    const [subject,setSubject] = useState([]);
    const[selectedSubject,setSelectedSubject] = useState({id: MCQ.subject_id,name: MCQ.subject_name});
    const [Chapters, setChapters] = useState([]);
    const [Topic, setTopics] = useState([]);
    const [selectedChapters, setSelectedChapters] = useState({id: MCQ.chapter_id,name: MCQ.chapter_name});
    const [selectedTopic, setSelectedTopics] = useState({id: MCQ.topic_id,name: MCQ.topic_name});
    const [choices, setChoices] = useState([{ id: 1, value: '' }]);
    useEffect(()=>{
        fetchSubject();
    },[userId])
    useEffect(()=> {
        fetchChapters();
      },[selectedSubject])
      useEffect(()=> {
        fetchTopics();
      },[selectedChapters])
      const addChoices = () => {
        const newId = choices.length + 1;
        setChoices([...choices, { id: newId, value: '' }]);
    };
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
            body: JSON.stringify({id: MCQ.id, name: MCQ.name, topic_id: selectedTopic.id, marks: MCQ.marks, subject_id: selectedSubject.id, selected: false})
        })
        .then(response => response.json())
        .then((data) => {
            if(data.code === 200) {
                console.log("MCQ Uploaded successfully!");
            }
        })
        setMCQ({...MCQ,topic_id: selectedTopic.id,topic_name: selectedTopic.name,chapter_id: selectedChapters.id, chapter_name:selectedChapters.name, subject_id: selectedSubject.id, subject_name: selectedSubject.name})
        setFlag(false);
    }
    const fetchSubject = () => {
        if(userId){
        fetch("http://localhost:3000/Examination/reviewSubjectsByUserID",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_id: userId})
        })
        .then(response => response.json())
        .then((data) => {
            console.log("Subject data", data);
            if(data.code === 200) {
                setSubject(data.data);
            }
            else {
                console.log("Chapter data not found");
            }
        }).catch((error) => {
            console.error("Error fetching chapters:", error);
        })
      }
    }
      const fetchChapters = () => {
        if(selectedSubject.id){
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
        if(selectedChapters.id){
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
            <Card sx={{ maxWidth: 500, m: 'auto', mt: 4, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, color: 'text.primary', fontWeight: 'bold' }}>
                        Create MCQ
                    </Typography>
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
                        onChange={(event)=>setMCQ({...MCQ, marks: event.target.value})}
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
                    <Button 
                        onClick={addChoices}
                        className="bg-blue-500 hover:bg-blue-600"
                    >
                        Add Textbox
                    </Button>
                    <Box>
                        <DropDown name = {"Topics"} data = {Topic} selectedData={selectedTopic} setSelectedData={setSelectedTopics} sx={{ width: '300px' }}/>
                    </Box>
                    <Box>
                        <DropDown name = {"Chapters"} data = {Chapters} selectedData={selectedChapters} setSelectedData={setSelectedChapters} sx={{ width: '300px' }}/>
                    </Box>
                    <Box>
                        <DropDown name = {"Subjects"} data ={subject} selectedData={selectedSubject} setSelectedData={setSelectedSubject} sx={{ width: '300px' }}/>
                    </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', pr: 2 }}>
                    <Button variant="contained" onClick = {onSave} color="primary" sx={{ fontWeight: 'bold' }}>
                        Save
                    </Button>
                </CardActions>
            </Card>
    
        </>
        );
    }

export default MCQEditor