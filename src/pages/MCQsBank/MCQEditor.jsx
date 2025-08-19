import { TextField, Typography, Button, Box, FormHelperText } from '@mui/material';
import DropDown from '../../components/DropDown/DropDown';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import Dialog from '@mui/material/Dialog';
import TextEditor from '../../components/TextEditor/TextEditor';
import HtmlDropdown from '../../components/htmlDropDown/HtmlDropDown';

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
    const [image, setImage] = useState({name: MCQ.image});
    const [previewImage, setPreviewImage] = useState(MCQ.image || null);
    const [openImageModal, setOpenImageModal] = useState(false);
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
        const isValidAnswer = choices.some(choice => choice.name === answer.name);
        const newErrors = {
            name: !editedMCQ.name,
            medium: !medium.name,
            answer: !answer.name || !isValidAnswer,
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
        // Append all text/boolean fields
        const formData = new FormData()
        formData.append('mcq_id', MCQ.id);
        formData.append('name', MCQ.name);
        formData.append('topic_id', selectedTopic.id);
        formData.append('marks', MCQ.marks);
        formData.append('subject_id', selectedSubject.id);
        formData.append('selected', 'false');
        formData.append('choice1', choices[0].name);
        formData.append('choice2', choices[1].name);
        formData.append('choice3', choices[2].name);
        formData.append('choice4', choices[3].name);
        formData.append('answer', answer.name);
        formData.append('medium', medium.name);

        // Append the image file directly if it exists
        if (image) {
            formData.append('image', image); // Assuming 'image' is a File object from an input
        }

        fetch("http://localhost:3000/Examination/updateMCQ", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then((data) => {
            if(data.code === 200) {
                toast.success("MCQ updated successfully!");
                setMCQ({
                    ...editedMCQ,
                    answer: answer.name,
                    medium: medium.name,
                    topic_id: selectedTopic.id,
                    topic_name: selectedTopic.name,
                    chapter_id: selectedChapters.id, 
                    chapter_name: selectedChapters.name, 
                    subject_id: selectedSubject.id, 
                    subject_name: selectedSubject.name,
                    choice1: choices[0].name, 
                    choice2: choices[1].name, 
                    choice3: choices[2].name, 
                    choice4: choices[3].name
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
    const handleQuestionImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.match('image.*')) {
            toast.error('Please select an image file');
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            toast.error('Image size should be less than 2MB');
            return;
        }
        setImage(file);
        setPreviewImage(URL.createObjectURL(file));
    };
    useEffect(() => {
        if (MCQ.image && typeof MCQ.image === 'string' && MCQ.image.startsWith('data:')) {
            setPreviewImage(MCQ.image);
        }
    }, [MCQ.image]);

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

    const allChoicesFilled = choices.every(choice => choice.name.trim() !== '');

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
            <div style={{ marginBottom: '20px' }}>
                <Typography variant="subtitle1" sx={{ mb: 1, color: '#7451f8', fontWeight: 'bold' }}>
                    Write your question here *
                </Typography>
                <TextEditor 
                    value={editedMCQ.name}
                    onChange={(html) => {handleMCQChange('name', html);}}
                    placeholder="Enter your question text here..."
                />
            </div>
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
                required={true}
            />
            {errors.medium && (
                <FormHelperText error sx={{ mt: -1, mb: 1 }}>
                    This field is required
                </FormHelperText>
            )}
            
            {/* Choices */}
            {choices.map((box, index) => (
                <div style={{ marginBottom: '20px' }}>
                    <Typography variant="subtitle1" sx={{ mb: 1, color: '#7451f8', fontWeight: 'bold' }}>
                        Write your question here *
                    </Typography>
                    <TextEditor 
                        value={box.name}
                        onChange={(html) => handleChange(box.id, html)}
                        placeholder="Enter your question text here..."
                    />
                </div>
            ))}
            
            <HtmlDropdown
                name="Answer"
                data={choices} 
                selectedData={answer} 
                setSelectedData={handleDropdownChange(setAnswer, 'answer')}
                error={errors.answer}
                disabled={allChoicesFilled}
                width="100%"
                required={true}
                disableFlag={true}
            />
            {errors.answer && (
                <FormHelperText error sx={{ mt: -1 }}>
                    This field is required
                </FormHelperText>
            )}
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
                    required={true}
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
                    required={true}
                    disabled={selectedClass}
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
                    required={true}
                    disabled={selectedSubject}
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
                    required={true}
                    disabled={selectedChapters}
                />
                {errors.topic && (
                    <FormHelperText error sx={{ mt: -1, mb: 1 }}>
                        This field is required
                    </FormHelperText>
                )}
            </Box>
            <Box sx={{ mb: 3 }}>
                <Box sx={{ 
                    width: "97%",
                    p: 2,
                    border: "2px dashed #e0e0e0",
                    borderRadius: 2,
                    backgroundColor: '#fafafa',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        borderColor: "#7451f8",
                        backgroundColor: '#f5f5f5'
                    }
                }}>
                    <Button
                        variant="outlined"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                        sx={{ mb: 1, color: "#7451f8" }}
                    >
                        Upload Image
                        <input 
                            type="file" 
                            hidden 
                            onChange={handleQuestionImageChange} 
                            accept="image/*"
                        />
                    </Button>
                    <Typography variant="body2" color="textSecondary">
                        {image.name ? image.name : "Drag & drop your question image here or click to browse"}
                    </Typography>
                    {previewImage && (
                        <Box mt={2}>
                            <img
                                src={previewImage}
                                alt="Preview"
                                style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: 8, border: '1px solid #ccc', cursor: 'pointer' }}
                                onClick={() => setOpenImageModal(true)}
                            />
                            <Dialog open={openImageModal} onClose={() => setOpenImageModal(false)} maxWidth="md">
                                <Box p={2} display="flex" justifyContent="center" alignItems="center">
                                    <img
                                        src={previewImage}
                                        alt="Large Preview"
                                        style={{ maxWidth: '90vw', maxHeight: '80vh', borderRadius: 8, border: '1px solid #ccc' }}
                                    />
                                </Box>
                            </Dialog>
                        </Box>
                    )}
                </Box>
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
                    Update
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