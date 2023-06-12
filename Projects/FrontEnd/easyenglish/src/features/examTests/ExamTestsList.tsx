/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetExamTestsBySectionQuery } from "./examTestsApi";
import {
  useGetByUsersQuery,
  useUpdateStatusByUserMutation,
} from "../assignments/assignmentExamsApi";
import {
  ExamTests,
  ExamTestType,
  ExamTestSectionType,
  AssignmentExams,
} from "../../interfaces/interfaces";
import { config } from "../../helpers/contants";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { selectLoggedUser } from "../../services/slices/authSlice";
import { useTypedSelector } from "../../services";

const AssignmentStatus = ({ examId }: any) => {
  const loggedUser = useTypedSelector(selectLoggedUser);
  const [updateAssignmentExam] = useUpdateStatusByUserMutation();
  const { data, isFetching, isLoading, isSuccess, isError, error } =
    useGetByUsersQuery({
      examId: examId,
      userId: loggedUser?.id,
    });
  const [examStatus, setExamStatus] =
    React.useState<Partial<AssignmentExams>>();

  useEffect(() => {
    if (data) {
      setExamStatus(data);
    }
  }, [isLoading]);

  return (
    <ul className="ftco-social text-center">
      <li className="ftco-animate fadeInUp ftco-animated">
        <Link
          placeholder="Start"
          to={config.url.API_URL_FOLDER + "/examTestsView/" + examId}
        >
          <PlayArrowIcon />
        </Link>
      </li>
      {loggedUser && !isLoading ? (
        <React.Fragment>
          <li className="ftco-animate fadeInUp ftco-animated">
            <Link
              to={""}
              placeholder="Favorite"
              onClick={async () => {
                try {
                  const updatedStatus = {
                    ...examStatus,
                    isFavourite: !examStatus?.isFavourite,
                  };
                  await updateAssignmentExam(
                    updatedStatus as AssignmentExams
                  ).unwrap();
                  setExamStatus(updatedStatus);
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              {examStatus?.isFavourite ? (
                <FavoriteIcon />
              ) : (
                <FavoriteBorderIcon />
              )}
            </Link>
          </li>
          <li className="ftco-animate fadeInUp ftco-animated">
            <Link
              to={""}
              placeholder="Bookmark"
              onClick={async () => {
                try {
                  const updatedStatus = {
                    ...examStatus,
                    isBookmarked: !examStatus?.isBookmarked,
                  };
                  await updateAssignmentExam(
                    updatedStatus as AssignmentExams
                  ).unwrap();
                  setExamStatus(updatedStatus);
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              {examStatus?.isBookmarked ? (
                <BookmarkIcon />
              ) : (
                <BookmarkBorderIcon />
              )}
            </Link>
          </li>
          <li className="ftco-animate fadeInUp ftco-animated">
            <Link
              to={""}
              placeholder="Done"
              onClick={async () => {
                try {
                  const updatedStatus = {
                    ...examStatus,
                    isDone: !examStatus?.isDone,
                  };
                  await updateAssignmentExam(
                    updatedStatus as AssignmentExams
                  ).unwrap();
                  setExamStatus(updatedStatus);
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              {examStatus?.isDone ? (
                <CheckCircleIcon />
              ) : (
                <CheckCircleOutlineIcon />
              )}
            </Link>
          </li>
          <li className="ftco-animate fadeInUp ftco-animated">
            <Link to={""} placeholder="Assigned">
              {examStatus?.isAssigned ? <PriorityHighIcon /> : null}
            </Link>
          </li>
        </React.Fragment>
      ) : null}
    </ul>
  );
};

const ExamTestsList = () => {
  const { testType, sectionType } = useParams();
  const [erroMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const loggedUser = useTypedSelector(selectLoggedUser);
  const { data, isFetching, isLoading, isSuccess, isError, error } =
    useGetExamTestsBySectionQuery({
      testType: testType,
      sectionType: sectionType,
    });

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

  return (
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
              <h1 className="mb-2 bread">Test List</h1>
              <p className="breadcrumbs">
                <span className="mr-2">
                  <a href="/">
                    Home <i className="ion-ios-arrow-forward" />
                  </a>
                </span>{" "}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="ftco-section ftco-no-pt">
        <div className="container">
          <div className="row justify-content-center mb-5 pb-2">
            <div className="col-md-8 text-center heading-section ftco-animate fadeInUp ftco-animated">
              <span className="subheading"></span>
              <h2 className="mb-4"></h2>
              <p></p>
            </div>
          </div>
          <div className="row">
            {erroMsg ? (
              <div className="p-2 m-2 text-danger">{erroMsg}</div>
            ) : null}
            {isLoading ? (
              <p>
                <em>Loading...</em>
              </p>
            ) : (
              data &&
              data!.map((exam: ExamTests) => (
                <div
                  key={exam.id}
                  className="col-md-6 col-lg-3 ftco-animate fadeInUp ftco-animated"
                >
                  <div className="staff shadow rounded">
                    <div className="img-wrap d-flex align-items-stretch">
                      <div
                        className="img align-self-stretch"
                        style={{ backgroundImage: "url(images/CamBooks.jpg)" }}
                      />
                    </div>
                    <div className="text pt-3 text-center">
                      <h3>{ExamTestType[exam.testType]}</h3>
                      <span className="position mb-2">
                        {" "}
                        {ExamTestSectionType[exam.sectionType]}
                      </span>
                      <div className="faded">
                        <p>{exam.testname}</p>
                        <p>{exam.title}</p>
                        {loggedUser && (
                          <AssignmentStatus examId={exam.id}></AssignmentStatus>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExamTestsList;
