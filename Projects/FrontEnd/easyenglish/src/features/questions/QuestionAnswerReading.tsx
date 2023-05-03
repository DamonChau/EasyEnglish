/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { QuestionsResponse, useGetQuestionsWithQDQuery } from "./questionsApi";
import { useAddUserAnswerMutation } from "../users/userAnswersApi";
import { useAddExamResultMutation } from "../examResult/examResultApi";
import { useTypedSelector } from "../../services";
import isUUID from "validator/lib/isUUID";
import {
  Questions,
  UserAnswersDisplay,
  QuestionDetails,
  UserAnswers,
  ExamResults,
} from "../../interfaces/interfaces";
import {
  selectLoggedUser,
  selectIsAuthenticated,
} from "../../services/slices/authSlice";
import Snackbar from "@mui/material/Snackbar";
import Drawer from "@mui/material/Drawer";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { v4 as uuidv4 } from "uuid";
import { ListAnswerResult } from "./QuestionAnswerReadingResult";
import QuestionAnswerReadingDetails from "./QuestionAnswerReadingDetails";
import { Alert } from "../common/Modals";

const QuestionAnswerReading = ({ testId, getExamResult }: any) => {
  const [isView, setView] = React.useState(false);
  const { data, isFetching, isLoading, isSuccess, isError, error } =
    useGetQuestionsWithQDQuery(testId, { skip: !isView });
  const [
    addUserAnswer,
    { isLoading: isAddUALoading, isError: isAddUAError, error: errorUAAdd },
  ] = useAddUserAnswerMutation();
  const [
    addExamResult,
    { isLoading: isAddERLoading, isError: isAddERError, error: errorERAdd },
  ] = useAddExamResultMutation();

  const [userAnswers, setUserAnswers] = useStateWithCallbackLazy<
    UserAnswersDisplay[]
  >([]);
  const [open, setOpen] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [isSave, setSave] = React.useState(false);
  const loggedUser = useTypedSelector(selectLoggedUser);
  const isAuthenticated = useTypedSelector(selectIsAuthenticated);
  const initialValueTestResult = {
    id: uuidv4(),
    examTestId: testId,
    score: 0,
    noQuestion: 0,
    createdBy: isAuthenticated ? loggedUser!.id : uuidv4(),
  };
  const [testResult, setTestResult] = useState(initialValueTestResult);
  const [erroMsg, setErrorMsg] = useState("");

  //update exam test result id
  useEffect(() => {
    if (testId && isUUID(testId)) {
      setView(true);
      setTestResult((prevState) => ({ ...prevState, examTestId: testId }));
    }
  }, [testId]);

  //update exam test result no question
  useEffect(() => {
    if (data) {
      const questions: Questions[] = data;
      questions.forEach((q) => {
        setTestResult((prevState) => ({
          ...prevState,
          noQuestion: prevState.noQuestion + q.questionDetails.length,
        }));
      });
    }
  }, [data]);

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

  //#region helpers
  function replaceWithBr(q: Questions) {
    return q?.content.replace(/\n/g, "<br />");
  }

  const findAnswer = (
    questions: QuestionsResponse,
    questionDetailId: string
  ): QuestionDetails => {
    let questionDetail: QuestionDetails = {
      id: "",
      order: -1,
      answer: "",
      content: "",
      createdDate: "",
      createdBy: "",
      questionId: "",
    };
    for (const q of questions) {
      for (const qd of q.questionDetails) {
        if (qd.id === questionDetailId) {
          questionDetail = qd;
          break;
        }
      }
    }
    return questionDetail;
  };

  const compareFB = (a: UserAnswersDisplay, b: UserAnswersDisplay) => {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    return 0;
  };
  //#endregion

  //#region events
  const handleFieldChange = React.useCallback(
    (userAnswers: UserAnswersDisplay) => {
      setUserAnswers(
        (prevState) => {
          // Check if the object already exists in the array
          const existingObjectIndex = prevState.findIndex(
            (obj) =>
              obj.questionDetailId === userAnswers.questionDetailId &&
              obj.userId === userAnswers.userId
          );

          // If it exists, update the object at the existing index
          if (existingObjectIndex !== -1) {
            const updatedArray = [...prevState];
            updatedArray[existingObjectIndex] = userAnswers;
            return updatedArray;
          }

          // If it doesn't exist, add the new object to the end of the array
          return [...prevState, userAnswers];
        },
        () => {}
      );
    },
    []
  );

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const restartNewTest = () => {
    setUserAnswers([], () => {});
    setOpen(false);
    setOpenDrawer(false);
    setSave(false);
    setTestResult(initialValueTestResult);
    setView(true);
  };
  //#endregion

  //#region save and check for result
  const onSaveExamResult = async (
    result: Partial<ExamResults>,
    score: number
  ) => {
    try {
      if (result) {
        result.score = score;
        const r = await addExamResult(result).unwrap();
        setTestResult(r);
        return r.id;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSaveUserAnswer = async (userAnswers: UserAnswersDisplay[]) => {
    try {
      if (userAnswers) {
        userAnswers.forEach(async (answer: Partial<UserAnswers>) => {
          const r = await addUserAnswer(answer).unwrap();
          setUserAnswers(
            (prevState) => {
              // Check if the object already exists in the array
              const existingObjectIndex = prevState.findIndex(
                (obj) =>
                  obj.questionDetailId === r.questionDetailId &&
                  obj.userId === r.userId &&
                  obj.examResultId == r.examResultId
              );

              // If it exists, update the object at the existing index
              if (existingObjectIndex !== -1) {
                const updatedArray = [...prevState];
                updatedArray[existingObjectIndex].id = r.id;

                return updatedArray;
              } else {
                const updatedArray = [...prevState];
                return updatedArray;
              }
            },
            () => {}
          );
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSave = async () => {
    try {
      let score = 0;
      //update score and result
      let updatedUserAnswers = userAnswers.map((answer) => {
        const qd = findAnswer(
          data as QuestionsResponse,
          answer.questionDetailId
        );
        answer.answer == qd.answer ? (answer.result = 1) : (answer.result = 0);
        answer.answerOrg = qd.answer;
        answer.order = qd.order;
        answer.description = qd.order.toString();
        score += answer.result;
        return answer;
      });
      //save ExamResult
      const examResultId = await onSaveExamResult(testResult, score);

      //save User Answer
      updatedUserAnswers = userAnswers.map((answer) => {
        // Create a new object with the updated id value
        const updatedAnswer = { ...answer, examResultId: examResultId! };
        return updatedAnswer;
      });
      updatedUserAnswers.sort(compareFB);

      setUserAnswers(updatedUserAnswers, () => {
        onSaveUserAnswer(updatedUserAnswers);
      });

      setOpen(true);
      toggleDrawer();
      setSave(true);
      setView(false);
    } catch (error) {
      console.log(error);
      setOpen(false);
      setSave(false);
    }
  };

  const onCreateNewNote = () => {
    getExamResult(testResult);
  };
  //#endregion

  return (
    <div>
      <Drawer anchor={"left"} open={openDrawer} onClose={toggleDrawer}>
        <ListAnswerResult
          userAnswers={userAnswers}
          loggedUser={loggedUser}
          onCreateNewNote={onCreateNewNote}
        />
      </Drawer>
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
      {isError ? <div className="p-2 m-2 text-danger">{erroMsg}</div> : null}
      {isLoading ? (
        <p>
          <em>Loading...</em>
        </p>
      ) : (
        <div>
          <h3>Questions</h3>
          {data &&
            data.map((q: Questions) => (
              <div key={q.id} className="mb-2">
                <h6>{q.title}</h6>
                <p
                  dangerouslySetInnerHTML={{ __html: replaceWithBr(q) }}
                  style={{ fontStyle: "italic" }}
                ></p>
                <QuestionAnswerReadingDetails
                  key={q.id}
                  question={q}
                  questionDetails={q.questionDetails}
                  handleFieldChange={handleFieldChange}
                />
              </div>
            ))}

          <button
            className="btn btn-primary py-2 px-3 mr-2"
            type="submit"
            onClick={onSave}
            disabled={!isAuthenticated ? true : isSave ? true : false}
          >
            Submit
          </button>
          <button
            className="btn btn-primary py-2 px-3 mr-2"
            type="button"
            onClick={toggleDrawer}
            disabled={!isAuthenticated ? true : !isSave ? true : false}
          >
            View Results
          </button>
          <button
            className="btn btn-primary py-2 px-3 mr-2"
            type="button"
            onClick={restartNewTest}
            disabled={!isAuthenticated ? true : !isSave ? true : false}
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
};
export default QuestionAnswerReading;
