/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { config } from "../../helpers/contants";
import { ExamTestSectionType, ExamTestType } from "../../interfaces/interfaces";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

const ExamTestsHome = () => {
  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <section
        className="hero-wrap hero-wrap-2"
        style={{ backgroundImage: 'url("images/bg_1.jpg")' }}
        data-stellar-background-ratio="0.5"
      >
        <div className="overlay" />
        <div className="container">
          <div className="row no-gutters slider-text align-items-center justify-content-center">
            <div className="col-md-9 text-center">
              <h1 className="mb-2 bread">Exam Tests</h1>
              <p className="breadcrumbs">
                <span className="mr-2">
                  <a href="/">
                    Home <i className="ion-ios-arrow-forward" />
                  </a>
                </span>
                <span className="mr-2">
                  <a href="/">
                    Exam Tests <i className="ion-ios-arrow-forward" />
                  </a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center mb-5 pb-2">
            <div className="col-md-8 text-center heading-section ftco-animate fadeInUp ftco-animated">
              <span className="subheading">IELTS</span>
              <h2 className="mb-4">IELTS tests</h2>
              <p>
                The International English Language Testing System (IELTS) is a
                globally recognized English language proficiency test. It is
                designed to assess the language skills of individuals who plan
                to study, work, or migrate to countries where English is the
                primary language of communication.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-3 ftco-animate fadeInUp ftco-animated">
              <div className="staff shadow rounded">
                <div className="img-wrap d-flex align-items-stretch">
                  <div
                    className="img align-self-stretch"
                    style={{ backgroundImage: "url(images/CamBooks.jpg)" }}
                  />
                </div>
                <div className="text pt-3 text-center">
                  <h3>Reading</h3>
                  <span className="position mb-2">Cambridge 6-17</span>
                  <div className="faded">
                    <p></p>
                    <ul className="ftco-social text-center">
                      <li className="ftco-animate fadeInUp ftco-animated">
                        <Link
                          to={
                            config.url.API_URL_FOLDER +
                            `/examTestsList/${ExamTestType.IELTS}/${ExamTestSectionType.Reading}`
                          }
                        >
                          <FormatListBulletedIcon />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 ftco-animate fadeInUp ftco-animated">
              <div className="staff shadow rounded">
                <div className="img-wrap d-flex align-items-stretch">
                  <div
                    className="img align-self-stretch"
                    style={{ backgroundImage: "url(images/CamBooks.jpg)" }}
                  />
                </div>
                <div className="text pt-3 text-center">
                  <h3>Writing</h3>
                  <span className="position mb-2">Cambridge 6-17</span>
                  <div className="faded">
                    <p></p>
                    <ul className="ftco-social text-center">
                      <li className="ftco-animate fadeInUp ftco-animated">
                        <Link
                          to={
                            config.url.API_URL_FOLDER +
                            `/examTestsList/${ExamTestType.IELTS}/${ExamTestSectionType.Writing}`
                          }
                        >
                          <FormatListBulletedIcon />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 ftco-animate fadeInUp ftco-animated">
              <div className="staff shadow rounded">
                <div className="img-wrap d-flex align-items-stretch">
                  <div
                    className="img align-self-stretch"
                    style={{ backgroundImage: "url(images/CamBooks.jpg)" }}
                  />
                </div>
                <div className="text pt-3 text-center">
                  <h3>Speaking</h3>
                  <span className="position mb-2">Cambridge 6-17</span>
                  <div className="faded">
                    <p></p>
                    <ul className="ftco-social text-center">
                      <li className="ftco-animate fadeInUp ftco-animated">
                        <Link
                          to={
                            config.url.API_URL_FOLDER +
                            `/examTestsList/${ExamTestType.IELTS}/${ExamTestSectionType.Speaking}`
                          }
                        >
                          <FormatListBulletedIcon />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 ftco-animate fadeInUp ftco-animated">
              <div className="staff shadow rounded">
                <div className="img-wrap d-flex align-items-stretch">
                  <div
                    className="img align-self-stretch"
                    style={{ backgroundImage: "url(images/CamBooks.jpg)" }}
                  />
                </div>
                <div className="text pt-3 text-center">
                  <h3>Listening</h3>
                  <span className="position mb-2">Cambridge 6-17</span>
                  <div className="faded">
                    <p></p>
                    <ul className="ftco-social text-center">
                      <li className="ftco-animate fadeInUp ftco-animated">
                        <Link
                          to={
                            config.url.API_URL_FOLDER +
                            `/examTestsList/${ExamTestType.IELTS}/${ExamTestSectionType.Listening}`
                          }
                        >
                          <FormatListBulletedIcon />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ExamTestsHome;
