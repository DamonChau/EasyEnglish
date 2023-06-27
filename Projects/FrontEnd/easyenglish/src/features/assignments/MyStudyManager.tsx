/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from "react";
import { selectLoggedUser } from "../../services/slices/authSlice";
import { useTypedSelector } from "../../services";
import { AssignmentStatus } from "../../models/types";
import ExamTestsByStatus from "../examTests/ExamTestsByStatus";

const MyStudyManager = () => {
  const [status, setStatus] = useState<AssignmentStatus>(
    AssignmentStatus.Favourite
  );
  const loggedUser = useTypedSelector(selectLoggedUser);

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
              <h1 className="mb-2 bread">My Study Manager</h1>
              <p className="breadcrumbs">
                <span className="mr-2">
                  <a href="/">
                    Home <i className="ion-ios-arrow-forward" />
                  </a>
                </span>
                <span className="mr-2">
                  <a href="/">
                    My Study Manager <i className="ion-ios-arrow-forward" />
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
              <span className="subheading">Manage Your Study & Progress</span>
              <h2 className="mb-4">My Study Manager</h2>
              <p>
                To effectively manage your study and progress, it is crucial to
                establish a consistent study schedule and set achievable goals.
                Regularly reviewing your performance, seeking feedback, and
                making necessary adjustments will help you track your progress
                and ensure continuous improvement in your IELTS preparation
              </p>
            </div>
          </div>
          <div className="ftco-departments">
            <div className="row">
              <div className="col-md-12 nav-link-wrap">
                <div
                  className="nav nav-pills d-flex justify-content-center"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <a
                    className="nav-link ftco-animate fadeInUp ftco-animated show"
                    id="v-pills-1-tab"
                    data-toggle="pill"
                    href="#v-pills-1"
                    role="tab"
                    aria-controls="v-pills-1"
                    aria-selected="false"
                    onClick={() => {
                      setStatus(AssignmentStatus.Favourite);
                    }}
                  >
                    Favourite
                  </a>
                  <a
                    className="nav-link ftco-animate fadeInUp ftco-animated show"
                    id="v-pills-2-tab"
                    data-toggle="pill"
                    href="#v-pills-2"
                    role="tab"
                    aria-controls="v-pills-2"
                    aria-selected="false"
                    onClick={() => {
                      setStatus(AssignmentStatus.Bookmarked);
                    }}
                  >
                    Bookmarked
                  </a>
                  <a
                    className="nav-link ftco-animate fadeInUp ftco-animated show"
                    id="v-pills-3-tab"
                    data-toggle="pill"
                    href="#v-pills-3"
                    role="tab"
                    aria-controls="v-pills-3"
                    aria-selected="false"
                    onClick={() => {
                      setStatus(AssignmentStatus.Assigned);
                    }}
                  >
                    Assigned
                  </a>
                  <a
                    className="nav-link ftco-animate fadeInUp ftco-animated show"
                    id="v-pills-4-tab"
                    data-toggle="pill"
                    href="#v-pills-4"
                    role="tab"
                    aria-controls="v-pills-4"
                    aria-selected="false"
                    onClick={() => {
                      setStatus(AssignmentStatus.Done);
                    }}
                  >
                    Done
                  </a>
                </div>
              </div>
              <div className="col-md-12 tab-wrap">
                <div
                  className="tab-content bg-light p-4 p-md-5 ftco-animate fadeInUp ftco-animated"
                  id="v-pills-tabContent"
                >
                  <ExamTestsByStatus status={status} userId={loggedUser?.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default MyStudyManager;
