import { TextField, Typography, Button, Box, FormHelperText } from '@mui/material';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DropDown from '../../components/DropDown/DropDown';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';

function MCQCreater() {
    const navigate = useNavigate();
    const [MCQ, setMCQ] = useState({
        name: '',
        marks: '',
        medium: '',
        answer: ''
    });
    const [errors, setErrors] = useState({
        name: false,
        marks: false,
        medium: false,
        answer: false,
        choices: [false, false, false, false],
        class: false,
        subject: false,
        chapter: false,
        topic: false
    });
    const [userId] = useState(parseInt(localStorage.getItem("userId"), 10));
    const [classes, setClasses] = useState([]);
    const [medium, setMedium] = useState([]);
    const [answer, setAnswer] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [subject, setSubject] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [Chapters, setChapters] = useState([]);
    const [Topic, setTopics] = useState([]);
    const [selectedChapters, setSelectedChapters] = useState(null);
    const [selectedTopic, setSelectedTopics] = useState(null);
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [openImageModal, setOpenImageModal] = useState(false);
    const [choices, setChoices] = useState([
        { id: 1, name: '' },
        { id: 2, name: '' },
        { id: 3, name: '' },
        { id: 4, name: '' }
    ]);

    // Validation functions
    const validateForm = () => {
        const newErrors = {
            name: !MCQ.name,
            marks: !MCQ.marks,
            medium: !medium.name,
            answer: !answer.name,
            choices: choices.map(choice => !choice.name),
            class: !selectedClass,
            subject: !selectedSubject,
            chapter: !selectedChapters,
            topic: !selectedTopic
        };
        setErrors(newErrors);
        
        return !Object.values(newErrors).flat().some(Boolean);
    };

    const validateAnswer = () => {
        const isValid = choices.some(choice => choice.name === answer.name);
        setErrors(prev => ({ ...prev, answer: !isValid }));
        return isValid;
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
        setMCQ(prev => ({ ...prev, [field]: value }));
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
            toast.error("Please fill all required fields");
            return;
        }
        if (!validateAnswer()) {
            toast.error("Answer must match one of the choices");
            return;
        }

        const formData = new FormData();

        // Append all text/boolean fields
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

        fetch("http://localhost:3000/Examination/createMCQ", {
            method: "POST",
            body: formData
            // No Content-Type header needed - browser sets it automatically
        })
        .then(response => response.json())
        .then((data) => {
            if (data.code === 200) {
                toast.success("MCQ created successfully!");
                navigate('/MCQSbank');
            } else {
                toast.error("Failed to create MCQ");
            }
        })
        .catch(error => {
            console.error("Error creating MCQ:", error);
            toast.error("Failed to create MCQ");
        });
    };

    const onCancel = () => {
        navigate('/MCQSbank');
    };

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

    const skipResetRef = useRef(true);

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
        fetch("http://localhost:3000/Examination/reviewClassesByUserID", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: userId })
        })
        .then(response => response.json())
        .then((data) => {
            if (data.code === 200) {
                setClasses(data.data);
            }
        })
        .catch(console.error);
    };

    const fetchSubject = () => {
        fetch("http://localhost:3000/Examination/reviewSubjectsByClassID", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ class_id: selectedClass.id })
        })
        .then(response => response.json())
        .then((data) => {
            if (data.code === 200) {
                setSubject(data.data);
            }
        })
        .catch(console.error);
    };

    const fetchChapters = () => {
        fetch("http://localhost:3000/Examination/reviewChaptersBySubjectId", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ subject_id: selectedSubject.id })
        })
        .then(response => response.json())
        .then((data) => {
            if (data.code === 200) {
                setChapters(data.data);
            }
        })
        .catch(console.error);
    };

    const fetchTopics = () => {
        fetch("http://localhost:3000/Examination/reviewTopicsByChapterId", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ chapter_id: selectedChapters.id })
        })
        .then(response => response.json())
        .then((data) => {
            if (data.code === 200) {
                setTopics(data.data);
            }
        })
        .catch(console.error);
    };
    const allChoicesFilled = choices.every(choice => choice.name.trim() !== '');

    return (
        <Box sx={{ display: "flex", backgroundColor: "white" }}>
            <Box sx={{ flex: 1 }}>
                <Sidebar />
            </Box>
            <Box sx={{ flex: 6 }}>
                <Navbar />
                <Box sx={{ padding: 3 }}>
                    <Box sx={{ display: "flex", mb: 2 }}>
                        <Button
                            variant="text"
                            sx={{
                                display: "flex",
                                px: 2,
                                py: 2,
                                fontSize: "1.25rem",
                                alignItems: "center",
                                color: "#7451f8",
                            }}
                            onClick={() => navigate(-1)}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </Button>
                        <Typography variant="h6" sx={{ 
                            fontFamily: 'Mar', 
                            mt: 1, 
                            fontWeight: 'bold', 
                            color: "#7451f8" 
                        }}>
                            Create MCQs
                        </Typography>
                    </Box>

                    {/* MCQ Question */}
                    <TextField
                        required
                        fullWidth
                        variant="outlined"
                        label="Write your MCQ here"
                        value={MCQ.name}
                        onChange={(e) => handleMCQChange('name', e.target.value)}
                        error={errors.name}
                        InputLabelProps={{ shrink: true }} 
                        helperText={errors.name ? "This field is required" : ""}
                        sx={{ 
                            width: '100%', 
                            mb: 2,
                            backgroundColor: 'background.paper', 
                            borderRadius: 1,
                            '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                borderColor: '#7451f8', // Hover border color (same as default)
                                },
                                '&.Mui-focused fieldset': {
                                borderColor: '#7451f8', // Focused border color
                                },
                            },
                            '& .MuiInputLabel-root': {
                                '&.Mui-focused': {
                                color: '#7451f8', // Focused label color
                                },
                            },
                        }}
                    />

                    {/* Marks */}
                    <TextField
                        required
                        fullWidth
                        variant="outlined"
                        label="Marks"
                        type="number"
                        value={MCQ.marks}
                        onChange={(e) => handleMCQChange('marks', e.target.value)}
                        error={errors.marks}
                        InputLabelProps={{ shrink: true }} 
                        helperText={errors.marks ? "This field is required" : ""}
                         sx={{ 
                            width: '100%', 
                            mb: 2,
                            backgroundColor: 'background.paper', 
                            borderRadius: 1,
                            '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                borderColor: '#7451f8', // Hover border color (same as default)
                                },
                                '&.Mui-focused fieldset': {
                                borderColor: '#7451f8', // Focused border color
                                },
                            },
                            '& .MuiInputLabel-root': {
                                '&.Mui-focused': {
                                color: '#7451f8', // Focused label color
                                },
                            },
                        }}
                    />

                    {/* Medium */}
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
                        <Box key={box.id} sx={{ mb: 2 }}>
                            <TextField
                                required
                                fullWidth
                                variant="outlined"
                                label={`Choice ${box.id}`}
                                value={box.value}
                                onChange={(e) => handleChange(box.id, e.target.value)}
                                error={errors.choices[index]}
                                InputLabelProps={{ shrink: true }} 
                                 sx={{ 
                                    width: '100%', 
                                    mb: 2,
                                    backgroundColor: 'background.paper', 
                                    borderRadius: 1,
                                    '& .MuiOutlinedInput-root': {
                                        '&:hover fieldset': {
                                        borderColor: '#7451f8', // Hover border color (same as default)
                                        },
                                        '&.Mui-focused fieldset': {
                                        borderColor: '#7451f8', // Focused border color
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        '&.Mui-focused': {
                                        color: '#7451f8', // Focused label color
                                        },
                                    },
                                }}
                            />
                            {errors.choices[index] && (
                                <FormHelperText error sx={{ mt: -1 }}>
                                    This field is required
                                </FormHelperText>
                            )}
                        </Box>
                    ))}

                    {/* Answer */}
                    <DropDown 
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
                        <FormHelperText error sx={{ mt: -1, mb: 1 }}>
                            This field is required
                        </FormHelperText>
                    )}

                    {/* Dropdowns */}
                    <Box sx={{ mb: 2 }}>
                        <DropDown 
                            name="Classes" 
                            data={classes} 
                            selectedData={selectedClass} 
                            setSelectedData={handleDropdownChange(setSelectedClass, 'class')}
                            error={errors.class}
                            width="100%"
                            required={true}
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
                            disabled={selectedClass}
                            width="100%"
                            required={true}
                            disableFlag={true}
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
                            disabled={selectedSubject}
                            required={true}
                            disableFlag={true}
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
                            disabled={selectedChapters}
                            width="100%"
                            required={true}
                            disableFlag={true}
                        />
                        {errors.topic && (
                            <FormHelperText error sx={{ mt: -1, mb: 1 }}>
                                This field is required
                            </FormHelperText>
                        )}
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" sx={{ mb: 1, color: '#7451f8', fontWeight: 'bold' }}>
                            Image for Question
                        </Typography>
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
                                {image ? image.name : "Drag & drop your question image here or click to browse"}
                            </Typography>
                        </Box>
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

                    {/* Action Buttons */}
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        gap: 2,
                        mt: 3
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
                            Create
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
            </Box>
        </Box>
    );
}

export default MCQCreater;