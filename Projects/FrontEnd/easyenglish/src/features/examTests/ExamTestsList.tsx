/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetExamTestsBySectionQuery } from "./examTestsApi";
import {
  ExamTests,
  ExamTestType,
  ExamTestSectionType,
} from "../../interfaces/interfaces";
import { config, findArrayElementById } from "../../helpers/contants";

const ExamTestsList = () => {
  const { testType, sectionType } = useParams();
  const [erroMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
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
              <h1 className="mb-2 bread"></h1>
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
              data &&  data!.map((exam: ExamTests) => (
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
                      <h3>
                        {findArrayElementById(ExamTestType, exam.testType).name}
                      </h3>
                      <span className="position mb-2">
                        {" "}
                        {
                          findArrayElementById(
                            ExamTestSectionType,
                            exam.sectionType
                          ).name
                        }
                      </span>
                      <div className="faded">
                        <p>{exam.testname}</p>
                        <p>{exam.title}</p>
                        <ul className="ftco-social text-center">
                          <li className="ftco-animate fadeInUp ftco-animated">
                            <Link
                              to={
                                config.url.API_URL_FOLDER +
                                "/examTestsView/" +
                                exam.id
                              }
                            >
                              <span
                                className="icon-pencil"
                                title="Start New Test"
                              />
                            </Link>
                          </li>
                        </ul>
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
