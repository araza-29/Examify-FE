import React from "react";
import { Box, Grid, Typography } from "@mui/material";

const InfoCard = ({ paper, date, subject, className }) => {
  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "16px",
        width: "100%", // Responsive width
        maxWidth: "400px", // Adjust max width if needed
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        {paper}
      </Typography>
      <Typography variant="body2">📅 Date: {date}</Typography>
      <Typography variant="body2">📚 Subject: {subject}</Typography>
      <Typography variant="body2">🏫 Class: {className}</Typography>
    </Box>
  );
};

const PaperInfo = ({ data }) => {
  return (
    <Grid container spacing={2}>
      {data.map((item, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <InfoCard {...item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PaperInfo;
