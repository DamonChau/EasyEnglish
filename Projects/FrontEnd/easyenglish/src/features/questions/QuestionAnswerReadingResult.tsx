/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { UserAnswersDisplay, UserNotes } from "../../interfaces/interfaces";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ListSubheader from "@mui/material/ListSubheader";
import EditNoteIcon from "@mui/icons-material/EditNote";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { CreateNewNoteModal } from "../common/Modals";
import { useAddUserNoteMutation } from "../userNotes/userNotesApi";
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from "../../services/helpers";

export const ListAnswerResult = ({
  userAnswers,
  loggedUser,
  onCreateNewNote,
}: any) => {
  const [open, setOpen] = useState(false);
  const [currAnwser, setAnwser] = useState<UserAnswersDisplay>();
  const [addUserNote] = useAddUserNoteMutation();
  const [erroMsg, setErrorMsg] = useState("");

  const handleCreateNewNote = async (note: UserNotes) => {
    try {
      await addUserNote(note).unwrap();
      onCreateNewNote();
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const msg =
          "error" in err
            ? err.error
            : JSON.parse(JSON.stringify(err.data)).error;
        setErrorMsg(msg);
      } else if (isErrorWithMessage(err)) console.log(err.message);
    }
  };

  return (
    <Box sx={{ width: 400, bgcolor: "background.paper" }} role="presentation">
      {erroMsg ? <div className="p-2 m-2 text-danger">{erroMsg}</div> : null}
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
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="note"
                onClick={() => {
                  setOpen(true);
                  setAnwser(answer);
                }}
              >
                <EditNoteIcon />
              </IconButton>
            }
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
                <ListItemText primary={"Q.No"} secondary={answer.order} />
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
      <CreateNewNoteModal
        key={1} // re-render child component
        answer={currAnwser}
        open={open}
        loggedUser={loggedUser}
        onClose={() => setOpen(false)}
        onSubmit={handleCreateNewNote}
      ></CreateNewNoteModal>
    </Box>
  );
};
