import { TextField, Typography, Button, Box, FormControl, Select, InputLabel, MenuItem, FormHelperText } from '@mui/material';
import DropDown from '../../components/DropDown/DropDown';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';

function QuestionEditor({ Questions, setFlag, setQuestion }) {
    const [userId] = useState(parseInt(localStorage.getItem("userId"), 10));
    const [subject, setSubject] = useState([]);
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [editedQuestion, setEditedQuestion] = useState(Questions);
    const [selectedSubject, setSelectedSubject] = useState({ id: Questions.subject_id, name: Questions.subject_name });
    const [Chapters, setChapters] = useState([]);
    const [medium, setMedium] = useState({ name: Questions?.medium || null });
    const [Topic, setTopics] = useState([]);
    const [selectedChapters, setSelectedChapters] = useState({ id: Questions.chapter_id, name: Questions.chapter_name });
    const [selectedTopic, setSelectedTopics] = useState({ id: Questions.topic_id, name: Questions.topic_name });
    const [image, setImage] = useState({name: Questions.image});
    const [answerImage, setAnswerImage] = useState(null);
    const skipResetRef = useRef(true);
    
    const [errors, setErrors] = useState({
        question: { status: false, message: 'Question is required' },
        marks: { status: false, message: 'Valid marks are required' },
        medium: { status: false, message: 'Medium is required' },
        type: { status: false, message: 'Type is required' },
        answer: { status: false, message: 'Answer is required' },
        class: { status: false, message: 'Class is required' },
        subject: { status: false, message: 'Subject is required' },
        chapter: { status: false, message: 'Chapter is required' },
        topic: { status: false, message: 'Topic is required' }
    });

    // Validation functions
    const validateField = (fieldName, value) => {
        let isValid = true;
        let message = '';
        
        switch(fieldName) {
            case 'marks':
                isValid = !isNaN(value) && Number(value) > 0;
                message = isValid ? '' : 'Please enter a valid number greater than 0';
                break;
            case 'type':
                isValid = ['long', 'short'].includes(value);
                message = isValid ? '' : 'Please select a valid question type';
                break;
            default:
                isValid = !!value;
                message = isValid ? '' : errors[fieldName].message;
        }

        setErrors(prev => ({
            ...prev,
            [fieldName]: {
                status: !isValid,
                message
            }
        }));

        return isValid;
    };

    const validateForm = () => {
        const validations = [
            validateField('question', editedQuestion.name),
            validateField('marks', editedQuestion.marks),
            validateField('medium', medium),
            validateField('type', editedQuestion.type),
            validateField('answer', editedQuestion.answer),
            validateField('class', selectedClass),
            validateField('subject', selectedSubject),
            validateField('chapter', selectedChapters),
            validateField('topic', selectedTopic)
        ];

        return validations.every(v => v);
    };

    // Field change handlers
    const handleQuestionChange = (e) => {
        setEditedQuestion({...editedQuestion, name: e.target.value});
        validateField('question', e.target.value);
    };

    const handleMarksChange = (e) => {
        setEditedQuestion({...editedQuestion, marks: e.target.value});
        validateField('marks', e.target.value);
    };

    const handleTypeChange = (e) => {
        setEditedQuestion({...editedQuestion, type: e.target.value});
        validateField('type', e.target.value);
    };

    const handleAnswerChange = (e) => {
        setEditedQuestion({...editedQuestion, answer: e.target.value});
        validateField('answer', e.target.value);
    };

    // Fetch functions
    const fetchAnswer = () => {
        fetch("http://localhost:3000/Examination/reviewAnswer", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question_id: Questions.id })
        })
        .then(response => response.json())
        .then((data) => {
            if (data.code === 200) {
                setQuestion({ ...Questions, answer_id: data.data.id, answer: data.data.answer });
                setAnswerImage({name: data.data.image});
                setEditedQuestion({ ...editedQuestion, answer_id: data.data.id, answer: data.data.answer });
            }
        });
    };

    const fetchClasses = () => {
        if (userId) {
            fetch("http://localhost:3000/Examination/reviewClassesByUserID", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: userId })
            })
            .then(response => response.json())
            .then((data) => {
                if (data.code === 200) {
                    setClasses(data.data);
                    if (Questions.class_id) {
                        const initialClass = data.data.find(c => c.id === Questions.class_id);
                        setSelectedClass(initialClass || null);
                    }
                }
            });
        }
    };

    const fetchSubject = () => {
        if (selectedClass) {
            fetch("http://localhost:3000/Examination/reviewSubjectsByClassID", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ class_id: selectedClass.id })
            })
            .then(response => response.json())
            .then((data) => {
                if (data.code === 200) {
                    setSubject(data.data);
                    if (Questions.subject_id && skipResetRef.current) {
                        const initialSubject = data.data.find(s => s.id === Questions.subject_id);
                        setSelectedSubject(initialSubject || null);
                    }
                }
            });
        }
    };

    const fetchChapters = () => {
        if (selectedSubject) {
            fetch("http://localhost:3000/Examination/reviewChaptersBySubjectId", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subject_id: selectedSubject.id })
            })
            .then(response => response.json())
            .then((data) => {
                if (data.code === 200) {
                    setChapters(data.data);
                    if (Questions.chapter_id && skipResetRef.current) {
                        const initialChapter = data.data.find(c => c.id === Questions.chapter_id);
                        setSelectedChapters(initialChapter || null);
                    }
                }
            });
        }
    };

    const fetchTopics = () => {
        if (selectedChapters) {
            fetch("http://localhost:3000/Examination/reviewTopicsByChapterId", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chapter_id: selectedChapters.id })
            })
            .then(response => response.json())
            .then((data) => {
                if (data.code === 200) {
                    setTopics(data.data);
                    if (Questions.topic_id && skipResetRef.current) {
                        const initialTopic = data.data.find(t => t.id === Questions.topic_id);
                        setSelectedTopics(initialTopic || null);
                    }
                }
            });
        }
    };

    // Update functions
    const updateAnswer = async () => {
        try {
            const formData = new FormData();
            formData.append('question_id', editedQuestion.id);
            formData.append('answer', editedQuestion.answer);
            
            if (answerImage) {
                formData.append('image', answerImage);
            }

            const response = await fetch("http://localhost:3000/Examination/updateAnswer", {
                method: "POST",
                body: formData
            });

            const data = await response.json();
            
            if (data.code !== 200) {
                throw new Error(data.message || 'Failed to update answer');
            }
            
            return data;
        } catch (error) {
            console.error('Update answer error:', error);
            toast.error('Failed to update answer');
            throw error;
        }
    };

    const completeUpdate = () => {
        const updatedQuestion = {
            ...editedQuestion,
            topic_id: selectedTopic.id,
            topic_name: selectedTopic.name,
            chapter_id: selectedChapters.id,
            chapter_name: selectedChapters.name,
            subject_id: selectedSubject.id,
            subject_name: selectedSubject.name,
            medium: medium.name,
            image: image.name || Questions.image
        };

        setQuestion(updatedQuestion);
        setFlag(false);
        toast.success("Question updated successfully!");
    };

    const onSave = async () => {
        if (!validateForm()) {
            toast.error("Please fix all validation errors");
            return;
        }

        try {
            // Update question
            const questionResponse = await fetch("http://localhost:3000/Examination/updateQuestion", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: editedQuestion.id,
                    name: editedQuestion.name,
                    topic_id: selectedTopic.id,
                    marks: editedQuestion.marks,
                    subject_id: selectedSubject.id,
                    selected: false,
                    medium: medium.name,
                    type: editedQuestion.type,
                    image: image.name || Questions.image
                })
            });

            const questionData = await questionResponse.json();
            
            if (questionData.code !== 200) {
                throw new Error(questionData.message || 'Failed to update question');
            }

            // Update answer if changed
            if (editedQuestion.answer !== Questions.answer || answerImage) {
                await updateAnswer();
            }

            completeUpdate();
        } catch (error) {
            console.error('Save error:', error);
            toast.error(error.message || 'Failed to save changes');
        }
    };

    const onCancel = () => {
        setFlag(false);
    };

    // Image handling functions
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
    };

    const handleAnswerImageChange = (e) => {
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
        
        setAnswerImage(file);
    };

    // Effects
    useEffect(() => {
        fetchClasses();
        fetchAnswer();
    }, [userId]);

    useEffect(() => {
        if (selectedClass) {
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

    useEffect(() => {
        const timer = setTimeout(() => {
            skipResetRef.current = false;
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Mar', mt: 1, fontWeight: 'bold', color: "#7451f8" }}>
                Edit Question
            </Typography>

            <TextField
                required
                variant="outlined"
                label="Write your question here"
                value={editedQuestion.name}
                onChange={handleQuestionChange}
                sx={{ width: '100%', mb: 2 }}
                error={errors.question.status}
                helperText={errors.question.status && errors.question.message}
                data-field="question"
            />

            <TextField
                required
                variant="outlined"
                label="Marks"
                value={editedQuestion.marks}
                onChange={handleMarksChange}
                sx={{ width: '100%', mb: 2 }}
                error={errors.marks.status}
                helperText={errors.marks.status && errors.marks.message}
                data-field="marks"
            />

            <DropDown
                name="Medium"
                data={[
                    { id: 1, name: "English" },
                    { id: 2, name: "Urdu" }
                ]}
                selectedData={medium}
                setSelectedData={(val) => {
                    setMedium(val);
                    validateField('medium', val);
                }}
                width="100%"
                required={true}
                error={errors.medium.status}
                helperText={errors.medium.status && errors.medium.message}
                data-field="medium"
            />

            <FormControl required sx={{ width: '100%', mb: 2 }} error={errors.type.status}>
                <InputLabel>Question Type</InputLabel>
                <Select
                    value={editedQuestion?.type || ""}
                    onChange={handleTypeChange}
                    label="Question Type"
                    data-field="type"
                >
                    <MenuItem value="long">Long Questions</MenuItem>
                    <MenuItem value="short">Short Questions</MenuItem>
                </Select>
                {errors.type.status && (
                    <FormHelperText>{errors.type.message}</FormHelperText>
                )}
            </FormControl>

            <TextField
                required
                variant="outlined"
                label="Answer"
                value={editedQuestion.answer}
                onChange={handleAnswerChange}
                sx={{ width: '100%', mb: 2 }}
                error={errors.answer.status}
                helperText={errors.answer.status && errors.answer.message}
                data-field="answer"
            />

            <Box>
                <DropDown
                    name="Classes"
                    data={classes}
                    selectedData={selectedClass}
                    setSelectedData={(val) => {
                        setSelectedClass(val);
                        validateField('class', val);
                    }}
                    width="100%"
                    required={true}
                    error={errors.class.status}
                    helperText={errors.class.status && errors.class.message}
                    data-field="class"
                />
                <DropDown
                    name="Subjects"
                    data={subject}
                    selectedData={selectedSubject}
                    setSelectedData={(val) => {
                        setSelectedSubject(val);
                        validateField('subject', val);
                    }}
                    width="100%"
                    required={true}
                    error={errors.subject.status}
                    helperText={errors.subject.status && errors.subject.message}
                    data-field="subject"
                    disableFlag={!selectedClass}
                />
                <DropDown
                    name="Chapters"
                    data={Chapters}
                    selectedData={selectedChapters}
                    setSelectedData={(val) => {
                        setSelectedChapters(val);
                        validateField('chapter', val);
                    }}
                    width="100%"
                    required={true}
                    error={errors.chapter.status}
                    helperText={errors.chapter.status && errors.chapter.message}
                    data-field="chapter"
                    disableFlag={!selectedSubject}
                />
                <DropDown
                    name="Topics"
                    data={Topic}
                    selectedData={selectedTopic}
                    setSelectedData={(val) => {
                        setSelectedTopics(val);
                        validateField('topic', val);
                    }}
                    width="100%"
                    required={true}
                    error={errors.topic.status}
                    helperText={errors.topic.status && errors.topic.message}
                    data-field="topic"
                    disableFlag={!selectedChapters}
                />
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
            </Box>

            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 1, color: '#7451f8', fontWeight: 'bold' }}>
                    Image for Answer
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
                            onChange={handleAnswerImageChange} 
                            accept="image/*"
                        />
                    </Button>
                    <Typography variant="body2" color="textSecondary">
                        {answerImage ? answerImage.name : "Drag & drop your answer image here or click to browse"}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
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
        </>
    );
}

export default QuestionEditor;