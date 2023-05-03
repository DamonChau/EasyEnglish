/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { useState, useEffect } from "react";
import { UserNotes } from "../../interfaces/interfaces";
import {
  selectIsAuthenticated,
} from "../../services/slices/authSlice";
import { useTypedSelector } from "../../services";
import { useUpdateUserNoteMutation } from "./userNotesApi";
import EdiText from "react-editext";
import isUUID from 'validator/lib/isUUID';
import { useGetAllUserNotesByExamResultQuery } from "../userNotes/userNotesApi";

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
        cols: 50
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
  const [isNoteLoad, setIsNoteLoad] = useState(false);
  const {
    data: notes,
    isFetching,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllUserNotesByExamResultQuery(examResultId, {
    skip: !isNoteLoad,
  });

  useEffect(() => {
    if (examResultId && isUUID(examResultId)) {
      setIsNoteLoad(true);
    }
  }, [examResultId]);

  return (
    <div>
      <div className="comment-form-wrap pt-5">
        <h3 className="h4 font-weight-bold">Your Notes</h3>
      </div>
      <div className="pt-2 mt-2">
        {isAuthenticated
          ? notes &&
            notes?.map((note: UserNotes) => (
              <div
                key={note.id}
                className="d-flex align-items-center align-middle mb-2"
              >
                <span className="mr-3 font-weight-bold">{`Q${note.userAnswer.questionDetail.order}:`}</span>
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
