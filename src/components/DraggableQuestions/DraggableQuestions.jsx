import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import parser from "html-react-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Box, Typography } from "@mui/material";
const DraggableQuestions = ({ section, Questions, SetQuestions, setDeletedQuestions }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    console.log(Questions);
    const newList = Array.from(Questions);
    const [reorderedItem] = newList.splice(result.source.index, 1);
    newList.splice(result.destination.index, 0, reorderedItem);
    console.log("Dragging", newList);
    SetQuestions(newList);
  };
  console.log("Draggable section", section);
  const handleDelete = (id) => {
    const deletedQuestions = Questions.filter((Question) => Question.id === id);
    setDeletedQuestions(deletedQuestions)
    const updatedQuestions = Questions.filter((Question) => Question.id !== id);
    SetQuestions(updatedQuestions);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            sx={{
              backgroundColor: "white",
              padding: 4,
              borderRadius: "4px",
              boxShadow: 1,
            }}
          >
            {Questions.filter((question) => {

              return (
                String(question.section).toLowerCase() ===
                String(section.name).toLowerCase()
              );
            }).map((question, index) => {

              return (
                <Draggable
                  key={question.id}
                  draggableId={question.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={{
                        backgroundColor: "white",
                        padding: 4,
                        borderRadius: 1,
                        boxShadow: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box sx={{ display: "flex" }}>
                          <Box sx={{ marginRight: 3 }}>{index + 1}</Box>
                          <Box sx={{ display: "block" }}>
                            <Typography>{parser(question.name)}</Typography>
                          </Box>
                        </Box>
                        <Box>
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() => handleDelete(question.id)}
                            style={{
                              margin: 3,
                              fontSize: "1.25rem",
                              cursor: "pointer",
                              float: "right",
                              color: "red",
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableQuestions;
