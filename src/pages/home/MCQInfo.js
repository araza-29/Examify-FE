import {List,ListItem,ListItemButton,ListItemIcon,ListItemText, Divider,Typography} from '@mui/material';
import MCQEditor from './MCQEditor';
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
export default function MCQinfo({MCQData}) {
    const [flag, setFlag] = useState(false);
    const [MCQInfo, setMCQInfo] = useState([]);
    const toggleMCQEditor = (MCQ) => {
        console.log("Heyo from MCQ editor");
        console.log("Selected MCQ", MCQ);
        setMCQInfo(MCQ);
        setFlag(true);
    }
    console.log("MCQ after parameter", MCQData);
    return(<>
            {flag === true ? <MCQEditor MCQ={MCQInfo} setFlag={setFlag} setMCQ={setMCQInfo}/> :
            <>
                {MCQData.map((MCQ) => {
                    return <>
                    <List sx = {css} >
                    <ListItem key={MCQ.id} disablePadding>
                    <ListItemButton
                        onClick={()=>{toggleMCQEditor(MCQ)}}
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
                                    {MCQ.mcq}
                                </Typography>

                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: '1rem',
                                        color: 'text.secondary',
                                        mt: 0.5,
                                    }}
                                >
                                    Subject: <strong>{MCQ.subject_name}</strong>
                                </Typography>

                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: '1rem',
                                        color: 'text.secondary',
                                        mt: 0.5,
                                    }}
                                >
                                    Chapter: <strong>{MCQ.chapter_name}</strong>
                                </Typography>

                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: '1rem',
                                        color: 'text.secondary',
                                        mt: 0.5,
                                    }}
                                >
                                    Topic: <strong>{MCQ.topic_name}</strong>
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