/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { useState, useEffect } from "react";
import { Status, UserNotes, Users } from "../../models/types";
import {
  selectLoggedUser,
  selectIsAuthenticated,
} from "../../services/slices/authSlice";
import { useTypedSelector } from "../../services";
import { useUpdateUserNoteMutation } from "./userNotesApi";
import EdiText from "react-editext";
import isUUID from "validator/lib/isUUID";
import { useGetAllUserNotesByExamResultQuery } from "../userNotes/userNotesApi";
import { v4 as uuidv4 } from "uuid";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import { useAddUserNoteMutation } from "../userNotes/userNotesApi";
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from "../../services/helpers";

interface CreateNewNoteFormProps {
  examResultId: string;
  loggedUser: Users;
  onSubmit: (note: Partial<UserNotes>) => void;
}

export const CreateNewNoteForm = ({
  examResultId,
  loggedUser,
  onSubmit,
}: CreateNewNoteFormProps) => {
  const initial = {
    id: uuidv4(),
    content: "",
    status: Status.Active,
    createdBy: loggedUser!.id,
    examResultId: "",
  };
  const [note, setNote] = React.useState<Partial<UserNotes>>(initial);

  useEffect(() => {
    setNote((prev) => ({
      ...note,
      examResultId: examResultId,
    }));
  }, [examResultId]);

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(note);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setNote((prev) => ({
      ...note,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="w-50">
        <div className="d-flex form-group">
          <input
            className="form-control rounded"
            type="text"
            name="content"
            defaultValue={note.content}
            onChange={handleChange}
            required
          />
          <IconButton
            aria-label="Post"
            size="small"
            type="submit"
            disabled={!loggedUser ? true : false}
          >
            <SendIcon color="primary" />
          </IconButton>
        </div>
      </div>
    </form>
  );
};

function InlineEditNote({ note }: any) {
  const [value, setValue] = React.useState<Partial<UserNotes>>(note);
  const [updateNote] = useUpdateUserNoteMutation();

  const handleSave = async (val: any) => {
    try {
      const updatedNote = { ...note, content: val };
      await updateNote(updatedNote).unwrap();
      setValue(updatedNote);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <EdiText
      showButtonsOnHover
      type="textarea"
      inputProps={{
        className: "textarea",
        placeholder: "Type your note here",
        style: {
          outline: "none",
          minWidth: "auto",
        },
        rows: 5,
        cols: 50,
      }}
      editButtonContent="Edit"
      saveButtonContent="Apply"
      cancelButtonContent="Cancel"
      editButtonClassName="btn btn-primary p2"
      saveButtonClassName="btn btn-primary p2 mr-2"
      cancelButtonClassName="btn btn-primary p2"
      value={value.content as string}
      onSave={handleSave}
      validationMessage="Please input some text."
      validation={(val) => val.length > 0}
    />
  );
}

export const PostNotes = ({ examResultId }: any) => {
  const isAuthenticated = useTypedSelector(selectIsAuthenticated);
  const loggedUser = useTypedSelector(selectLoggedUser);
  const [isNoteLoad, setIsNoteLoad] = useState(false);
  const { data: notes } = useGetAllUserNotesByExamResultQuery(examResultId, {
    skip: !isNoteLoad,
  });
  const [addUserNote] = useAddUserNoteMutation();
  const [erroMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (examResultId && isUUID(examResultId)) {
      setIsNoteLoad(true);
    }
  }, [examResultId]);

  const handleCreateNewNote = async (note: Partial<UserNotes>) => {
    try {
      await addUserNote(note).unwrap();
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
    <div>
      <div className="comment-form-wrap pt-5">
        <h3 className="h4 font-weight-bold">Your Notes</h3>
        {isNoteLoad ? (
          <CreateNewNoteForm
            examResultId={examResultId}
            loggedUser={loggedUser as Users}
            onSubmit={handleCreateNewNote}
          ></CreateNewNoteForm>
        ) : null}
      </div>
      <div className="pt-2 mt-2">
        {isAuthenticated
          ? notes &&
            notes?.map((note: UserNotes) => (
              <div
                key={note.id}
                className="d-flex align-items-center align-middle mb-2"
              >
                <div className="examview-note rounded pl-2 pr-2">
                  <InlineEditNote note={note} />
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
