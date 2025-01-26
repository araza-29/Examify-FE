import React, {useState} from 'react';
import {Card, Typography, Box, Grid, CardContent, Select, MenuItem, InputLabel, TextField, FormControl, Button, CardActions, Dialog} from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import SelectQuestions from './SelectQuestions'

export function ModalSelectQuestions({setQuestions, SelectedQuestions, id, sections}) {
    const [flag,setFlag] = useState(false);
    const handleOpen=()=>{
        console.log("Debug", SelectedQuestions);
        setFlag((cur) => !cur)
    };
    return (
        <>
       <Button onClick={handleOpen} sx={{ marginRight: { xs: 0, md: 3 }, marginTop: { xs: 3, lg: 0 }, width: '100%', color: 'white', backgroundColor: '#3f51b5','&:hover': {backgroundColor: '#303f9f'}}}>
            Select Question
            <FontAwesomeIcon icon={faCheckCircle} style={{ marginLeft: 8, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', color: 'white', borderRadius: '50%' }} />
        </Button>
        <Dialog maxWidth="xl" PaperProps={{ sx: { backgroundColor: 'transparent', boxShadow: 'none', maxHeight: '100vh', overflowY: 'auto', py: 2, borderRadius: 2 }, className: 'scrollable-container' }} open={flag} handler={handleOpen}>
            <Card sx={{ backgroundColor: 'rgb(240,238,235)', width: '100%' }}>
                <SelectQuestions handleOpen={handleOpen} SelectQuestion={SelectedQuestions} setSelectedQuestion={setQuestions} sections={sections}></SelectQuestions>
            </Card>
        </Dialog>
        </>
    )
}