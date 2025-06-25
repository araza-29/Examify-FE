import React,{useEffect, useState} from "react"
import {
  Card,
  Typography,
  Box,
  Grid,
  Select,
  MenuItem,
  TextField,
  FormControl,
  Button,
  CardActions,
  Dialog,
} from "@mui/material";

export default function Feedback({flag, paperID, setFlag, userID}){
  const [feedback, setFeedback] = useState("")
  const handleSubmit = () => {
    const userID = localStorage.getItem("userId")
    console.log("In submit button!!")
    fetch("http://localhost:3000/Examination/createFeeback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: userID,
                review: feedback,
                paper_id: paperID 
            }),
        })
        .then((response) => response.json())
        .catch((error) => {
            return null;
        })
    setFlag(false)
  }

  const handleCancel = () => {
    setFlag(false);
  }
    return(
      <Dialog
      open={flag}
      maxWidth="l"
      sx={{
      "& .MuiDialog-paper": {
          borderRadius: "8px",
          padding: "16px",
          width: "1000px", // Set the desired fixed width
          maxWidth: "100%", // Ensures responsiveness
      }}}>
        <Card
            sx={{
                padding: "20px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#ffffff",
                width: "900px",
                overflowY: "auto",
                minHeight: "300px",
                maxWidth: "100%",
            }}
            >
            <Box
                sx={{ 
                    display: "flex", 
                    flexDirection: "column", // Changed from row to column
                    gap: 2 // Reduced gap for better spacing
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                    sx={{
                    fontSize: "2rem", // Customize font size
                    fontWeight: "bold", // Make the text bold
                    color: "#333", // Text color for main content
                    mb: 1, // Add margin-bottom to separate content
                    }}
                >
                    Feedback
                </Typography>
                <TextField
                label="Feedback"
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
                value={feedback}
                onChange={(value) =>
                    setFeedback(value.target.value )
                }
                />
                </Box>
            </Box>
        
            <CardActions sx={{ justifyContent: "flex-end", mt: 2 }}>
                <Button
                    variant="contained"
                    sx={{
                    background:
                        "#7451f8",
                    color: "white",
                    // "&:hover": {
                    //     background:
                    //     "linear-gradient(90deg, #1976D2 0%, #21CBF3 100%)",
                    // },
                    }}
                    onClick={handleSubmit}
                >
                    Save Changes
                </Button>
                <Button
                    variant="contained"
                    sx={{
                    ml: 2,
                    backgroundColor: "#7451f8",
        
                    }}
                    onClick={handleCancel}
                >
                    Cancel
                </Button>
            </CardActions>
            </Card>
      </Dialog>
    )

}