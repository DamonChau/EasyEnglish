/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import {
  UserAnswers,
  UserAnswersDisplay,
  UserNotes,
  Users,
} from "../../models/types";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ListSubheader from "@mui/material/ListSubheader";
import Stack from "@mui/material/Stack";

interface ListAnswerResultProps {
  userAnswers: UserAnswersDisplay[];
}

export const ListAnswerResult = ({
  userAnswers
}: ListAnswerResultProps) => {
  return (
    <Box sx={{ width: 400, bgcolor: "background.paper" }} role="presentation">
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Results
          </ListSubheader>
        }
      >
        {userAnswers.map((answer: UserAnswersDisplay) => (
          <ListItem
            key={answer.questionDetailId}
            disablePadding
            alignItems="flex-start"
          >
            <ListItemIcon>
              {answer.result === 1 ? (
                <ThumbUpIcon color={"success"} />
              ) : (
                <ThumbDownIcon />
              )}
            </ListItemIcon>
            <React.Fragment>
              <Stack direction="row" spacing={2}>
                <ListItemText primary={"Q.No"} secondary={answer.qno} />
              </Stack>
              <Stack
                direction="row"
                sx={{ maxWidth: 50 }}
                spacing={2}
                marginLeft={5}
              >
                <ListItemText primary={"Your"} secondary={answer.answer} />
              </Stack>
              <Stack
                direction="row"
                sx={{ maxWidth: 50 }}
                spacing={2}
                marginLeft={5}
              >
                <ListItemText
                  primary={"Correct"}
                  secondary={answer.answerOrg}
                />
              </Stack>
            </React.Fragment>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
