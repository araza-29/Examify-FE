import {List,ListItem,ListItemButton,ListItemIcon,ListItemText, Divider,Typography} from '@mui/material';
import QuestionEditor from './QuestionEditor';
import {useState, useEffect} from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const css = {
    width: '100%',
    maxWidth: '1000px', // Limits max width
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 3, // Adds a subtle shadow
    marginBottom: '16px', // Adds spacing below
    marginLeft: '16px', // Adds left spacing
    padding: '8px', // Optional padding for better spacing
};


export default function Questioninfo({QuestionsData, flag, setFlag, setQuestionData}) {
    const [QuestionInfo, setQuestionInfo] = useState([]);
    const toggleQuestionEditor = (Question) => {
        console.log("Heyo from question editor");
        console.log("Selected Question", Question);
        setQuestionInfo(Question);
        setFlag(true);
    }
    const handleSaveQuestion = (editedQuestion) => {
        console.log("Heyo from handle saver")
        setQuestionData(prevMCQData => 
            prevMCQData.map(mcq => mcq.id === editedQuestion.id ? editedQuestion : mcq)
        );
    };

    const questionColumns = [
    { field: "id", headerName: "ID", width: 70 },
    // {
    //   field: "center_id",
    //   headerName: "Center Id",
    //   width: 230,
    // },
    {
        field: "name",
        headerName: "Question",
        width: 230,
    },
    {
        field: "marks",
        headerName: "Marks",
        width: 230,
    },
    {
        field: "topic_name",
        headerName: "Topic",
        width: 230,
        
    },
    {
        field: "chapter_name",
        headerName: "Chapter",
        width: 230,
    },
    {
        field: "subject_name",
        headerName: "Subject",
        width: 230,
    },
    {
        field: "class_name",
        headerName: "Class",
        width: 230,
    },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 160,
    //   renderCell: (params) => {
    //     return (
    //       <div className={`cellWithStatus ${params.row.status}`}>
    //         {params.row.status}
    //       </div>
    //     );
    //   },
    // },
    ];

    useEffect(()=>{
        handleSaveQuestion(QuestionInfo)
    },[QuestionInfo])

    console.log("Questions after parameter", QuestionsData);
    return(<>
            {flag === true ? <QuestionEditor Questions={QuestionInfo} setFlag={setFlag} setQuestion={setQuestionInfo}/> :
            <>
                {/* {QuestionsData.map((Question) => {
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
                } */}
                {console.log("Questions check", QuestionsData)}
                <DataGrid
                className="datagrid"
                rows={QuestionsData}
                columns={questionColumns}
                pageSize={9}
                rowsPerPageOptions={[9]}
                components={{
                    Toolbar: GridToolbar,
                }}
                />
            </>
            }
    </>)
}