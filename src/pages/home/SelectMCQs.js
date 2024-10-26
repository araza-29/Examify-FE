import React, {useEffect, useState} from 'react';
import parser from "html-react-parser";
import {Table,Checkbox, Divider, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, Typography, Box, Grid, CardContent, Select, MenuItem, InputLabel, TextField, FormControl, Button, CardActions, Dialog} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@mui/material/styles';
import DropDown from './DropDown';

export default function SelectMCQs({ SelectMCQs, handleOpen, setSelectedMCQs, id}) {
    const [MCQsFlag, setMCQsFlag] = useState(false);
    const [subjectId, setSubjectId] = useState(1);
    const [MCQs, setMCQs] = useState([]);
    const [allMCQs, setAllMCQs] = useState([]);
    const [Chapters, setChapters] = useState([]);
    const [Topic, setTopics] = useState([]);
    const [selectedChapters, setSelectedChapters] = useState([]);
    const [selectedTopic, setSelectedTopics] = useState([]);
    const theme = useTheme();

    const fetchMCQs = () => {
        console.log(subjectId);
        fetch("http://localhost:3000/Examination/reviewMCQBySubjectID", {
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
                setAllMCQs(q);
                setMCQs(q);
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
    const fetchSections = () => {
        console.log(subjectId);
        fetch("http://localhost:3000/Examination/reviewMCQBySubjectID", {
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
                setAllMCQs(q);
                setMCQs(q);
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
        fetchMCQs();
        if(selectedChapters!=[]) {
            setMCQs(allMCQs.filter((item)=> {
                return(item.chapter_id === selectedChapters.id) 
            }))
        }
    },[subjectId])

    useEffect(()=> {
        fetchTopics();
        if(selectedChapters!=[]) {
            setMCQs(allMCQs.filter((item)=> {
                return(item.chapter_id === selectedChapters.id) 
            }))
        }
    },[selectedChapters])
    useEffect(()=> {
        if(selectedTopic!=[]) {
            setMCQs(allMCQs.filter((item)=> {
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
    const handleDone = () => {
        const selected = allMCQs.filter((MCQs) => MCQs.selected);
        setSelectedMCQs(selected);
        handleOpen();
    }
    const handleCheckBoxChange =(id) => {
        allMCQs.map((MCQs)=>{
           if( MCQs.id === id){ 
            MCQs.selected = !MCQs.selected;
            localStorage.setItem(id+"",MCQs.selected);
           }
        }
        );
        setMCQs(MCQs)
        setSelectedMCQs(allMCQs.filter((MCQs) => MCQs.selected))
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
            <Typography variant="h4" sx={{ fontFamily: theme.typography.fontFamily.mar }}>
                Select MCQs for the Paper
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
            </Box>
            <Box sx={{ height: '100%', width: '100%', fontSize: '0.875rem', maxHeight: '70vh', overflow: 'scroll' }}>
                {MCQsFlag ? (<Box sx={{ width: '80vw', mt: 9, fontSize: '3xl' }}>No MCQs found</Box>):(
                    <Table sx={{ width: '80vw', transition: 'all 500ms', backgroundColor: 'white', borderRadius: '8px' }}>
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
                        </TableBody>):(<></>)
                        }
                    </Table>
                )}
            </Box>
            <Divider style={{ color: "black" }} sx={{ my: 2 }}/>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}> 
                <Button size="large" onClick={handleDone} variant="contained" color="primary" sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>
                    Done
                </Button>
            </Box>
        </Box>
    );
}