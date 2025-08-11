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

// Helper to check if a section of a given type exists
export function hasSectionType(sections, type) {
  return sections.some(sec => sec.type === type);
}

export default function SectionHandler({
  exsistingInfo,
  setExsistingInfo,
  sections,
  setSections,
  sectionFlag,
  setSectionFlag,
  setIsSaved,
  isSaved,
  deletedSections,
  setDeletedSections,
  onSave,
  medium
}) {
  const [editedSections, setEditedSections] = useState(sections);
  const [displayValues, setDisplayValues] = useState({});

  const getSectionTypeName = (type) => {
    if (medium === 'Urdu') {
      switch (type) {
        case 'Short Questions':
          return 'مختصر سوالات کے جوابات';
        case 'Descriptive Questions':
          return 'تفصیلی سوالات کے جوابات';
        case 'Multiple Choice Questions':
          return 'کثیر الانتخابی سوالات';
        default:
          return type;
      }
    }
    return type;
  };

  const getSectionTypeValue = (displayName) => {
    if (medium === 'Urdu') {
      switch (displayName) {
        case 'مختصر سوالات کے جوابات':
          return 'Short Questions';
        case 'تفصیلی سوالات کے جوابات':
          return 'Descriptive Questions';
        case 'کثیر الانتخابی سوالات':
          return 'Multiple Choice Questions';
        default:
          return displayName;
      }
    }
    return displayName;
  };

  const getNextAlphabetLetter = () => {
    if (editedSections.length === 0) return '"A"';
    
    const lastSection = editedSections[editedSections.length - 1];
    const match = lastSection.name.match(/Section\s+"([A-Z])"/);
    
    if (match) {
      const lastLetter = match[1];
      const nextCharCode = lastLetter.charCodeAt(0) + 1;
      
      if (nextCharCode > 90) {
        toast.error("Maximum 26 sections allowed (A-Z)");
        return null;
      }
      
      return `"${String.fromCharCode(nextCharCode)}"`;
    }
    
    return '"A"';
  };

  const addNewSection = () => {
    if (editedSections.length >= 26) {
      toast.error("Maximum 26 sections allowed (A-Z)");
      return;
    }
    
    const nextLetter = getNextAlphabetLetter();
    if (!nextLetter) return;
    
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
    const removedSection = updatedSections[index];
    if (removedSection && removedSection.databaseId) {
      setDeletedSections(prev => [...prev, removedSection.databaseId]);
    }
    updatedSections.splice(index, 1);
    
    const reorderedSections = updatedSections.map((section, idx) => ({
      ...section,
      name: `Section "${String.fromCharCode(65 + idx)}"`
    }));
    
    setEditedSections(reorderedSections);
    
    setDisplayValues(prev => {
      const newValues = {...prev};
      delete newValues[index];
      return newValues;
    });
  };

  const handleSubmit = () => {
    const validSections = editedSections.filter(sec => {
      const hasSomeData = sec.type || sec.description || sec.marks > 0;
      const hasAllData = sec.type && sec.description && sec.marks > 0;
      return !hasSomeData || hasAllData;
    });

    const processedSections = validSections.map(sec => {
      const originalSection = sections.find(orig => orig.name === sec.name);
      return {
        ...sec,
        databaseId: originalSection?.databaseId || sec.databaseId,
        isFromDatabase: originalSection?.isFromDatabase || sec.isFromDatabase,
        id: originalSection?.id || sec.id
      };
    });

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

    setSections(processedSections);
    setIsSaved(false);
    if (onSave) {
      onSave(processedSections);
    }
    toast.success("Sections saved successfully!");
  };

  useEffect(() => {
    if (sectionFlag) {
      setEditedSections(sections);
      
      const initialDisplayValues = {};
      
      sections.forEach((section, index) => {
        if (section.type) {
          initialDisplayValues[index] = getSectionTypeName(section.type);
        }
      });
      
      setDisplayValues(initialDisplayValues);
    }
  }, [sectionFlag, medium]);

  return (
    <Dialog
      open={sectionFlag}
      onClose={() => setSectionFlag(false)}
      maxWidth="lg"
      dir={medium === 'Urdu' ? 'rtl' : 'ltr'}
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
                value={displayValues[index] || ''}
                onChange={(e) => {
                  const updatedSections = [...editedSections];
                  const englishType = getSectionTypeValue(e.target.value);
                  updatedSections[index].type = englishType;
                  updatedSections[index].displayType = e.target.value;
                  setEditedSections(updatedSections);
                  setDisplayValues(prev => ({
                    ...prev,
                    [index]: e.target.value
                  }));
                }}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return 'Section Type';
                  }
                  return selected;
                }}
              >
                <MenuItem value="">
                  Section Type
                </MenuItem>
                <MenuItem 
                  value={medium === 'Urdu' ? 'مختصر سوالات کے جوابات' : 'Short Questions'} 
                  disabled={editedSections.some((sec, idx) => 
                    sec.type === 'Short Questions' && idx !== index
                  )}
                >
                  {medium === 'Urdu' ? 'مختصر سوالات کے جوابات' : 'Short Questions'}
                </MenuItem>
                <MenuItem 
                  value={medium === 'Urdu' ? 'تفصیلی سوالات کے جوابات' : 'Descriptive Questions'} 
                  disabled={editedSections.some((sec, idx) => 
                    sec.type === 'Descriptive Questions' && idx !== index
                  )}
                >
                  {medium === 'Urdu' ? 'تفصیلی سوالات کے جوابات' : 'Descriptive Questions'}
                </MenuItem>
                <MenuItem 
                  value={medium === 'Urdu' ? 'کثیر الانتخابی سوالات' : 'Multiple Choice Questions'} 
                  disabled={editedSections.some((sec, idx) => 
                    sec.type === 'Multiple Choice Questions' && idx !== index
                  )}
                >
                  {medium === 'Urdu' ? 'کثیر الانتخابی سوالات' : 'Multiple Choice Questions'}
                </MenuItem>
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
          Add New Section
        </Button>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
          <Button
            variant="conatined"
            sx={{
              backgroundColor: "#7451f8",
              color: "white",
              '&:hover': {
                backgroundColor: '#5a3acb',
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

// Simple Loader component for reuse
export function Loader() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <div style={{
        border: '6px solid #f3f3f3',
        borderTop: '6px solid #7451f8',
        borderRadius: '50%',
        width: 48,
        height: 48,
        animation: 'spin 1s linear infinite'
      }} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  );
}