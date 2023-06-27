/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  ExamTests,
  ExamResults,
  ExamTestType,
  ExamTestSectionType,
  LoginType,
  UserType,
} from "../../models/types";
import { Breakpoint } from "@mui/system";
import { SxProps } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { parseISO } from "date-fns";
import { useGetTop3ResultsByUserQuery } from "../examResult/examResultApi";
import Collapse from "@mui/material/Collapse";
import { useGetAllByExamQuery } from "../users/userAnswersApi";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import {
  useDownloadFilesMutation,
  FileDownload,
} from "../users/userAnswersApi";
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from "../../services/helpers";
import { useTypedSelector } from "../../services";
import { selectLoggedUser } from "../../services/slices/authSlice";
import FeedbackManagerModal from "../feedbacks/FeedbackManagerModal";

//reposition Dialog flex-start flex-end center
const sx: SxProps = {
  "& .MuiDialog-container": {
    alignItems: "flex-start",
  },
};

interface UserAnswerDetailProps {
  examResultId: string;
  examTest: ExamTests;
}

const ViewUserAnswerDetail = ({
  examResultId,
  examTest,
}: UserAnswerDetailProps) => {
  const { data, isLoading, isError, error } =
    useGetAllByExamQuery(examResultId);
  const [erroMsg, setErrorMsg] = useState("");

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

  function replaceWithBr(content: string) {
    return content.replace(/\n/g, "<br />");
  }

  const AnswersReading = ({ userAnswer, index }: any) => {
    return (
      <div
        className={index % 2 == 0 ? "row bg-white rounded" : "row"}
        key={userAnswer.id}
      >
        <div className="col-sm">
          <strong>QNo</strong>
        </div>
        <div className="col-sm">{userAnswer.questionDetail.qno}</div>
        <div className="col-sm">{userAnswer.answer}</div>
        <div className="col-sm">
          {userAnswer.result == 1 ? (
            <CheckIcon color="success" />
          ) : (
            <ClearIcon color="error" />
          )}
        </div>
      </div>
    );
  };

  const AnswersWriting = ({ userAnswer, index }: any) => {
    return (
      <p
        dangerouslySetInnerHTML={{ __html: replaceWithBr(userAnswer.answer) }}
        style={{ fontStyle: "italic" }}
      ></p>
    );
  };

  const AnswersSpeaking = ({ userAnswer, index }: any) => {
    const [downloadFile] = useDownloadFilesMutation();
    const [audio, setAudio] = useState("");

    useEffect(() => {
      downloadAudiofiles(userAnswer.answer);
    }, []);

    const downloadAudiofiles = async (filename: string) => {
      const file: FileDownload = {
        filename: filename,
      };

      try {
        const url = await downloadFile(file).unwrap();
        setAudio(url);
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
        {audio ? (
          <audio
            src={audio}
            controls
            className="question-answer-speaking-audio"
          ></audio>
        ) : null}
      </div>
    );
  };

  return (
    <div className="container">
      {erroMsg ? <div className="p-2 m-2 text-danger">{erroMsg}</div> : null}
      {data &&
        data?.map((userAnswer, index) => {
          return (examTest as ExamTests).sectionType ==
            ExamTestSectionType.Reading ||
            (examTest as ExamTests).sectionType ==
              ExamTestSectionType.Listening ? (
            <AnswersReading
              key={userAnswer.id}
              userAnswer={userAnswer}
              index={index}
            />
          ) : (examTest as ExamTests).sectionType ==
            ExamTestSectionType.Writing ? (
            <AnswersWriting
              key={userAnswer.id}
              userAnswer={userAnswer}
              index={index}
            />
          ) : (
            <AnswersSpeaking
              key={userAnswer.id}
              userAnswer={userAnswer}
              index={index}
            />
          );
        })}
    </div>
  );
};

interface ScoreModalProps {
  open: boolean;
  userId: string;
  onClose: () => void;
  examTest: ExamTests;
}

const ViewExamScoreModal = ({
  open,
  userId,
  examTest,
  onClose,
}: ScoreModalProps) => {
  const loggedUser = useTypedSelector(selectLoggedUser);
  const [isView, setIsview] = useState(false);
  const [erroMsg, setErrorMsg] = useState("");
  const id = examTest ? examTest.id : null;
  const {
    data: examTestResults,
    isLoading,
    isError,
    error,
  } = useGetTop3ResultsByUserQuery(
    {
      userId: userId,
      examTestId: id as string,
    },
    { skip: !isView }
  );
  const initialExpandedState = examTestResults
    ? new Array(examTestResults.length).fill(false)
    : [];
  const [expanded, setExpanded] = useState(initialExpandedState);

  const initialFeedbackState = examTestResults
    ? new Array(examTestResults.length).fill(false)
    : [];
  const [isOpenFeedback, setOpenFeedback] = useState(initialFeedbackState);
  const [maxWidthDialog, setMaxwidthDialog] = useState<Breakpoint>("xs");

  useEffect(() => {
    if (examTest) {
      setIsview(true);
    }
  }, [examTest]);

  useEffect(() => {
    if (examTestResults) {
      setDialogWidth();
      setExpanded(new Array(examTestResults.length).fill(false));
      setOpenFeedback(new Array(examTestResults.length).fill(false));
    }
  }, [examTestResults]);

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

  const setDialogWidth = () => {
    setMaxwidthDialog(
      examTestResults
        ? examTestResults.length == 1
          ? "xs"
          : examTestResults.length == 2
          ? "md"
          : "lg"
        : "xs"
    );
  };

  const toggleExpanded = (index: number) => {
    setExpanded((prevExpanded) => {
      const newExpanded = [...prevExpanded];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  const toggleFeedback = (index: number) => {
    setOpenFeedback((prevFeedback) => {
      const newFeedback = [...prevFeedback];
      newFeedback[index] = !newFeedback[index];
      return newFeedback;
    });
  };

  return (
    <React.Fragment>
      {!isLoading ? (
        <Dialog open={open} fullWidth maxWidth={maxWidthDialog} sx={sx}>
          <DialogTitle textAlign="center">Your latest results</DialogTitle>
          <DialogContent
            sx={{
              paddingLeft: "5px",
              paddingRight: "5px",
              paddingBottom: "0px",
            }}
          >
            <Stack>
              {erroMsg ? (
                <div className="p-2 m-2 text-danger">{erroMsg}</div>
              ) : null}
              <div className="d-flex justify-content-center align-items-start">
                {examTestResults &&
                  examTestResults.map((result: ExamResults, index) => (
                    <Card
                      sx={{
                        minWidth: 375,
                        margin: "10px",
                        backgroundColor: "#F8F9FA",
                      }}
                      key={result.id}
                    >
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          {ExamTestType[examTest.testType as number]}{" "}
                          {ExamTestSectionType[examTest.sectionType as number]}
                        </Typography>
                        <Typography variant="h5" component="div">
                          {examTest.testname}
                        </Typography>

                        <Typography variant="body2">
                          Score : <b>{result.score}</b>
                          <br />
                          Questions : <b>{result.noQuestion}</b>
                          <br />
                          Date :{" "}
                          <b>{parseISO(result.createdDate).toDateString()}</b>
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          onClick={() => toggleExpanded(index)}
                        >
                          View Details
                        </Button>
                        <Button
                          size="small"
                          onClick={() => toggleFeedback(index)}
                        >
                          Feedbacks
                        </Button>
                        {isOpenFeedback[index] && (
                          <FeedbackManagerModal
                            key={result.id}
                            examResult={result}
                            open={isOpenFeedback[index]}
                            onClose={() => toggleFeedback(index)}
                          ></FeedbackManagerModal>
                        )}
                      </CardActions>
                      <Collapse
                        in={expanded[index]}
                        timeout="auto"
                        unmountOnExit
                        onEntered={() => {
                          if (
                            (examTest as ExamTests).sectionType ==
                            ExamTestSectionType.Writing
                          )
                            setMaxwidthDialog("lg");
                        }}
                      >
                        <CardContent>
                          <ViewUserAnswerDetail
                            key={result.id}
                            examResultId={result.id}
                            examTest={examTest}
                          ></ViewUserAnswerDetail>
                        </CardContent>
                      </Collapse>
                    </Card>
                  ))}
                {examTestResults?.length == 0 && (
                  <h6>
                    <em>No Result(s) to show</em>
                  </h6>
                )}
              </div>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ paddingBottom: "1.25rem" }}>
            <button
              className="btn btn-primary py-2 px-2"
              type="button"
              onClick={onClose}
            >
              Close
            </button>
          </DialogActions>
        </Dialog>
      ) : (
        <p>
          <em>Loading...</em>
        </p>
      )}
    </React.Fragment>
  );
};

export default ViewExamScoreModal;
