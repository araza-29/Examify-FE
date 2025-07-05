import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Select,
  MenuItem,
  TextField,
  FormControl,
  Button,
  Dialog,
  IconButton
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast';

export default function SectionHandler({
  exsistingInfo,
  setExsistingInfo,
  sections,
  setSections,
  sectionFlag,
  setSectionFlag,
  setIsSaved,
  isSaved
}) {
  const [editedSections, setEditedSections] = useState(sections);

  const getNextAlphabetLetter = () => {
    if (editedSections.length === 0) return '"A"';
    
    // Get the last section's letter and continue from there
    const lastSection = editedSections[editedSections.length - 1];
    const match = lastSection.name.match(/Section\s+"([A-Z])"/);
    
    if (match) {
      const lastLetter = match[1];
      const nextCharCode = lastLetter.charCodeAt(0) + 1;
      
      // Ensure we don't go beyond 'Z'
      if (nextCharCode > 90) {
        toast.error("Maximum 26 sections allowed (A-Z)");
        return null;
      }
      
      return `"${String.fromCharCode(nextCharCode)}"`;
    }
    
    // Fallback: if no match found, start from 'A'
    return '"A"';
  };

  const addNewSection = () => {
    // Check if we've reached the maximum number of sections (A-Z = 26)
    if (editedSections.length >= 26) {
      toast.error("Maximum 26 sections allowed (A-Z)");
      return;
    }
    
    const nextLetter = getNextAlphabetLetter();
    if (!nextLetter) return; // Error already shown in getNextAlphabetLetter
    
    const newSection = {
      name: `Section ${nextLetter}`,
      type: "",
      description: "",
      marks: 0
    };
    
    setEditedSections([...editedSections, newSection]);
  };

  const removeSection = (index) => {
    const updatedSections = [...editedSections];
    updatedSections.splice(index, 1);
    
    // Reorder section names to maintain consistency with quotes
    const reorderedSections = updatedSections.map((section, idx) => ({
      ...section,
      name: `Section "${String.fromCharCode(65 + idx)}"` // "A", "B", "C", etc.
    }));
    
    setEditedSections(reorderedSections);
  };

  const handleSubmit = () => {
    // Filter out sections that have only partial data
    const validSections = editedSections.filter(sec => {
      const hasSomeData = sec.type || sec.description || sec.marks > 0;
      const hasAllData = sec.type && sec.description && sec.marks > 0;
      return !hasSomeData || hasAllData;
    });

    // Find any sections with partial data to show error
    const hasPartialSections = editedSections.some(sec => {
      const hasSomeData = sec.type || sec.description || sec.marks > 0;
      const hasAllData = sec.type && sec.description && sec.marks > 0;
      return hasSomeData && !hasAllData;
    });

    if (hasPartialSections) {
      toast.error("Please complete all fields for partially filled sections or remove them");
      return;
    }

    if (validSections.length === 0) {
      toast.error("Please add at least one complete section");
      return;
    }

    const MCQS = validSections.filter(sec => sec.type === "Multiple Choice Questions").length;
    if (MCQS > 1) {
      toast.error("Only one section can be of MCQ type");
      return;
    }

    const totalSectionMarks = validSections.reduce((sum, sec) => sum + Number(sec.marks), 0);
    if (totalSectionMarks > exsistingInfo.marks) {
      toast.error(`Combined section marks (${totalSectionMarks}) cannot exceed total subject marks (${exsistingInfo.marks})`);
      return;
    }

    setSections(validSections);
    setExsistingInfo(prev => ({ ...prev, sections: validSections.length }));
    setIsSaved(false);
    setSectionFlag(false);
    toast.success("Sections saved successfully!");
  };

  // Sync editedSections with sections prop when dialog opens
  useEffect(() => {
    if (sectionFlag) {
      setEditedSections(sections);
    }
  }, [sectionFlag]);

  return (
    <Dialog
      open={sectionFlag}
      onClose={() => setSectionFlag(false)}
      maxWidth="lg"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "8px",
          padding: "24px",
          width: "1000px",
          maxWidth: "100%",
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Typography variant="h4" sx={{ color: "#7451f8", fontWeight: "bold" }}>
          Sections Handler
        </Typography>

        {editedSections.map((section, index) => (
          <Box 
            key={index} 
            sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 2,
              border: "1px solid #e0e0e0",
              padding: 2,
              borderRadius: 2,
              position: 'relative',
              '&:hover': {
                boxShadow: 1
              }
            }}
          >
            <Typography sx={{ 
              minWidth: '100px', 
              fontWeight: 'bold',
              color: '#7451f8'
            }}>
              {section.name}
            </Typography>

            <FormControl sx={{ minWidth: 200 }}>
              <Select
                value={section.type || ''}
                onChange={(e) => {
                  const updatedSections = [...editedSections];
                  updatedSections[index].type = e.target.value;
                  setEditedSections(updatedSections);
                }}
                displayEmpty
              >
                <MenuItem value="">Section Type</MenuItem>
                <MenuItem value="Short Questions">Short Questions</MenuItem>
                <MenuItem value="Descriptive Questions">Descriptive Questions</MenuItem>
                <MenuItem value="Multiple Choice Questions">Multiple Choice Questions</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Description"
              variant="outlined"
              sx={{ flexGrow: 1 }}
              value={section.description || ''}
              onChange={(e) => {
                const updatedSections = [...editedSections];
                updatedSections[index].description = e.target.value;
                setEditedSections(updatedSections);
              }}
            />

            <TextField
              label="Marks"
              type="number"
              variant="outlined"
              sx={{ width: 100 }}
              value={section.marks || ''}
              onChange={(e) => {
                const updatedSections = [...editedSections];
                updatedSections[index].marks = e.target.value;
                setEditedSections(updatedSections);
              }}
              inputProps={{ min: 0 }}
            />

            <IconButton
              onClick={() => removeSection(index)}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'rgba(0, 0, 0, 0.54)',
                '&:hover': {
                  color: 'red',
                  backgroundColor: 'rgba(255, 0, 0, 0.08)'
                }
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={addNewSection}
          disabled={editedSections.length >= 26}
          sx={{
            mt: 1,
            backgroundColor: editedSections.length >= 26 ? "#ccc" : "#7451f8",
            color: "white",
            '&:hover': {
              backgroundColor: editedSections.length >= 26 ? "#ccc" : '#5a3acb',
            },
            '&:disabled': {
              backgroundColor: "#ccc",
              color: "#666"
            }
          }}
        >
          Add New Section {editedSections.length >= 26 ? '(Max Reached)' : `(${26 - editedSections.length} remaining)`}
        </Button>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
          <Button
            variant="outlined"
            sx={{
              color: "#7451f8",
              borderColor: "#7451f8",
              '&:hover': {
                borderColor: '#5a3acb',
              }
            }}
            onClick={() => setSectionFlag(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#7451f8",
              color: "white",
              '&:hover': {
                backgroundColor: '#5a3acb',
              }
            }}
            onClick={handleSubmit}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}