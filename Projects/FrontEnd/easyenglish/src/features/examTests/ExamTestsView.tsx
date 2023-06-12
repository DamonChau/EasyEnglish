/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetExamTestQuery } from "./examTestsApi";
import isUUID from "validator/lib/isUUID";
import draftToHtml from "draftjs-to-html";
import QuestionAnswerReading from "../questions/QuestionAnswerReading";
import QuestionAnswerWriting from "../questions/QuestionAnswerWriting";
import QuestionAnswerSpeaking from "../questions/QuestionAnswerSpeaking";
import {
  useDownloadFilesMutation,
  FileDownload,
} from "../users/userAnswersApi";
import StopWatch from "../common/StopWatch";
import { PostComment } from "../comments/PostComment";
import { PostNotes } from "../userNotes/PostNotes";
import { useTypedSelector } from "../../services";
import {
  selectLoggedUser,
  selectIsAuthenticated,
} from "../../services/slices/authSlice";
import { ExamResults, ExamTestSectionType } from "../../interfaces/interfaces";
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from "../../services/helpers";

const ExamTestsView = () => {
  const { id } = useParams();
  const [isView, setView] = useState(false);
  const [convertedContent, setConvertedContent] = useState("");
  const { data, isFetching, isLoading, isSuccess, isError, error } =
    useGetExamTestQuery(id!, { skip: !isView });
  const [
    downloadFile,
    { isLoading: isAddDFLoading, isError: isAddDFError, error: errorDFAdd },
  ] = useDownloadFilesMutation();
  const [audio, setAudio] = useState("");
  const loggedUser = useTypedSelector(selectLoggedUser);
  const isAuthenticated = useTypedSelector(selectIsAuthenticated);
  const [erroMsg, setErrorMsg] = useState("");
  const [testResult, setTestResult] = useState<ExamResults>();

  useEffect(() => {
    if (id && isUUID(id)) {
      setView(true);
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      setConvertedContent(draftToHtml(JSON.parse(data?.content as string)));

      if (data.audioFile) {
        const downloadAudiofiles = async () => {
          const file: FileDownload = {
            filename: data.audioFile,
          };
          try {
            const url = await downloadFile(file).unwrap();
              setAudio(url);
          } catch (err) {
            if (isFetchBaseQueryError(err)) {
              const msg = "error" in err ? err.error : JSON.parse(JSON.stringify(err.data)).error;
              setErrorMsg(msg);
            } else if (isErrorWithMessage(err)) console.log(err.message);
          }
        };

        downloadAudiofiles();
      }
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

  const handleExamResultDone = (r: ExamResults) => {
    setTestResult(r);
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <p>
          <em>Loading...</em>
        </p>
      ) : (
        <div>
          <section
            className="hero-wrap hero-wrap-2"
            style={{ backgroundImage: 'url("images/bg_1.jpg")' }}
            data-stellar-background-ratio="0.5"
          >
            <div className="overlay" />
            <div className="container">
              <div className="row no-gutters slider-text align-items-center justify-content-center">
                <div className="col-md-9 text-center">
                  <h1 className="mb-2 bread">Exam Test</h1>
                  <p className="breadcrumbs">
                    <span className="mr-2">
                      <a href="/">
                        Home <i className="ion-ios-arrow-forward" />
                      </a>
                    </span>{" "}
                    <span>
                      {data?.testname}
                      <i className="ion-ios-arrow-forward" />
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="ftco-section">
            <div className="container">
              <div className="row">
                {erroMsg ? (
                  <div className="p-2 m-2 text-danger">{erroMsg}</div>
                ) : null}
                <div className="col-lg-8">
                  <h2 className="mb-3">{data?.title}</h2>
                  <div className="mb-3">
                    {audio ? (
                      <audio
                        src={audio}
                        controls
                        className="question-answer-speaking-audio"
                      ></audio>
                    ) : null}
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: convertedContent }}
                  ></div>
                  <div className="pt-2">
                    {data?.sectionType == ExamTestSectionType.Writing ? (
                      <QuestionAnswerWriting testId={data?.id} />
                    ) : data?.sectionType == ExamTestSectionType.Speaking ? (
                      <QuestionAnswerSpeaking testId={data?.id} />
                    ) : null}
                  </div>
                  <div>
                    {isSuccess ? (
                      <div className="pt-3">
                        <nav>
                          <div
                            className="nav nav-tabs"
                            id="nav-tab"
                            role="tablist"
                          >
                            <button
                              className="nav-link active"
                              id="nav-comments-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#nav-comments"
                              type="button"
                              role="tab"
                              aria-controls="nav-comments"
                              aria-selected="true"
                            >
                              Comments
                            </button>
                            <button
                              className="nav-link"
                              id="nav-notes-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#nav-notes"
                              type="button"
                              role="tab"
                              aria-controls="nav-notes"
                              aria-selected="false"
                              disabled={!isAuthenticated ? true : false}
                            >
                              Notes
                            </button>
                          </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                          <div
                            className="tab-pane fade show active"
                            id="nav-comments"
                            role="tabpanel"
                            aria-labelledby="nav-comments-tab"
                          >
                            <PostComment key={data?.id} examTestId={data?.id} />
                          </div>

                          <div
                            className="tab-pane fade"
                            id="nav-notes"
                            role="tabpanel"
                            aria-labelledby="nav-notes-tab"
                          >
                            {testResult ? (
                              <PostNotes
                                key={testResult.id}
                                examResultId={testResult.id}
                              />
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col-lg-4 sidebar ftco-animate fadeInUp ftco-animated">
                  <div className="sidebar-box ftco-animate fadeInUp ftco-animated">
                    {isSuccess ? <StopWatch /> : null}
                  </div>
                  <div className="sidebar-box ftco-animate fadeInUp ftco-animated">
                    {data?.sectionType == ExamTestSectionType.Listening || data?.sectionType == ExamTestSectionType.Reading ? (
                      <QuestionAnswerReading
                        testId={data?.id}
                        onGetExamResult={handleExamResultDone}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </React.Fragment>
  );
};

export default ExamTestsView;
