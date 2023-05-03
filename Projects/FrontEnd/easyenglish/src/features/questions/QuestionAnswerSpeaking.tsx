/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useTypedSelector } from "../../services";
import { selectLoggedUser } from "../../services/slices/authSlice";
import { UserAnswers } from "../../interfaces/interfaces";
import isUUID from "validator/lib/isUUID";
import Snackbar from "@mui/material/Snackbar";
import { useGetQuestionsWithQDQuery } from "./questionsApi";
import {
  useAddUserAnswerMutation,
  useUploadFilesMutation,
  useDownloadFilesMutation,
} from "../users/userAnswersApi";
import { useAddExamResultMutation } from "../examResult/examResultApi";
import { v4 as uuidv4 } from "uuid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Alert } from "../common/Modals";
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from "../../services/helpers";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "transparent",
  boxShadow: "none",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const QuestionAnswerSpeaking = ({ testId }: any) => {
  const [isView, setView] = React.useState(false);
  const { data, isFetching, isLoading, isSuccess, isError, error } =
    useGetQuestionsWithQDQuery(testId, { skip: !isView });
  const [
    addUserAnswer,
    { isLoading: isAddUALoading, isError: isAddUAError, error: errorUAAdd },
  ] = useAddUserAnswerMutation();
  const [
    uploadFile,
    { isLoading: isAddUFLoading, isError: isAddUFError, error: errorUFAdd },
  ] = useUploadFilesMutation();
  const [
    downloadFile,
    { isLoading: isAddDFLoading, isError: isAddDFError, error: errorDFAdd },
  ] = useDownloadFilesMutation();
  const [
    addExamResult,
    { isLoading: isAddERLoading, isError: isAddERError, error: errorERAdd },
  ] = useAddExamResultMutation();

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

  const [open, setOpen] = React.useState(false);

  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState<MediaStream>(new MediaStream());
  const [audio, setAudio] = useState("");
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [blobData, setBlobData] = useState<Blob>();
  const [erroMsg, setErrorMsg] = useState("");

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

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(mediaStream as MediaStream);
      } catch (err: any) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = async () => {
    setRecordingStatus("recording");
    const options = {
      mimeType: "audio/webm",
    };
    const media: MediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.current! = media;

    mediaRecorder.current.start();

    const localAudioChunks: Blob[] = [];

    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };

    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    setRecordingStatus("inactive");
    const options = {
      type: "audio/webm",
    };

    mediaRecorder.current!.stop();

    mediaRecorder.current!.onstop = () => {
      const audioBlob = new Blob(audioChunks, options);
      const audioUrl = URL.createObjectURL(audioBlob);
      setBlobData(audioBlob);
      setAudio(audioUrl);
      setAudioChunks([]);
    };
  };

  const handleSubmit = async () => {
    try {
      if (data) {
        data.forEach(async (question) => {
          question.questionDetails.forEach(async (qd) => {
            const ts = await addExamResult(testResult).unwrap();

            const newFile = new FormData();
            const fileName = ts.id + ".weba";
            newFile.append("file", blobData as Blob, fileName);
            await uploadFile(newFile).unwrap();

            const updatedUserAnswer = {
              ...userAnswer,
              questionDetailId: qd.id,
              examResultId: ts.id,
              answer: fileName,
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
        <div className="card rounded-12 w-50">
          <h5 className="card-header h5">Recoring Your Answer</h5>
          <div className="card-body">
            <div className="row d-flex justify-content-left mb-2">
              {erroMsg ? (
                <div className="p-2 m-2 text-danger">{erroMsg}</div>
              ) : null}
              <div className="col-md-8 col-lg-12">
                {audio ? (
                  <audio
                    src={audio}
                    controls
                    className="question-answer-speaking-audio"
                  ></audio>
                ) : null}
              </div>
            </div>
            <div className="row d-flex justify-content-left">
              <div className="col-md-8 col-lg-12">
                {!permission ? (
                  <button
                    className="btn btn-primary py-1 px-2"
                    onClick={getMicrophonePermission}
                    type="button"
                  >
                    Get Microphone
                  </button>
                ) : null}

                {permission && recordingStatus === "inactive" ? (
                  <button
                    className="btn btn-primary py-1 px-2"
                    onClick={startRecording}
                    type="button"
                  >
                    Start Recording
                  </button>
                ) : null}
                {recordingStatus === "recording" ? (
                  <button
                    className="btn btn-primary py-1 px-2"
                    onClick={stopRecording}
                    type="button"
                  >
                    Stop Recording
                  </button>
                ) : null}
                {audio ? (
                  <button
                    className="btn btn-primary py-1 px-2 ml-2"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default QuestionAnswerSpeaking;
