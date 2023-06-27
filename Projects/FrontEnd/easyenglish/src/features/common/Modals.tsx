/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Questions,
  QuestionType,
  QuestionDetails,
  Status,
  Users,
  UserType,
} from "../../models/types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  }
);

interface QuestionModalProps {
  open: boolean;
  question: Partial<Questions>;
  onClose: () => void;
  onSubmit: (question: Partial<Questions>) => void;
}

export const CreateNewQuestionModal = ({
  open,
  question,
  onClose,
  onSubmit,
}: QuestionModalProps) => {
  const [q, setQ] = React.useState<Partial<Questions>>(question);

  useEffect(() => {
    setQ(question);
  }, [question.id]);

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

interface QuestionDetailModalProps {
  open: boolean;
  questionDetail: Partial<QuestionDetails>;
  onClose: () => void;
  onSubmit: (questionDetail: Partial<QuestionDetails>) => void;
}

export const CreateNewQuestionDetailModal = ({
  open,
  questionDetail,
  onClose,
  onSubmit,
}: QuestionDetailModalProps) => {
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
              <input
                className="form-control"
                type="number"
                min={1}
                placeholder="QuestioNo"
                name="qno"
                defaultValue={q.qno}
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

interface UserStatusModalProps {
  open: boolean;
  user: Users;
  onClose: () => void;
  onSubmit: (user: Partial<Users>) => void;
}

export const EditUserStatusModal = ({
  open,
  user,
  onClose,
  onSubmit,
}: UserStatusModalProps) => {
  const [u, setU] = React.useState<Partial<Users>>(user);

  useEffect(() => {
    setU(user);
  }, [user]);

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(u);
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setU((prev) => ({
      ...u,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Edit User Status</DialogTitle>
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
          {u && (
            <form>
              <div className="d-flex justify-content-center mb-2">
                <Typography variant="h6" component="div">
                  {u.userName}
                </Typography>
              </div>
              <div className="form-group row">
                <select
                  className="form-control"
                  name="userType"
                  value={u.userType}
                  onChange={handleChange}
                  placeholder="User Type"
                >
                  {Object.keys(UserType)
                    .filter((key) => isNaN(Number(key)))
                    .map((key, value) => (
                      <option key={value} value={value}>
                        {UserType[value]}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group row">
                <select
                  className="form-control"
                  name="status"
                  value={u.status}
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
          )}
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

interface ConfirmationModalProps {
  open: boolean;
  headerText: string;
  confirmationText: string;
  onClose: () => void;
  onSubmit: () => void;
}

export const ConfirmationModal = ({
  open,
  headerText,
  confirmationText,
  onClose,
  onSubmit,
}: ConfirmationModalProps) => {
  const handleSubmit = () => {
    //put your validation logic here
    onSubmit();
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center" variant="h6">
        {headerText}
      </DialogTitle>
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
          <div className="d-flex justify-content-center mb-2">
            <Typography variant="body1" component="div">
              {confirmationText}
            </Typography>
          </div>
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
          OK
        </button>
      </DialogActions>
    </Dialog>
  );
};
