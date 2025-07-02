import { Card, CardActions, CardContent, TextField, Typography, Button, Box, Input, FormControl, Select, InputLabel, MenuItem, FormHelperText } from '@mui/material';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DropDown from '../../components/DropDown/DropDown';
import { useEffect, useState, useRef } from 'react';
import { Subject } from '@mui/icons-material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function QuestionCreater() {
  const navigate = useNavigate();
  const [Question, setQuestion] = useState({
    name: '',
    marks: '',
    type: '',
    answer: ''
  });
  const [userId, setUserId] = useState(parseInt(localStorage.getItem("userId"), 10));
  const [subject, setSubject] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [Chapters, setChapters] = useState([]);
  const [Topic, setTopics] = useState([]);
  const [selectedChapters, setSelectedChapters] = useState(null);
  const [selectedTopic, setSelectedTopics] = useState(null);
  const [image, setImage] = useState(null);
  const [medium, setMedium] = useState(null);
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
        } else {
          console.log("Class data not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching class:", error);
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
        } else {
          console.log("Subject data not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching subject:", error);
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
        } else {
          console.log("Chapter data not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching chapters:", error);
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
        } else {
          console.log("Topics data not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching topics:", error);
      });
    }
  };

  const validateForm = () => {
    const newErrors = {
      question: !Question.name,
      marks: !Question.marks,
      medium: !medium,
      type: !Question.type,
      answer: !Question.answer,
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

    fetch("http://localhost:3000/Examination/createQuestion", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: Question.name,
        topic_id: selectedTopic.id,
        marks: Question.marks,
        subject_id: selectedSubject.id,
        selected: false,
        type: Question.type,
        medium: medium?.name
      })
    })
    .then(response => response.json())
    .then((data) => {
      if (data.code === 200) {
        const questionId = data.data.id;
        fetch("http://localhost:3000/Examination/createAnswer", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question_id: questionId,
            answer: Question.answer
          })
        })
        .then(response => response.json())
        .then((data) => {
          if (data.code === 200) {
            toast.success("Question created successfully!");
            navigate('/questionbank');
          }
        });
      }
    });
  };

  const onCancel = () => {
    navigate('/questionbank');
  };

  return (
    <Box sx={{ display: "flex" }}>
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
            <Typography variant="h6" sx={{ fontFamily: 'Mar', mt: 1, fontWeight: 'bold', color: "#7451f8"  }}>
              Create Questions
            </Typography>
          </Box>

          <TextField
            required
            variant="outlined"
            label="Write your question here"
            value={Question.name}
            onChange={(event) => {
              setQuestion({...Question, name: event.target.value});
              setErrors({...errors, question: false});
            }}
            sx={{ width: '100%', mb: 2 }}
            error={errors.question}
            helperText={errors.question && "This field is required"}
          />

          <TextField
            required
            variant="outlined"
            label="Marks"
            value={Question.marks}
            onChange={(event) => {
              setQuestion({...Question, marks: event.target.value});
              setErrors({...errors, marks: false});
            }}
            sx={{ width: '100%', mb: 2 }}
            error={errors.marks}
            helperText={errors.marks && "This field is required"}
          />

          <DropDown 
            name="Medium" 
            data={[
              {id: 1, name: "English"},
              {id: 2, name: "Urdu"}
            ]} 
            selectedData={medium} 
            setSelectedData={(val) => {
              setMedium(val);
              setErrors({...errors, medium: false});
            }}
            width="100%"
            required={true}
            error={errors.medium}
          />

          <FormControl required sx={{ width: '100%', mb: 2 }} error={errors.type}>
            <InputLabel>Question Type</InputLabel>
            <Select
              value={Question.type || ""}
              onChange={(event) => {
                setQuestion({...Question, type: event.target.value});
                setErrors({...errors, type: false});
              }}
              sx={{ borderRadius: 1 }}
            >
              <MenuItem value="long">Descriptive Questions</MenuItem>
              <MenuItem value="short">Short Questions</MenuItem>
            </Select>
            {errors.type && <FormHelperText error>This field is required</FormHelperText>}
          </FormControl>

          <TextField
            required 
            variant="outlined"
            label="Answer"
            value={Question.answer}
            onChange={(event) => {
              setQuestion({...Question, answer: event.target.value});
              setErrors({...errors, answer: false});
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
                setErrors({...errors, class: false});
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
                setErrors({...errors, subject: false});
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
                setErrors({...errors, chapter: false});
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
                setErrors({...errors, topic: false});
              }}
              width="100%"
              required={true}
              error={errors.topic}
              disableFlag={!selectedChapters}
            />
          </Box>
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
                    sx={{ mb: 1, color:"#7451f8" }}
                >
                    Upload Image
                    <input type="file" hidden onChange={(e) => setImage(e.target.files[0])} />
                </Button>
                <Typography variant="body2" color="textSecondary">
                    {image ? image.name : "Drag & drop your image here or click to browse"}
                </Typography>
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
        </Box>
      </Box>
    </Box>
  );
}

export default QuestionCreater;