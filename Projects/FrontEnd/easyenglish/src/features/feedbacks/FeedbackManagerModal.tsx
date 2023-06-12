/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Status, Feedbacks, UserType } from "../../interfaces/interfaces";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from "../../services/helpers";
import { useTypedSelector } from "../../services";
import { selectLoggedUser } from "../../services/slices/authSlice";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  ContentState,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  useAddFeedbacksMutation,
  useGetFeedbacksByExamQuery,
  useUpdateFeedbacksMutation,
} from "./feedbackApi";

const FeedbackManagerModal = ({ open, examResult, onClose }: any) => {
  const loggedUser = useTypedSelector(selectLoggedUser);
  const initial = {
    id: uuidv4(),
    content: "",
    status: Status.Active,
    createdBy: loggedUser?.id,
    examResultId: examResult.id,
  };
  const [isEditing, setIsEditing] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [feedback, setFeedback] = React.useState<Partial<Feedbacks>>(initial);
  const { data, isLoading, refetch } = useGetFeedbacksByExamQuery(
    examResult.id
  );

  const [erroMsg, setErrorMsg] = useState("");
  const [addFeedback] = useAddFeedbacksMutation();
  const [updateFeedback] = useUpdateFeedbacksMutation();

  useEffect(() => {
    if (data) {
      setIsEditing(true);
      setFeedback((prev) => ({
        ...data,
      }));
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(data.content!)))
      );
    } else {
      setIsEditing(false);
      setEditorState(
        EditorState.createWithContent(ContentState.createFromText(""))
      );
    }
  }, [data]);

  useEffect(() => {
    const rawstring = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );

    setFeedback((prev) => ({
      ...prev,
      content: rawstring,
    }));
  }, [editorState]);

  const handleSubmit = async () => {
    //put your validation logic here
    await save();
    clearFields();
    onClose();
  };

  function clearFields() {
    setEditorState(
      EditorState.createWithContent(ContentState.createFromText(""))
    );
    setFeedback(initial);
  }

  const save = async () => {
    if (feedback) {
      try {
        isEditing
          ? await updateFeedback(feedback).unwrap()
          : await addFeedback(feedback).unwrap();
      } catch (err) {
        if (isFetchBaseQueryError(err)) {
          const msg =
            "error" in err
              ? err.error
              : JSON.parse(JSON.stringify(err.data)).error;
          setErrorMsg(msg);
        } else if (isErrorWithMessage(err)) console.log(err.message);
      }
    }
  };

  return (
    <Dialog open={open} fullWidth maxWidth={"md"}>
      <DialogTitle textAlign="center">Create Feedbacks</DialogTitle>
      <DialogContent
        sx={{
          paddingLeft: "24px",
          paddingRight: "24px",
          paddingBottom: "0px",
        }}
      >
        {erroMsg ? <div className="p-2 m-2 text-danger">{erroMsg}</div> : null}
        <Stack
          sx={{
            padding: "10px",
          }}
        >
          {!isLoading ? (
            <Editor
              editorState={editorState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
              onEditorStateChange={setEditorState}
            ></Editor>
          ) : null}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ paddingBottom: "1.25rem" }}>
        <button
          className="btn btn-primary py-2 px-2"
          type="button"
          onClick={onClose}
        >
          Cancel
        </button>
        {loggedUser?.userType == UserType.Teacher ? (
          <button
            className="btn btn-primary py-2 px-2"
            type="button"
            onClick={handleSubmit}
          >
            Save
          </button>
        ) : null}
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackManagerModal;
