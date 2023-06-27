/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { config } from "../../helpers/contants";
import { LessonType } from "../../models/types";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

const LessonHome = () => {
  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center mb-5 pb-2">
            <div className="col-md-8 text-center heading-section ftco-animate fadeInUp ftco-animated">
              <h2 className="mb-4">Lessons</h2>
              <p>
                English lessons offer an immersive and interactive learning
                experience, equipping students with the essential skills and
                confidence to communicate effectively in the global language of
                business, travel, and academia.
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
                  <h3>Pronunnciation</h3>
                  <div className="faded">
                    <p></p>
                    <ul className="ftco-social text-center">
                      <li className="ftco-animate fadeInUp ftco-animated">
                        <Link
                          to={
                            config.url.API_URL_FOLDER +
                            `/lessonList/${LessonType.Pronunnciation}`
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
                  <h3>Grammar</h3>
                  <div className="faded">
                    <p></p>
                    <ul className="ftco-social text-center">
                      <li className="ftco-animate fadeInUp ftco-animated">
                        <Link
                          to={
                            config.url.API_URL_FOLDER +
                            `/lessonList/${LessonType.Grammar}`
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
                  <h3>General</h3>
                  <div className="faded">
                    <p></p>
                    <ul className="ftco-social text-center">
                      <li className="ftco-animate fadeInUp ftco-animated">
                        <Link
                          to={
                            config.url.API_URL_FOLDER +
                            `/lessonList/${LessonType.General}`
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
                  <h3>IELTSTips</h3>
                  <div className="faded">
                    <p></p>
                    <ul className="ftco-social text-center">
                      <li className="ftco-animate fadeInUp ftco-animated">
                        <Link
                          to={
                            config.url.API_URL_FOLDER +
                            `/lessonList/${LessonType.IELTSTips}`
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

export default LessonHome;
