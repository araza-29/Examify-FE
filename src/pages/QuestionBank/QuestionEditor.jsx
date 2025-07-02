import { TextField, Typography, Button, Box, FormControl, Select, InputLabel, MenuItem, FormHelperText } from '@mui/material';
import DropDown from '../../components/DropDown/DropDown';
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
    const skipResetRef = useRef(true);
    
    const [errors, setErrors] = useState({
        question: false,
        marks: false,
        medium: false,
        type: false,
        answer: false,
        class: false,
        subject: false,
        chapter: false,
        topic: false
    });

    useEffect(() => {
        fetchClasses();
    }, [userId]);
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
                    // Set initial class selection if available
                    if (Questions.class_id) {
                        const initialClass = data.data.find(c => c.id === Questions.class_id);
                        setSelectedClass(initialClass || null);
                    }
                }
            });
        }
    };

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
                    // Set initial subject selection if available
                    if (Questions.subject_id && skipResetRef.current) {
                        const initialSubject = data.data.find(s => s.id === Questions.subject_id);
                        setSelectedSubject(initialSubject || null);
                    }
                }
            });
        }
    };

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
                    // Set initial chapter selection if available
                    if (Questions.chapter_id && skipResetRef.current) {
                        const initialChapter = data.data.find(c => c.id === Questions.chapter_id);
                        setSelectedChapters(initialChapter || null);
                    }
                }
            });
        }
    };

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
                    // Set initial topic selection if available
                    if (Questions.topic_id && skipResetRef.current) {
                        const initialTopic = data.data.find(t => t.id === Questions.topic_id);
                        setSelectedTopics(initialTopic || null);
                    }
                }
            });
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            skipResetRef.current = false;
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const validateForm = () => {
        const newErrors = {
            question: !editedQuestion.name,
            marks: !editedQuestion.marks,
            medium: !medium,
            type: !editedQuestion.type,
            answer: !editedQuestion.answer,
            class: !selectedClass,
            subject: !selectedSubject,
            chapter: !selectedChapters,
            topic: !selectedTopic
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    const onSave = () => {
        if (!validateForm()) {
            toast.error("Please fill all required fields");
            return;
        }

        fetch("http://localhost:3000/Examination/updateQuestion", {
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
                type: editedQuestion.type
            })
        })
        .then(response => response.json())
        .then((data) => {
            if (data.code === 200) {
                if (editedQuestion.answer !== Questions.answer) {
                    updateAnswer();
                } else {
                    completeUpdate();
                }
            }
        });
    };

    const updateAnswer = () => {
        fetch("http://localhost:3000/Examination/updateAnswer", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                question_id: editedQuestion.id,
                answer: editedQuestion.answer
            })
        })
        .then(response => response.json())
        .then((data) => {
            if (data.code === 200) {
                completeUpdate();
            }
        });
    };

    const completeUpdate = () => {
        toast.success("Question Edited Successfully!");
        setQuestion({
            ...editedQuestion,
            topic_id: selectedTopic.id,
            topic_name: selectedTopic.name,
            chapter_id: selectedChapters.id,
            chapter_name: selectedChapters.name,
            subject_id: selectedSubject.id,
            subject_name: selectedSubject.name,
            medium: medium.name
        });
        setFlag(false);
    };

    const onCancel = () => {
        setFlag(false);
    };

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
                onChange={(event) => {
                    setEditedQuestion({ ...editedQuestion, name: event.target.value });
                    setErrors({ ...errors, question: false });
                }}
                sx={{ width: '100%', mb: 2 }}
                error={errors.question}
                helperText={errors.question && "This field is required"}
            />

            <TextField
                required
                variant="outlined"
                label="Marks"
                value={editedQuestion.marks}
                onChange={(event) => {
                    setEditedQuestion({ ...editedQuestion, marks: event.target.value });
                    setErrors({ ...errors, marks: false });
                }}
                sx={{ width: '100%', mb: 2 }}
                error={errors.marks}
                helperText={errors.marks && "This field is required"}
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
                    setErrors({ ...errors, medium: false });
                }}
                width="100%"
                required={true}
                error={errors.medium}
            />

            <FormControl required sx={{ width: '100%', mb: 2 }} error={errors.type}>
                <InputLabel
                    id="question-type-label"
                    shrink
                    sx={{
                        color: errors.type ? '#f44336' : '#7451f8',
                        '&.Mui-focused': {
                            color: errors.type ? '#f44336' : '#7451f8',
                        },
                    }}
                >
                    Question Type
                </InputLabel>
                <Select
                    labelId="question-type-label"
                    label="Question Type"
                    displayEmpty
                    value={editedQuestion?.type || ""}
                    name="searchTopic"
                    onChange={(event) => {
                        setEditedQuestion({ ...editedQuestion, type: event.target.value });
                        setErrors({ ...errors, type: false });
                    }}
                    sx={{
                        backgroundColor: 'background.paper',
                        borderRadius: 1,
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: errors.type ? '#f44336' : '#7451f8',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: errors.type ? '#f44336' : '#7451f8',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: errors.type ? '#f44336' : '#7451f8',
                        },
                    }}
                >
                    <MenuItem value="long">Long Questions</MenuItem>
                    <MenuItem value="short">Short Questions</MenuItem>
                </Select>
                {errors.type && <FormHelperText error>This field is required</FormHelperText>}
            </FormControl>

            <TextField
                required
                variant="outlined"
                label="Answer"
                value={editedQuestion.answer}
                onChange={(event) => {
                    setEditedQuestion({ ...editedQuestion, answer: event.target.value });
                    setErrors({ ...errors, answer: false });
                }}
                sx={{ width: '100%', mb: 2 }}
                error={errors.answer}
                helperText={errors.answer && "This field is required"}
            />

            <Box>
                <DropDown
                    name="Classes"
                    data={classes}
                    selectedData={selectedClass}
                    setSelectedData={(val) => {
                        setSelectedClass(val);
                        setErrors({ ...errors, class: false });
                    }}
                    width="100%"
                    required={true}
                    error={errors.class}
                />
                <DropDown
                    name="Subjects"
                    data={subject}
                    selectedData={selectedSubject}
                    setSelectedData={(val) => {
                        setSelectedSubject(val);
                        setErrors({ ...errors, subject: false });
                    }}
                    width="100%"
                    required={true}
                    error={errors.subject}
                    disableFlag={!selectedClass}
                />
                <DropDown
                    name="Chapters"
                    data={Chapters}
                    selectedData={selectedChapters}
                    setSelectedData={(val) => {
                        setSelectedChapters(val);
                        setErrors({ ...errors, chapter: false });
                    }}
                    width="100%"
                    required={true}
                    error={errors.chapter}
                    disableFlag={!selectedSubject}
                />
                <DropDown
                    name="Topics"
                    data={Topic}
                    selectedData={selectedTopic}
                    setSelectedData={(val) => {
                        setSelectedTopics(val);
                        setErrors({ ...errors, topic: false });
                    }}
                    width="100%"
                    required={true}
                    error={errors.topic}
                    disableFlag={!selectedChapters}
                />
            </Box>

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