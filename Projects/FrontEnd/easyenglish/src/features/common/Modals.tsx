/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Questions,
  QuestionType,
  QuestionDetails,
  UserNotes,
  Status,
} from "../../interfaces/interfaces";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  }
);

export const CreateNewNoteModal = ({
  open,
  answer,
  loggedUser,
  onClose,
  onSubmit,
}: any) => {
  const initial = {
    id: uuidv4(),
    content: "",
    status: Status.Active,
    createdBy: loggedUser!.id,
    userAnswerId: "",
    examResultId: "",
  };

  const [note, setNote] = React.useState<Partial<UserNotes>>(initial);

  useEffect(() => {
    setNote((prev) => ({
      ...note,
      userAnswerId: answer ? answer.id : "",
      examResultId: answer ? answer.examResultId : "",
    }));
  }, [answer]);

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(note);
    onClose();
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
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create Notes</DialogTitle>
      <DialogContent
        sx={{
          paddingLeft: "24px",
          paddingRight: "24px",
          paddingBottom: "0px",
        }}
      >
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            padding: "10px",
          }}
        >
          <form>
            <div className="form-group row">
              <input
                className="form-control"
                type="text"
                name="content"
                defaultValue={note.content}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group row">
              <select
                className="form-control"
                name="status"
                value={note.status}
                onChange={handleChange}
                placeholder="Status"
              >
                {Object.keys(Status)
                  .filter((key) => isNaN(Number(key)))
                  .map((key, value) => (
                    <option key={value} value={value}>
                      {Status[value]}
                    </option>
                  ))}
              </select>
            </div>
          </form>
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
        <button
          className="btn btn-primary py-2 px-2"
          type="button"
          onClick={handleSubmit}
        >
          Save
        </button>
      </DialogActions>
    </Dialog>
  );
};

export const CreateNewQuestionModal = ({
  open,
  question,
  onClose,
  onSubmit,
}: any) => {
  const [q, setQ] = React.useState<Partial<Questions>>(question);

  useEffect(() => {
    setQ(question);
  }, [question.id]);

  const handleSubmit = () => {
    //put your validation logic here
    console.log(q);
    onSubmit(q);
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setQ((prev) => ({
      ...q,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Question</DialogTitle>
      <DialogContent
        sx={{
          paddingLeft: "24px",
          paddingRight: "24px",
          paddingBottom: "0px",
        }}
      >
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            padding: "10px",
          }}
        >
          <form>
            <div className="form-group row">
              <input
                className="form-control"
                type="number"
                min={1}
                placeholder="order"
                name="order"
                defaultValue={q.order}
                onChange={handleChange}
              />
            </div>
            <div className="form-group row">
              <input
                className="form-control"
                type="text"
                placeholder="title"
                name="title"
                defaultValue={q.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group row">
              <textarea
                className="form-control"
                rows={5}
                name="content"
                placeholder="content"
                defaultValue={q.content}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="form-group row">
              <input
                className="form-control"
                type="text"
                name="description"
                placeholder="description"
                defaultValue={q.description}
                onChange={handleChange}
              />
            </div>
            <div className="form-group row">
              <select
                className="form-control"
                name="questionType"
                value={q.questionType}
                onChange={handleChange}
                placeholder="Question Type"
              >
                {Object.keys(QuestionType)
                  .filter((key) => isNaN(Number(key)))
                  .map((key, value) => (
                    <option key={value} value={value}>
                      {QuestionType[value]}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group row">
              <select
                className="form-control"
                name="status"
                value={q.status}
                onChange={handleChange}
                placeholder="Status"
              >
                {Object.keys(Status)
                  .filter((key) => isNaN(Number(key)))
                  .map((key, value) => (
                    <option key={value} value={value}>
                      {Status[value]}
                    </option>
                  ))}
              </select>
            </div>
          </form>
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
        <button
          className="btn btn-primary py-2 px-2"
          type="button"
          onClick={handleSubmit}
        >
          Save
        </button>
      </DialogActions>
    </Dialog>
  );
};

export const CreateNewQuestionDetailModal = ({
  open,
  questionDetail,
  onClose,
  onSubmit,
}: any) => {
  const [q, setQ] = React.useState<Partial<QuestionDetails>>(questionDetail);

  useEffect(() => {
    setQ(questionDetail);
  }, [questionDetail.id]);

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(q);
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setQ((prev) => ({
      ...q,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Question Detail</DialogTitle>
      <DialogContent
        sx={{
          paddingLeft: "24px",
          paddingRight: "24px",
          paddingBottom: "0px",
        }}
      >
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
          }}
        >
          <form>
            <div className="form-group row">
              <input
                className="form-control"
                type="number"
                min={1}
                placeholder="order"
                name="order"
                defaultValue={q.order}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group row">
              <textarea
                className="form-control"
                rows={5}
                name="content"
                placeholder="content"
                defaultValue={q.content}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="form-group row">
              <textarea
                className="form-control"
                rows={5}
                name="answer"
                placeholder="answer"
                defaultValue={q.answer}
                onChange={handleChange}
              ></textarea>
            </div>
          </form>
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
        <button
          className="btn btn-primary py-2 px-2"
          type="button"
          onClick={handleSubmit}
        >
          Save
        </button>
      </DialogActions>
    </Dialog>
  );
};
