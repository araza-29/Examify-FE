import React, {useEffect, useState} from 'react';
import parser from "html-react-parser";
import {Table,Checkbox, Divider, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, Typography, Box, Grid, CardContent, Select, MenuItem, InputLabel, TextField, FormControl, Button, CardActions, Dialog} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@mui/material/styles';
import DropDown from '../../components/DropDown/DropDown';
import toast from 'react-hot-toast';

export default function SelectQuestions({ SelectQuestion, handleOpen, setSelectedQuestion, id, sections, setIsSaved, subject_id, class_id, setNewQuestion, medium}) {
    console.log("SelectQuestions check in section",sections);
    const [QuestionFlag, setQuestionFlag] = useState(false);
    const [subjectId, setSubjectId] = useState(3);
    const [Questions, setQuestions] = useState([]);
    // const [allQuestions, setAllQuestions] = useState([]);
    const [Chapters, setChapters] = useState([]);
    const [Topic, setTopics] = useState([]);
    const [selectedChapters, setSelectedChapters] = useState([]);
    const [selectedTopic, setSelectedTopics] = useState([]);
    const [selectedSection, setSelectedSection] = useState([]);
    const [QuestionSection, setQuestionSections] = useState(sections.filter(letter=>letter.type!=="Multiple Choice Questions"));
    const [openImageModal, setOpenImageModal] = useState(false);
    const [modalImage, setModalImage] = useState(null);
    const theme = useTheme();

    useEffect(()=> {
        fetchChapters();
        fetchQuestion();
    },[subject_id])

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
            body: JSON.stringify({subject_id: subject_id})
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
            body: JSON.stringify({subject_id: subject_id, class_id: class_id, medium: medium})
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
        const selectedFromQuestions = Questions.filter((question) => question.selected);
        setSelectedQuestion((prevSelectedQuestions) => {
            const alreadySelectedIds = new Set(prevSelectedQuestions.map(q => q.id));
            // Only add questions that are not already selected in the paper
            const newUniqueQuestions = selectedFromQuestions.filter(q => !alreadySelectedIds.has(q.id));
            // Calculate total marks for this section (already selected + new)
            const alreadyInSection = prevSelectedQuestions.filter(q => q.section === selectedSection.name);
            const totalMarks = [...alreadyInSection, ...newUniqueQuestions].reduce((sum, q) => sum + (q.marks || 0), 0);
            if (totalMarks > selectedSection.marks) {
                toast.error("You total questions marks exceed assigned section marks");
                return prevSelectedQuestions;
            }
            return [
                ...prevSelectedQuestions,
                ...newUniqueQuestions.map(q => ({ ...q, section: selectedSection.name }))
            ];
        });
        // Remove selected questions from the available list
        setQuestions((prevQuestions) =>
            prevQuestions.filter((q) => !q.selected)
        );
        const updatedSelected = selectedFromQuestions
            .filter(q => q)
            .map(q => ({ ...q, section: selectedSection.name }));
        setNewQuestion(updatedSelected);
        console.log("Updated Selected Questions:", updatedSelected);
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
            <TableCell sx={{py: 3, pr: 4, textAlign: 'center', width: '16%'}}>
                {question.image && question.image.startsWith('data:') ? (
                    <img
                        src={question.image}
                        alt="Question Preview"
                        style={{ maxWidth: '60px', maxHeight: '60px', borderRadius: 4, border: '1px solid #ccc', cursor: 'pointer' }}
                        onClick={() => { setModalImage(question.image); setOpenImageModal(true); }}
                    />
                ) : (
                    <>No Image</>
                )}
            </TableCell>
        </TableRow>
        )
    })
    }
    {/* Modal for large image preview */}
    <Dialog open={openImageModal} onClose={() => setOpenImageModal(false)} maxWidth="md">
        <Box p={2} display="flex" justifyContent="center" alignItems="center">
            <img
                src={modalImage}
                alt="Large Preview"
                style={{ maxWidth: '90vw', maxHeight: '80vh', borderRadius: 8, border: '1px solid #ccc' }}
            />
        </Box>
    </Dialog>
    </>;
    };
    return (
        <Box sx={{maxWidth: 'container',marginX: 'auto',paddingX: 4,paddingY: 8,paddingTop: 4,}}>
            <Typography variant="h4" sx={{ fontWeight: "bold",color: "#7451f8" }}>
                Select Question for the Paper
            </Typography>
            <Box sx={{display:'flex', maxHeight: 2, marginBottom: 8, marginTop: 3}}>
                <Box sx={{display:'flex', marginRight: 2, marginLeft: 2, alignItem:'center'}}>
                </Box>
                <Box sx={{display: "flex", flexDirection: "row", gap: "80px",ml: 6, justifyContent: "flex-start"}}>
                    <DropDown name = {"Topics"} data = {Topic} selectedData={selectedTopic} setSelectedData={setSelectedTopics} width={"300px"}/>
                    
                    <DropDown name = {"Chapters"} data = {Chapters} selectedData={selectedChapters} setSelectedData={setSelectedChapters} width={"300px"}/>
                    
                    <DropDown name = {"Sections"} data = {QuestionSection} selectedData={selectedSection} setSelectedData={setSelectedSection} width={"300px"}/>
                </Box>
            </Box>
            <Box sx={{ height: '100%', width: '100%', fontSize: '0.875rem', maxHeight: '70vh', overflow: 'scroll' }}>
                {QuestionFlag ? (<Box sx={{ width: '80vw', mt: 9, fontSize: '3xl' }}>No questions found</Box>):(
                    <Table sx={{border: 1, borderColor: "silver", width: '80vw', transition: 'all 500ms', backgroundColor: 'white', borderRadius: '8px' }}>
                        <TableHead sx={{ backgroundColor: 'indigo.500', color: 'white' }}>
                            <TableCell sx={{ py: 3, pr: 4,}}></TableCell>
                            <TableCell sx={{ py: 3, pr: 4, textAlign: 'left' }}>Questions</TableCell>
                            <TableCell sx={{ py: 3, pr: 4, textAlign: 'center' }}>Marks</TableCell>
                            <TableCell sx={{ py: 3, pr: 4, textAlign: 'center' }}>Image</TableCell>
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
                    <Button size="large" onClick={handleClose} variant="contained" color="primary" sx={{ background: "#7451f8", 
                        '&:hover': {
                            backgroundColor: '#5a3acb',
                            transform: 'scale(1.02)',
                            transition: 'all 0.2s ease'
                        } }}>
                        Cancel
                    </Button>
                </Box>
                <Box sx={{ display: 'flex',flexDirection: "row"}}>
                    <Button size="large" onClick={handleDone} variant="contained" color="primary" sx={{ background: "#7451f8", 
                        '&:hover': {
                            backgroundColor: '#5a3acb',
                            transform: 'scale(1.02)',
                            transition: 'all 0.2s ease'
                        } }}>
                        Done
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}