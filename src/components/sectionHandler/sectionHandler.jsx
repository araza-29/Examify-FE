import React,{useEffect, useState} from "react"
import {
  Card,
  Typography,
  Box,
  Grid,
  Select,
  MenuItem,
  TextField,
  FormControl,
  Button,
  CardActions,
  Dialog,
} from "@mui/material";
import toast from 'react-hot-toast';
import { gridColumnsTotalWidthSelector } from "@mui/x-data-grid";
export default function SectionHandler ({exsistingInfo, setExsistingInfo, sections, setSections, sectionFlag, setSectionFlag, setIsSaved, isSaved}) {
    const [editedInfo, setEditedInfo] = useState(exsistingInfo)
    const [editedSections, setEditedSections] = useState(sections)
    console.log("SectionHandler", sectionFlag);
    console.log("SectionsHandler", sections);

    const handleSubmit = () => {
        const hasEmptySections = editedSections.some(sec => {
            if (sec.description === "" || sec.marks === 0 || sec.type === "") {
                toast.error(`${sec.name} isn't assigned values`);
                return true; // stops further iteration
            }
            return false;
        });
        if(hasEmptySections) {
            return;
        }
        const MCQS = editedSections.filter((sec,idx )=>{ return sec.type==="Multiple Choice Questions"}).length;
        if(MCQS > 1) {
            toast.error(`Only one section can be of MCQ `);
            return;
        }
        const Questions = editedSections.filter((sec,idx )=>{ return sec.type==="Descriptive Questions"}).length;
        if(Questions === exsistingInfo.sections) {
            toast.error(`All of the sections can't be Descriptive`);
            return;
        }
        const totalMarks = editedSections.reduce((sum, sec) => sum + Number(sec.marks), 0);
        console.log("Total Makrs", totalMarks);
        if(totalMarks!==exsistingInfo.marks) {
            toast.error(`Total marks of the sections not equal to the marks of subject`);
            return;
        }
        console.log("EditedSections",editedSections)
        setSections(editedSections);
        setExsistingInfo(editedInfo)
        console.log("bEFORE SETTING", isSaved)
        setIsSaved(false)
        console.log("After SETTING", isSaved)
        setSectionFlag(false);
    }
    useEffect(() => {
        if (sectionFlag && sections.length > 0) {
          setEditedSections(sections);
        }
      }, [sectionFlag]);
return(
    <Dialog
    open={sectionFlag}
    onEnter={()=>{toast.success('Successfully toasted!')}}
    onClose={() => {
    setSectionFlag(false);
    }}
    maxWidth="l"
    sx={{
    "& .MuiDialog-paper": {
        borderRadius: "8px",
        padding: "16px",
        width: "1000px", // Set the desired fixed width
        maxWidth: "100%", // Ensures responsiveness
    },
    }}
>
    <Card
    sx={{
        padding: "20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#ffffff",
        width: "900px",
        overflowY: "auto",
        minHeight: "300px",
        maxWidth: "100%",
    }}
    >
    <Box
        sx={{ 
            display: "flex", 
            flexDirection: "column", // Changed from row to column
            gap: 2 // Reduced gap for better spacing
        }}
    >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
            sx={{
            fontSize: "2rem", // Customize font size
            fontWeight: "bold", // Make the text bold
            color: "#333", // Text color for main content
            mb: 1, // Add margin-bottom to separate content
            }}
        >
            Sections Handler
        </Typography>
        <TextField
        label="Sections"
        fullWidth
        variant="outlined"
        sx={{ mb: 2 }}
        value={editedInfo.sections}
        onChange={(value) =>
            setEditedInfo({ ...editedInfo, sections: value.target.value })
        }
        />
        </Box>

        {editedSections.map((letter, index)=>(
            <Box 
                key={index} 
                sx={{ 
                    display: "flex", 
                    flexDirection: "row", 
                    alignItems: "center", 
                    gap: 2,
                    border: "1px solid #e0e0e0",
                    padding: 2,
                    borderRadius: 2
                }}
            >
                <Typography
                    sx={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#333",
                    mr: 2
                    }}
                >
                    {letter.name}
                </Typography>

                <FormControl sx={{ minWidth: 200 }}>
                    <Select
                    value={letter.type || ''}
                    onChange={(e) => {
                        setEditedSections((prevSections) => {
                            const updatedSections = [...prevSections]; 
                            updatedSections[index] = { ...updatedSections[index], type: e.target.value };
                            return updatedSections;
                          });
                    }}
                    displayEmpty
                    >
                    <MenuItem value="">Section Type</MenuItem>
                    <MenuItem value="Descriptive Questions">
                        Descriptive Questions
                    </MenuItem>
                    <MenuItem value="Multiple Choice Questions">
                        Multiple Choice Questions
                    </MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    label="Description"
                    variant="outlined"
                    sx={{ mx: 2, flexGrow: 1 }}
                    value={letter.description || ''}
                    onChange={(e) => {
                        setEditedSections((prevSections) => {
                            const updatedSections = [...prevSections]; 
                            updatedSections[index] = { ...updatedSections[index], description: e.target.value };
                            return updatedSections;
                          });
                    }}
                />

                <TextField
                    label="Marks"
                    type="number"
                    variant="outlined"
                    sx={{ width: 100 }}
                    value={letter.marks || ''}
                    onChange={(e) => {
                        setEditedSections((prevSections) => {
                            const updatedSections = [...prevSections]; 
                            updatedSections[index] = { ...updatedSections[index], marks: e.target.value };
                            return updatedSections;
                          });
                    }}
                />
            </Box>
        ))}
    </Box>

    <CardActions sx={{ justifyContent: "flex-end", mt: 2 }}>
        <Button
            variant="contained"
            sx={{
            background:
                "#7451f8",
            color: "white",
            // "&:hover": {
            //     background:
            //     "linear-gradient(90deg, #1976D2 0%, #21CBF3 100%)",
            // },
            }}
            onClick={handleSubmit}
        >
            Save Changes
        </Button>
        <Button
            variant="contained"
            sx={{
            ml: 2,
            backgroundColor: "#7451f8",

            }}
            onClick={() => setSectionFlag(false)}
        >
            Cancel
        </Button>
    </CardActions>
    </Card>
</Dialog>
)
}