/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from "react";
import MyStudent, { UserRelationshipDisplay } from "./MyStudent";
import ViewExamTestsModal from "../examTests/ViewExamTestsModal";
import {
  useGetByUsersQuery,
  useAddAssignmentExamsMutation,
  useUpdateStatusByUserMutation,
  assignmentExamsApi,
} from "../assignments/assignmentExamsApi";
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from "../../services/helpers";
import { useAppDispatch } from "../../services/index";
import { AssignmentExams, AssignmentStatus } from "../../models/types";
import Chip from "@mui/material/Chip";
import ExamTestsByStatus from "../examTests/ExamTestsByStatus";

const MyStudentDashboard = () => {
  const [openExamTestsModal, setOpenExamTestsModal] = useState(false);
  const [selectedUser, setSelectedUser] =
    React.useState<UserRelationshipDisplay>();
  const [erroMsg, setErrorMsg] = useState("");
  const dispatch = useAppDispatch();
  const [updateAssignmentExams] = useUpdateStatusByUserMutation();
  const [studentTestStatus, setStudentTestStatus] = useState(AssignmentStatus.Assigned);

  const handleAssignTask = (user: UserRelationshipDisplay) => {
    setOpenExamTestsModal(true);
    setSelectedUser(user);
  };

  const handleStudentProgress = (user: UserRelationshipDisplay) => {
    setSelectedUser(user);
  };

  const handleAssignedTest2Student = async (selectedTests: readonly string[]) => {
    try {
      selectedTests.forEach(async (testId) => {
        const result = dispatch(
          assignmentExamsApi.endpoints.getByUsers.initiate({
            userId: selectedUser?.id,
            examId: testId,
          })
        );
        const assignmentExam = await result.unwrap();
        if (assignmentExam) {
          const updatedAssignmentExam = { ...assignmentExam, isAssigned: true };
          await updateAssignmentExams(updatedAssignmentExam).unwrap();
        }
      });
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
      <section
        className="hero-wrap hero-wrap-2"
        style={{ backgroundImage: 'url("images/bg_1.jpg")' }}
        data-stellar-background-ratio="0.5"
      >
        <div className="overlay" />
        <div className="container">
          <div className="row no-gutters slider-text align-items-center justify-content-center">
            <div className="col-md-9 text-center">
              <h1 className="mb-2 bread">Student Manager</h1>
              <p className="breadcrumbs">
                <span className="mr-2">
                  <a href="/">
                    Home <i className="ion-ios-arrow-forward" />
                  </a>
                </span>{" "}
                <span>
                  Student Manager
                  <i className="ion-ios-arrow-forward" />
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="ftco-section">
        <div className="container">
          {erroMsg ? (
            <div className="p-2 m-2 text-danger">{erroMsg}</div>
          ) : null}
          <div className="row">
            <div className="col-lg-10 bg-light">
              <div>
                <MyStudent
                  onAssignTask={handleAssignTask}
                  onViewStudentProgress={handleStudentProgress}
                />
                <ViewExamTestsModal
                  open={openExamTestsModal}
                  onSubmit={handleAssignedTest2Student}
                  onClose={() => setOpenExamTestsModal(false)}
                ></ViewExamTestsModal>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-10 bg-light mt-2">
              <div className="d-flex justify-content-center align-items-start m-2">
                <Chip
                  onClick={() => setStudentTestStatus(AssignmentStatus.Assigned)}
                  label="Assigned"
                  color={studentTestStatus == AssignmentStatus.Assigned ? "success": "default"}
                  className="mr-2"
                />
                 <Chip
                  onClick={() => setStudentTestStatus(AssignmentStatus.Done)}
                  label="Done"
                  color={studentTestStatus == AssignmentStatus.Done ? "success": "default"}
                />
              </div>
              <div>
                <ExamTestsByStatus status={studentTestStatus} userId={selectedUser?.id}></ExamTestsByStatus>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyStudentDashboard;
