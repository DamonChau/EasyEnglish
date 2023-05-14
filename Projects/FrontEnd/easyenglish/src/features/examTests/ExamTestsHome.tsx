/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { config } from "../../helpers/contants";
import { ExamTestSectionType, ExamTestType } from "../../interfaces/interfaces";

const ExamTestsHome = () => {
  useEffect(() => {}, []);

  return (
    <section className="ftco-section ftco-no-pt">
      <div className="container">
        <div className="row justify-content-center mb-5 pb-2">
          <div className="col-md-8 text-center heading-section ftco-animate fadeInUp ftco-animated">
            <span className="subheading">IELTS</span>
            <h2 className="mb-4">Our Qualified Doctors</h2>
            <p>
              Separated they live in. A small river named Duden flows by their
              place and supplies it with the necessary regelialia. It is a
              paradisematic country
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
                        to={config.url.API_URL_FOLDER + `/examTestsList/${ExamTestType.IELTS}/${ExamTestSectionType.Reading}`}
                      >
                        <span className="icon-pencil" />
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
                        to={config.url.API_URL_FOLDER + `/examTestsList/${ExamTestType.IELTS}/${ExamTestSectionType.Writing}`}
                      >
                        <span className="icon-pencil" />
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
                        to={config.url.API_URL_FOLDER + `/examTestsList/${ExamTestType.IELTS}/${ExamTestSectionType.Speaking}`}
                      >
                        <span className="icon-pencil" />
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
                        to={config.url.API_URL_FOLDER + `/examTestsList/${ExamTestType.IELTS}/${ExamTestSectionType.Listening}`}
                      >
                        <span className="icon-pencil"/>
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
  );
};

export default ExamTestsHome;
