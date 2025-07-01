import { TextField, Typography, Button, Box, FormHelperText } from '@mui/material';
import DropDown from '../../components/DropDown/DropDown';
import { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';

function MCQEditor({ MCQ, setFlag, setMCQ, onSaveMCQ }) {
    const [errors, setErrors] = useState({
        name: false,
        medium: false,
        answer: false,
        choices: [false, false, false, false],
        class: false,
        subject: false,
        chapter: false,
        topic: false
    });
    const [userId] = useState(parseInt(localStorage.getItem("userId"), 10));
    console.log("MCQ value:", MCQ); // Check if MCQ exists
    const [medium, setMedium] = useState({name: MCQ?.medium || null});
    const [answer, setAnswer] = useState({name: MCQ?.answer || null});
    const [subject, setSubject] = useState([]);
    const [editedMCQ, setEditedMCQ] = useState(MCQ);
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(MCQ.class_id ? { id: MCQ.class_id, name: MCQ.class_name } : null);
    const [selectedSubject, setSelectedSubject] = useState(MCQ.subject_id ? { id: MCQ.subject_id, name: MCQ.subject_name } : null);
    const [Chapters, setChapters] = useState([]);
    const [Topic, setTopics] = useState([]);
    const [selectedChapters, setSelectedChapters] = useState(MCQ.chapter_id ? { id: MCQ.chapter_id, name: MCQ.chapter_name } : null);
    const [selectedTopic, setSelectedTopics] = useState(MCQ.topic_id ? { id: MCQ.topic_id, name: MCQ.topic_name } : null);
    const [choices, setChoices] = useState([
        { id: 1, name: MCQ?.choice1 || "" },
        { id: 2, name: MCQ?.choice2 || "" },
        { id: 3, name: MCQ?.choice3 || "" },
        { id: 4, name: MCQ?.choice4 || "" }
    ]);

    // Validation functions
    const validateForm = () => {
        const isValidAnswer = choices.some(choice => choice.name === editedMCQ.answer);
        const newErrors = {
            name: !editedMCQ.name,
            medium: !editedMCQ.medium,
            answer: !editedMCQ.answer || !isValidAnswer,
            choices: choices.map(choice => !choice.name),
            class: !selectedClass,
            subject: !selectedSubject,
            chapter: !selectedChapters,
            topic: !selectedTopic
        };
        setErrors(newErrors);
        
        return !Object.values(newErrors).flat().some(Boolean);
    };

    // Handlers
    const handleChange = (id, newValue) => {
        setChoices(choices.map(box => 
            box.id === id ? { ...box, name: newValue } : box
        ));
        if (newValue) {
            setErrors(prev => ({
                ...prev,
                choices: prev.choices.map((err, idx) => 
                    idx === id - 1 ? false : err
                )
            }));
        }
    };

    const handleMCQChange = (field, value) => {
        setEditedMCQ(prev => ({ ...prev, [field]: value }));
        if (value) {
            setErrors(prev => ({ ...prev, [field]: false }));
        }
    };

    const handleDropdownChange = (setter, field) => (value) => {
        setter(value);
        if (value) {
            setErrors(prev => ({ ...prev, [field]: false }));
        }
    };

    // Form submission
    const onSave = () => {
        if (!validateForm()) {
            toast.error("Please fill all required fields correctly");
            return;
        }

        fetch("http://localhost:3000/Examination/updateMCQ", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mcq_id: editedMCQ.id, 
                name: editedMCQ.name, 
                topic_id: selectedTopic.id, 
                marks: editedMCQ.marks, 
                subject_id: selectedSubject.id, 
                selected: false, 
                choice1: choices[0].name, 
                choice2: choices[1].name, 
                choice3: choices[2].name, 
                choice4: choices[3].value,
                answer: answer.name,
                medium: medium.name
            })
        })
        .then(response => response.json())
        .then((data) => {
            if(data.code === 200) {
                toast.success("MCQ updated successfully!");
                setMCQ({
                    ...editedMCQ,
                    topic_id: selectedTopic.id,
                    topic_name: selectedTopic.name,
                    chapter_id: selectedChapters.id, 
                    chapter_name: selectedChapters.name, 
                    subject_id: selectedSubject.id, 
                    subject_name: selectedSubject.name,
                    choice1: choices[0].value, 
                    choice2: choices[1].value, 
                    choice3: choices[2].value, 
                    choice4: choices[3].value
                });
                setFlag(false);
            }
        })
        .catch(error => {
            console.error("Error updating MCQ:", error);
            toast.error("Failed to update MCQ");
        });
    };

    const onCancel = () => {
        setFlag(false);
    };

    const isInitialRender = useRef(true);

    const isInitialMount = useRef(true);

    const skipResetRef = useRef(true);

    // 1. Fetch classes on userId change
    useEffect(() => {
        fetchClasses();
    }, [userId]);

    // 2. Handle class change (and initial fetch)
    useEffect(() => {
        if (selectedClass) {
            // Only reset if we're not in initial setup
            if (!skipResetRef.current) {
                setSelectedSubject(null);
                setSelectedChapters(null);
                setSelectedTopics(null);
            }
            fetchSubject();
        } else {
            setSubject([]);
        }
        
    }, [selectedClass]);

    // 3. Handle subject change (and initial fetch)
    useEffect(() => {
        if (selectedSubject) {
            if (!skipResetRef.current) {
                setSelectedChapters(null);
                setSelectedTopics(null);
            }
            fetchChapters();
        } else {
            setChapters([]);
        }
    }, [selectedSubject]);

    // 4. Handle chapters change (and initial fetch)
    useEffect(() => {
        if (selectedChapters) {
            if (!skipResetRef.current) {
                setSelectedTopics(null);
            }
            fetchTopics();
        } else {
            setTopics([]);
        }
    }, [selectedChapters]);

    // 5. After initial setup, set skipReset to false
    useEffect(() => {
        const timer = setTimeout(() => {
            skipResetRef.current = false;
        }, 100);
        
        return () => clearTimeout(timer);
    }, []);

    const fetchClasses = () => {
        if(userId){
            fetch("http://localhost:3000/Examination/reviewClassesByUserID",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({user_id: userId})
            })
            .then(response => response.json())
            .then((data) => {
                if(data.code === 200) {
                    setClasses(data.data);
                }
            }).catch(console.error);
        }
    };

    const fetchSubject = () => {
        if(selectedClass && selectedClass.id){
            fetch("http://localhost:3000/Examination/reviewSubjectsByClassID",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({class_id: selectedClass.id})
            })
            .then(response => response.json())
            .then((data) => {
                if(data.code === 200) {
                    setSubject(data.data);
                }
            }).catch(console.error);
        }
    };

    const fetchChapters = () => {
        if(selectedSubject && selectedSubject.id){
            fetch("http://localhost:3000/Examination/reviewChaptersBySubjectId",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({subject_id: selectedSubject.id})
            })
            .then(response => response.json())
            .then((data) => {
                if(data.code === 200) {
                    setChapters(data.data);
                }
            }).catch(console.error);
        }
    };

    const fetchTopics = () => {
        if(selectedChapters && selectedChapters.id){
            fetch("http://localhost:3000/Examination/reviewTopicsByChapterId", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({chapter_id: selectedChapters.id})
            })
            .then(response => response.json())
            .then((data) => {
                if(data.code === 200) {
                    setTopics(data.data);
                }
            }).catch(console.error);
        }
    };

    return (
        <Box sx={{
            margin: 2,
            maxWidth: '100%',
            overflowX: 'hidden',
            width: '100%'
        }}>
            <Typography variant="h6" sx={{ 
                fontFamily: 'Mar', 
                mb: 2, 
                fontWeight: 'bold', 
                color: "#7451f8" 
            }}>
                Edit MCQ
            </Typography>
            
            {/* MCQ Question */}
            <TextField
                required
                fullWidth
                variant="outlined"
                label="MCQ Question"
                value={editedMCQ.name}
                onChange={(e) => handleMCQChange('name', e.target.value)}
                error={errors.name}
                helperText={errors.name ? "This field is required" : ""}
                sx={{ mb: 2 }}
            />
            
            {/* Medium
            <TextField
                required
                fullWidth
                variant="outlined"
                label="Medium"
                value={editedMCQ.medium}
                onChange={(e) => handleMCQChange('medium', e.target.value)}
                error={errors.medium}
                helperText={errors.medium ? "This field is required" : ""}
                sx={{ mb: 2 }}
            /> */}
            <DropDown 
                name="Medium" 
                data={[
                    {id: 1, name: "English"},
                    {id: 2, name: "Urdu"}
                ]} 
                selectedData={medium} 
                setSelectedData={handleDropdownChange(setMedium, 'medium')}
                error={errors.class}
                width="100%"
            />
            {errors.medium && (
                <FormHelperText error sx={{ mt: -1, mb: 1 }}>
                    This field is required
                </FormHelperText>
            )}
            
            {/* Choices */}
            {choices.map((box, index) => (
                <Box key={box.id} sx={{ mb: 2 }}>
                    <TextField
                        required
                        fullWidth
                        variant="outlined"
                        label={`Choice ${box.id}`}
                        value={box.name}
                        onChange={(e) => handleChange(box.id, e.target.value)}
                        error={errors.choices[index]}
                    />
                    {errors.choices[index] && (
                        <FormHelperText error sx={{ mt: -1 }}>
                            This field is required
                        </FormHelperText>
                    )}
                </Box>
            ))}
            
            <DropDown 
                name="Answer" 
                data={choices} 
                selectedData={answer} 
                setSelectedData={handleDropdownChange(setAnswer, 'answer')}
                error={errors.answer}
                width="100%"
            />
            {/* Answer */}
            {/* <TextField
                required
                fullWidth
                variant="outlined"
                label="Answer"
                value={editedMCQ.answer}
                onChange={(e) => handleMCQChange('answer', e.target.value)}
                error={errors.answer}
                helperText={errors.answer ? "Must match one of the choices" : ""}
                sx={{ mb: 2 }}
            /> */}
            
            {/* Dropdowns */}
            <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2,
                width: '100%',
                mb: 2
            }}>
                <DropDown 
                    name="Classes" 
                    data={classes} 
                    selectedData={selectedClass} 
                    setSelectedData={handleDropdownChange(setSelectedClass, 'class')}
                    error={errors.class}
                    width="100%"
                />
                {errors.class && (
                    <FormHelperText error sx={{ mt: -1, mb: 1 }}>
                        This field is required
                    </FormHelperText>
                )}

                <DropDown 
                    name="Subjects" 
                    data={subject} 
                    selectedData={selectedSubject} 
                    setSelectedData={handleDropdownChange(setSelectedSubject, 'subject')}
                    error={errors.subject}
                    width="100%"
                />
                {errors.subject && (
                    <FormHelperText error sx={{ mt: -1, mb: 1 }}>
                        This field is required
                    </FormHelperText>
                )}

                <DropDown 
                    name="Chapters" 
                    data={Chapters} 
                    selectedData={selectedChapters} 
                    setSelectedData={handleDropdownChange(setSelectedChapters, 'chapter')}
                    error={errors.chapter}
                    width="100%"
                />
                {errors.chapter && (
                    <FormHelperText error sx={{ mt: -1, mb: 1 }}>
                        This field is required
                    </FormHelperText>
                )}

                <DropDown 
                    name="Topics" 
                    data={Topic} 
                    selectedData={selectedTopic} 
                    setSelectedData={handleDropdownChange(setSelectedTopics, 'topic')}
                    error={errors.topic}
                    width="100%"
                />
                {errors.topic && (
                    <FormHelperText error sx={{ mt: -1, mb: 1 }}>
                        This field is required
                    </FormHelperText>
                )}
            </Box>
            
            {/* Action Buttons */}
            <Box sx={{ 
                mt: 2,
                display: 'flex',
                justifyContent: 'center',
                gap: 2
            }}>
                <Button 
                    variant="contained" 
                    onClick={onSave}
                    sx={{ 
                        fontWeight: 'bold', 
                        backgroundColor: "#7451f8",
                        fontSize: '1rem',
                        px: 3,
                        py: 1.5,
                        minWidth: '120px',
                        '&:hover': {
                            backgroundColor: '#5a3acb',
                            transform: 'scale(1.02)',
                            transition: 'all 0.2s ease'
                        }
                    }}
                >
                    Save
                </Button>
                <Button 
                    variant="contained" 
                    onClick={onCancel}
                    sx={{ 
                        fontWeight: 'bold', 
                        backgroundColor: "#7451f8",
                        fontSize: '1rem',
                        px: 3,
                        py: 1.5,
                        minWidth: '120px',
                        '&:hover': {
                            backgroundColor: '#5a3acb',
                            transform: 'scale(1.02)',
                            transition: 'all 0.2s ease'
                        }
                    }}
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    );
}

export default MCQEditor;