import React, {useEffect, useState} from 'react';
import parser from "html-react-parser";
import {Table,Checkbox, Divider, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, Typography, Box, Grid, CardContent, Select, MenuItem, InputLabel, TextField, FormControl, Button, CardActions, Dialog} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@mui/material/styles';
import DropDown from '../../components/DropDown/DropDown';
import toast from 'react-hot-toast';

export default function SelectQuestions({ SelectQuestion, handleOpen, setSelectedQuestion, id, sections, setIsSaved}) {
    console.log("SelectQuestions check in section",sections);
    const [QuestionFlag, setQuestionFlag] = useState(false);
    const [subjectId, setSubjectId] = useState(1);
    const [Questions, setQuestions] = useState([]);
    // const [allQuestions, setAllQuestions] = useState([]);
    const [Chapters, setChapters] = useState([]);
    const [Topic, setTopics] = useState([]);
    const [selectedChapters, setSelectedChapters] = useState([]);
    const [selectedTopic, setSelectedTopics] = useState([]);
    const [selectedSection, setSelectedSection] = useState([]);
    const [QuestionSection, setQuestionSections] = useState(sections.filter(letter=>letter.type==="Descriptive Questions"));
    const theme = useTheme();

    useEffect(()=> {
        fetchChapters();
        fetchQuestion();
    },[subjectId])

    useEffect(()=> {
        fetchTopics();
        if(selectedChapters!=[]) {
            setQuestions(Questions.filter((item)=> {
                return(item.chapter_id === selectedChapters.id) 
            }))
        }
    },[selectedChapters])
    useEffect(()=> {
        if(selectedTopic!=[]) {
            setQuestions(Questions.filter((item)=> {
                return(item.topic_id === selectedTopic.id) 
            }))
        }
    },[selectedTopic])
    const fetchChapters = () => {
        fetch("http://localhost:3000/Examination/reviewChaptersBySubjectId",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({subject_id: 1})
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
    const fetchQuestion = () => {
        console.log(subjectId);
        fetch("http://localhost:3000/Examination/reviewQuestionsBySubjectId", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({subject_id: 1})
        })
        .then(response => response.json())
        .then((data) => {
            console.log('Received data:', data); // Check the structure
            if (data.code === 200) {
                var q = data.data;
                if(SelectQuestion!=[]) {
                    q = data.data.map((d) => {
                        const isSelected = SelectQuestion.some((selected) => selected.id === d.id);
                        if(isSelected) {
                            return { ...d, selected: true };
                        }
                        else {
                            return { ...d, selected: false };
                        }
                    });
                }
                else {
                    q = data.data;
                }
                setQuestions(q);
                setQuestions((prevAllQuestions) =>
                    prevAllQuestions.filter((q) => !q.selected)
                );
            } else {
                console.error('Unexpected response code:', data.code);
            }
        })
        .catch((error) => {
            console.error('Error in response:', error);
        })
        .catch((error) => {
            console.error("Error fetching questions:", error);
        })
    }
    const handleDone = () => {
        console.log("Section:", selectedSection);
    
        if (!selectedSection || selectedSection.length === 0) {
            toast.error("Please select a section before proceeding.")
            return;
        }
        if(selectedSection.marks === 0) {
            toast.error("Please assign marks to sections before selecting questions for it")
            return;
        }
        console.log("Section in selectQuestion:", selectedSection);
    
        // Get the selected questions
        const selected = Questions.filter((question) => question.selected);
        const totalMarks = selected.reduce((sum, q) => sum + (q.marks || 0), 0);
        if(selectedSection.marks<totalMarks) {
            toast.error("You total questions marks exceed assigned section marks")
            return;
        }
        // Store section information and update selected questions
        setSelectedQuestion((prevSelectedQuestions) => [
            ...prevSelectedQuestions,
            ...selected.map((q) => ({ ...q, section: selectedSection.name }))
        ]);
    
        // Remove selected questions from the available list
        setQuestions((prevQuestions) =>
            prevQuestions.filter((q) => !q.selected)
        );
    
        console.log("Updated Selected Questions:", selected);
        setIsSaved(false)
        handleOpen();
    };
    
    const handleCheckBoxChange = (id) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((question) =>
                question.id === id ? { ...question, selected: !question.selected } : question
            )
        );
    };
    
    
    const handleClose = () => {
        handleOpen()
    }
    
    const showQuestions = () => {
        return<>
        {Questions.map((question)=>{
        return(<TableRow sx={{ borderBottom: '1px solid', borderColor: 'gray.200' }}>
            <TableCell sx={{ py: 3, width: '8.33%', pr: 4 }}>
                <Checkbox
                    type="checkbox"
                    name={`question-${question.id}`}
                    checked={question.selected}
                    onClick={()=>{handleCheckBoxChange(question.id)}}
                    sx={{fontSize: '0.875rem'}} />
            </TableCell>
            <TableCell sx={{py: 3, pr: 4, width: '50%' }}>{question.name}</TableCell>
            <TableCell sx={{py: 3, pr: 4, textAlign: 'center', width: '8%'}}>{question.marks}</TableCell>
            {/*<TableCell sx={{py: 3, pr: 4, textAlign: 'center', width: '8%'}}>{question.duration}</TableCell>*/}
            <TableCell sx={{py: 3, pr: 4, textAlign: 'center', width: '16%'}}>{question.imageUrl ? (<img/>):(<>No Image</>)}</TableCell>
        </TableRow>
        )
    })
    }</>;};
    return (
        <Box sx={{maxWidth: 'container',marginX: 'auto',paddingX: 4,paddingY: 8,paddingTop: 4,}}>
            <Typography variant="h4" sx={{ fontFamily: theme.typography.fontFamily.mar }}>
                Select Question for the Paper
            </Typography>
            <Box sx={{display:'flex', maxHeight: 2}}>
                <Box sx={{display:'flex', marginRight: 2, alignItem:'center'}}>
                    <Typography variant="h5" sx={{marginRight: 1}}>
                        <FontAwesomeIcon icon={faFilter}/>
                    </Typography>
                    <Typography variant="h6" sx={{fontFamily: theme.typography.fontFamily.mar}}>
                        Filter
                    </Typography>
                </Box>
                <Box>
                    <DropDown name = {"Topics"} data = {Topic} selectedData={selectedTopic} setSelectedData={setSelectedTopics}/>
                </Box>
                <Box>
                    <DropDown name = {"Chapters"} data = {Chapters} selectedData={selectedChapters} setSelectedData={setSelectedChapters} />
                </Box>
                <Box>
                    <DropDown name = {"Sections"} data = {QuestionSection} selectedData={selectedSection} setSelectedData={setSelectedSection} />
                </Box>
            </Box>
            <Box sx={{ height: '100%', width: '100%', fontSize: '0.875rem', maxHeight: '70vh', overflow: 'scroll' }}>
                {QuestionFlag ? (<Box sx={{ width: '80vw', mt: 9, fontSize: '3xl' }}>No questions found</Box>):(
                    <Table sx={{ width: '80vw', transition: 'all 500ms', backgroundColor: 'white', borderRadius: '8px' }}>
                        <TableHead sx={{ backgroundColor: 'indigo.500', color: 'white' }}>
                            <TableCell sx={{ py: 3, pr: 4,}}></TableCell>
                            <TableCell sx={{ py: 3, pr: 4, textAlign: 'left' }}>Questions</TableCell>
                            <TableCell sx={{ py: 3, pr: 4, textAlign: 'left' }}>Marks</TableCell>
                            <TableCell sx={{ py: 3, pr: 4, textAlign: 'left' }}>Duration</TableCell>
                            <TableCell sx={{ py: 3, pr: 4, textAlign: 'left' }}>Image</TableCell>
                        </TableHead>
                        { Questions.length>0?(
                        <TableBody>
                            {showQuestions()}
                        </TableBody>):(<></>)
                        }
                    </Table>
                )}
            </Box>
            <Divider style={{ color: "black" }} sx={{ my: 2 }}/>
            <Box sx={{ display: 'flex',flexDirection: "row", justifyContent: 'flex-end', mt: 3, gap: 2}}> 
                <Box sx={{ display: 'flex',flexDirection: "row"}}> 
                    <Button size="large" onClick={handleClose} variant="contained" color="primary" sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>
                        Cancel
                    </Button>
                </Box>
                <Box sx={{ display: 'flex',flexDirection: "row"}}>
                    <Button size="large" onClick={handleDone} variant="contained" color="primary" sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>
                        Done
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}