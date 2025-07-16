import React, {useEffect, useState} from 'react';
import parser from "html-react-parser";
import {Table,Checkbox, Divider, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, Typography, Box, Grid, CardContent, Select, MenuItem, InputLabel, TextField, FormControl, Button, CardActions, Dialog} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@mui/material/styles';
import DropDown from '../../components/DropDown/DropDown';
import toast from 'react-hot-toast';

export default function SelectMCQs({ SelectMCQs, handleOpen, setSelectedMCQs, id, sections, setIsSaved, subject_id, class_id, setNewMCQ, medium}) {
    const [MCQsFlag, setMCQsFlag] = useState(false);
    const [subjectId, setSubjectId] = useState(3);
    const [MCQs, setMCQs] = useState([]);
    const [Chapters, setChapters] = useState([]);
    const [Topic, setTopics] = useState([]);
    const [selectedChapters, setSelectedChapters] = useState([]);
    const [selectedTopic, setSelectedTopics] = useState([]);
    const [selectedSection, setSelectedSection] = useState([]);
    const [MCQsSection, setMCQsSections] = useState(sections.filter(letter=>letter.type==="Multiple Choice Questions"));
    const theme = useTheme();

    const fetchMCQ = () => {
        console.log(subjectId);
        fetch("http://localhost:3000/Examination/reviewMCQBySubjectID", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({subject_id: subject_id, class_id: class_id, medium: medium})
        })
        .then(response => response.json())
        .then((data) => {
            console.log('Received MCQ data:', data); // Check the structure
            if (data.code === 200) {
                var q = data.data;
                if(SelectMCQs!=[]) {
                    q = data.data.map((d) => {
                        const isSelected = SelectMCQs.some((selected) => selected.id === d.id);
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
                setMCQs(q);
                setMCQs((prevAllMCQs) =>
                    prevAllMCQs.filter((q) => !q.selected)
                );
            } else {
                console.error('Unexpected response code:', data.code);
            }
        })
        .catch((error) => {
            console.error('Error in response:', error);
        })
        .catch((error) => {
            console.error("Error fetching MCQs:", error);
        })
    }

    useEffect(()=> {
        fetchChapters();
        fetchMCQ();
    },[subjectId])

    useEffect(()=> {
        fetchTopics();
        if(selectedChapters!=[]) {
            setMCQs(MCQs.filter((item)=> {
                return(item.chapter_id === selectedChapters.id) 
            }))
        }
    },[selectedChapters])
    useEffect(()=> {
        if(selectedTopic!=[]) {
            setMCQs(MCQs.filter((item)=> {
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
    const handleDone = () => {
        if (!selectedSection || selectedSection.length === 0) {
            toast.error("Please select a section before proceeding.")
            return;
        }
        if(selectedSection.marks === 0) {
            toast.error("Please assign marks to sections before selecting mcqs for it")
            return;
        }
        const selectedFromQuestions = MCQs.filter((question) => question.selected);
        setSelectedMCQs((prevSelectedMCQs) => {
            const alreadySelectedIds = new Set(prevSelectedMCQs.map(q => q.id));
            // Only add MCQs that are not already selected in the paper
            const newUniqueMCQs = selectedFromQuestions.filter(q => !alreadySelectedIds.has(q.id));
            // Calculate total MCQs for this section (already selected + new)
            const alreadyInSection = prevSelectedMCQs.filter(q => q.section === selectedSection.name);
            const totalMCQs = [...alreadyInSection, ...newUniqueMCQs].length;
            if (totalMCQs > selectedSection.marks) {
                toast.error("You total mcqs marks exceed assigned section marks");
                return prevSelectedMCQs;
            }
            return [
                ...prevSelectedMCQs,
                ...newUniqueMCQs.map(q => ({ ...q, section: selectedSection.name }))
            ];
        });
        setMCQs((prevMCQs) =>
            prevMCQs.filter((q) => !q.selected)
        );
        const updatedSelected = selectedFromQuestions
            .filter(q => q)
            .map(q => ({ ...q, section: selectedSection.name }));
        setNewMCQ(updatedSelected)
        setIsSaved(false)
        handleOpen();
    }
    const handleCheckBoxChange =(id) => {
        setMCQs((prevMCQs) =>
            prevMCQs.map((mcqs) =>
                mcqs.id === id ? { ...mcqs, selected: !mcqs.selected } : mcqs
            )
        );
    }
    const showMCQs = () => {debugger;
        return<>
        {MCQs.map((MCQs)=>{
        return(<TableRow sx={{ borderBottom: '1px solid', borderColor: 'gray.200' }}>
            <TableCell sx={{ py: 3, width: '8.33%', pr: 4 }}>
                <Checkbox
                    type="checkbox"
                    name={`MCQs-${MCQs.id}`}
                    checked={MCQs.selected}
                    onClick={()=>{handleCheckBoxChange(MCQs.id)}}
                    sx={{fontSize: '0.875rem'}} />
            </TableCell>
            <TableCell sx={{py: 3, pr: 4, width: '50%' }}>{MCQs.name}</TableCell>
            <TableCell sx={{py: 3, pr: 4, textAlign: 'center', width: '8%'}}>{MCQs.marks}</TableCell>
            {/*<TableCell sx={{py: 3, pr: 4, textAlign: 'center', width: '8%'}}>{MCQs.duration}</TableCell>*/}
            <TableCell sx={{py: 3, pr: 4, textAlign: 'center', width: '16%'}}>{MCQs.imageUrl ? (<img/>):(<>No Image</>)}</TableCell>
        </TableRow>
        )
    })
    }</>;};
    return (
        <Box sx={{maxWidth: 'container',marginX: 'auto',paddingX: 4,paddingY: 8,paddingTop: 4,}}>
            <Typography variant="h4" sx={{ fontWeight: "bold",color: "#7451f8"  }}>
                Select MCQs for the Paper
            </Typography>
            <Box sx={{display:'flex', maxHeight: 2, maxHeight: 2, marginBottom: 8, marginTop: 3}}>
                <Box sx={{display:'flex', marginRight: 2, alignItem:'center'}}>
                </Box>
                <Box sx={{ml:6, display: "flex", flexDirection: "row", gap: "80px", justifyContent: "flex-start"}}>
                    <DropDown name = {"Topics"} data = {Topic} selectedData={selectedTopic} setSelectedData={setSelectedTopics} width={"300px"}/>
                    
                    <DropDown name = {"Chapters"} data = {Chapters} selectedData={selectedChapters} setSelectedData={setSelectedChapters} width={"300px"}/>
                    
                    <DropDown name = {"Sections"} data = {MCQsSection} selectedData={selectedSection} setSelectedData={setSelectedSection} width={"300px"}/>
                </Box>
            </Box>
            <Box sx={{ height: '100%', width: '100%', fontSize: '0.875rem', maxHeight: '70vh', overflow: 'scroll' }}>
                {MCQsFlag ? (<Box sx={{ width: '80vw', mt: 9, fontSize: '3xl' }}>No MCQs found</Box>):(
                    <Table sx={{ border: 1, borderColor: "silver", width: '80vw', transition: 'all 500ms', backgroundColor: 'white', borderRadius: '8px' }}>
                        <TableHead sx={{ backgroundColor: 'indigo.500', color: 'white' }}>
                            <TableCell sx={{ py: 3, pr: 4,}}></TableCell>
                            <TableCell sx={{ py: 3, pr: 4, textAlign: 'left' }}>MCQs</TableCell>
                            <TableCell sx={{ py: 3, pr: 4, textAlign: 'left' }}>Marks</TableCell>
                            <TableCell sx={{ py: 3, pr: 4, textAlign: 'left' }}>Duration</TableCell>
                            <TableCell sx={{ py: 3, pr: 4, textAlign: 'left' }}>Image</TableCell>
                        </TableHead>
                        { MCQs.length>0?(
                        <TableBody>
                            {showMCQs()}
                        </TableBody>
                        ):(<></>)
                        }
                    </Table>
                )}
            </Box>
            <Divider style={{ color: "black" }} sx={{ my: 2 }}/>
            <Box sx={{ display: 'flex',flexDirection: "row", justifyContent: 'flex-end', mt: 3, gap: 2}}> 
                <Box sx={{ display: 'flex',flexDirection: "row"}}> 
                    <Button size="large" onClick={handleOpen} variant="contained" color="primary" sx={{ background: "#7451f8", 
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