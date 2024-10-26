import {List,ListItem,ListItemButton,ListItemIcon,ListItemText, Divider,Typography} from '@mui/material';
import QuestionEditor from './QuestionEditor';
import {useState} from 'react';

const css = {
    width: '100%',
    height: '20vh',  // Full viewport height
    maxWidth: '1000px', // You can adjust max width
    bgcolor: 'background.paper',
    overflowY: 'auto', // Allows scrolling if content overflows
    borderRadius: 2,
    boxShadow: 3, // Adds a subtle shadow
    marginBottom: '16px', // Adds a gap between lists
    marginLeft: '16px' // Adds a gap on the left
}
export default function Questioninfo({QuestionsData}) {
    const [flag, setFlag] = useState(false);
    const [QuestionInfo, setQuestionInfo] = useState([]);
    const toggleQuestionEditor = (Question) => {
        console.log("Heyo from question editor");
        console.log("Selected Question", Question);
        setQuestionInfo(Question);
        setFlag(true);
    }
    console.log("Questions after parameter", QuestionsData);
    return(<>
            {flag === true ? <QuestionEditor Questions={QuestionInfo} setFlag={setFlag} setQuestion={setQuestionInfo}/> :
            <>
                {QuestionsData.map((Question) => {
                    return <>
                    <List sx = {css} >
                    <ListItem key={Question.id} disablePadding>
                    <ListItemButton
                        onClick={()=>{toggleQuestionEditor(Question)}}
                        sx={{
                        width: '100%', // Makes the ListItemButton span the entire List width
                        padding: '16px', // Add padding for better spacing
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.1)', // Light hover effect
                        },
                        }}
                    >
                        <ListItemText
                        primary={
                            <>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: 'text.primary',
                                        fontSize: '1.4rem', // Slightly larger for emphasis
                                    }}
                                >
                                    {Question.name}
                                </Typography>

                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: '1rem',
                                        color: 'text.secondary',
                                        mt: 1, // Adds margin-top for spacing
                                    }}
                                >
                                    Marks: <strong>{Question.marks}</strong>
                                </Typography>

                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: '1rem',
                                        color: 'text.secondary',
                                        mt: 0.5,
                                    }}
                                >
                                    Subject: <strong>{Question.subject_name}</strong>
                                </Typography>

                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: '1rem',
                                        color: 'text.secondary',
                                        mt: 0.5,
                                    }}
                                >
                                    Chapter: <strong>{Question.chapter_name}</strong>
                                </Typography>

                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: '1rem',
                                        color: 'text.secondary',
                                        mt: 0.5,
                                    }}
                                >
                                    Topic: <strong>{Question.topic_name}</strong>
                                </Typography>
                            </>
                            

                        }
                        />
                    </ListItemButton>
                    </ListItem>
                    </List>
                    </>
                    }
                    )
                }
            </>
            }
    </>)
}