import React, {useState} from 'react';
import {Card, Typography, Box, Grid, CardContent, Select, MenuItem, InputLabel, TextField, FormControl, Button, CardActions, Dialog} from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import SelectMCQs from './SelectMCQs'

export function ModalSelectMCQs({setMCQs, SelectedMCQs, id, sections, setIsSaved, subject_id, class_id, setNewMCQ, medium}) {
    const [flag,setFlag] = useState(false);
    const handleOpen=()=>setFlag((cur) => !cur);
    return (
        <>
       <Button onClick={handleOpen} sx={{ marginRight: { xs: 0, md: 3 }, marginTop: { xs: 3, lg: 0 }, width: '110%', color: 'white', backgroundColor: "#7451f8",
            '&:hover': {
                backgroundColor: '#5a3acb',
                transform: 'scale(1.02)',
                transition: 'all 0.2s ease'
            }}}>
            Select MCQs
            <FontAwesomeIcon style={{ marginLeft: 8, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', color: 'white', borderRadius: '50%' }} />
        </Button>
        <Dialog maxWidth="xl" PaperProps={{ sx: { backgroundColor: 'transparent', boxShadow: 'none', maxHeight: '100vh', overflowY: 'auto', py: 2, borderRadius: 2 }, className: 'scrollable-container' }} open={flag} handler={handleOpen}>
            <Card sx={{ width: '100%' }}>
                <SelectMCQs handleOpen={handleOpen} SelectMCQs={SelectedMCQs} setSelectedMCQs={setMCQs} sections={sections} setIsSaved={setIsSaved} subject_id={subject_id} class_id={class_id} setNewMCQ = {setNewMCQ} medium={medium}></SelectMCQs>
            </Card>
        </Dialog>
        </>
    )
}