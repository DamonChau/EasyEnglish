/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { useTypedSelector } from "../../services";
import { selectLoggedUser } from "../../services/slices/authSlice";
import { UserAnswers } from "../../interfaces/interfaces";
import isUUID from "validator/lib/isUUID";
import Snackbar from "@mui/material/Snackbar";
import { useGetQuestionsWithQDQuery } from "./questionsApi";
import { useAddUserAnswerMutation } from "../users/userAnswersApi";
import { useAddExamResultMutation } from "../examResult/examResultApi";
import { v4 as uuidv4 } from "uuid";
import { Alert } from "../common/Modals";
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from "../../services/helpers";

const QuestionAnswerWriting = ({ testId }: any) => {
  const [isView, setView] = React.useState(false);
  const { data, isFetching, isLoading, isSuccess, isError, error } =
    useGetQuestionsWithQDQuery(testId, { skip: !isView });
  const [addUserAnswer] = useAddUserAnswerMutation();
  const [addExamResult] = useAddExamResultMutation();

  const loggedUser = useTypedSelector(selectLoggedUser);
  const initialValueTestResult = {
    id: uuidv4(),
    examTestId: testId,
    score: -1,
    noQuestion: 1,
    createdBy: loggedUser!.id,
  };
  const [testResult, setTestResult] = useState(initialValueTestResult);

  const initialValue = {
    id: uuidv4(),
    answer: "",
    result: -1,
    userId: loggedUser!.id,
    questionDetailId: uuidv4(),
    status: 1,
    examResultId: uuidv4(),
  };
  const [userAnswer, setUserAnswer] =
    useState<Partial<UserAnswers>>(initialValue);
  const [wordCount, setWordCount] = useState(0);
  const [erroMsg, setErrorMsg] = useState("");
  const [open, setOpen] = React.useState(false);

  //update exam test result id
  useEffect(() => {
    if (testId && isUUID(testId)) {
      setView(true);
      setTestResult((prevState) => ({ ...prevState, examTestId: testId }));
    }
  }, [testId]);

  useEffect(() => {
    if (error) {
      if ("status" in error) {
        // you can access all properties of `FetchBaseQueryError` here
        const msg = "error" in error ? error.error : JSON.stringify(error.data);
        setErrorMsg(msg);
      } else {
        // you can access all properties of `SerializedError` here
        setErrorMsg(error.message as string);
      }
    }
  }, [isError]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setUserAnswer((prev) => ({
      ...userAnswer,
      [e.target.name]: e.target.value,
    }));
    setWordCount(
      e.target.value.trim().length > 0
        ? e.target.value.trim().split(" ").length
        : 0
    );
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      if (data) {
        data.forEach(async (question) => {
          question.questionDetails.forEach(async (qd) => {
            const ts = await addExamResult(testResult).unwrap();

            const updatedUserAnswer = {
              ...userAnswer,
              questionDetailId: qd.id,
              examResultId: ts.id,
            };
            setUserAnswer(updatedUserAnswer);
            await addUserAnswer(updatedUserAnswer).unwrap();
          });
        });
        setOpen(true);
      }
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const msg =
          "error" in err
            ? err.error
            : JSON.parse(JSON.stringify(err.data)).error;
        setErrorMsg(msg);
      } else if (isErrorWithMessage(err)) console.log(err.message);
      setOpen(false);
    }
  };

  return (
    <React.Fragment>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Submit successfully!
        </Alert>
      </Snackbar>
      {isLoading ? (
        <p>
          <em>Loading...</em>
        </p>
      ) : (
        <React.Fragment>
          {erroMsg ? (
            <div className="p-2 m-2 text-danger">{erroMsg}</div>
          ) : null}
          <div>
            <form className="was-validated"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <textarea
                className="form-control"
                rows={20}
                cols={50}
                name="answer"
                placeholder="answer"
                onChange={handleChange}
                required
              ></textarea>
            </form>
            <label id="wordCount">Word(s) Count: {wordCount}</label>
          </div>
          <button className="btn btn-primary py-2 px-3" type="submit">
            Save
          </button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default QuestionAnswerWriting;
