/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from "react";
import MyStudent, { UserRelationshipDisplay } from "./MyStudent";
import { ViewExamTestsModal } from "../common/Modals";
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
import { AssignmentExams } from "src/interfaces/interfaces";

const MyStudentDashboard = () => {
  const [openExamTestsModal, setOpenExamTestsModal] = useState(false);
  const [selectedUser, setSelectedUser] =
    React.useState<UserRelationshipDisplay>();
  const [erroMsg, setErrorMsg] = useState("");
  const dispatch = useAppDispatch();
  const [updateAssignmentExams] = useUpdateStatusByUserMutation();

  const handleAssignTask = (user: UserRelationshipDisplay) => {
    setOpenExamTestsModal(true);
    setSelectedUser(user);
  };
  const handleAssignedTest2Student = async (selectedTests: string[]) => {
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
          const updatedAssignmentExam = {...assignmentExam, isAssigned: true}
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
          <div className="row">
            <div className="col-lg-10 bg-light">
              {erroMsg ? (
                <div className="p-2 m-2 text-danger">{erroMsg}</div>
              ) : null}
              <div>
                <MyStudent onAssignTask={handleAssignTask} />
                <ViewExamTestsModal
                  open={openExamTestsModal}
                  onSubmit={handleAssignedTest2Student}
                  onClose={() => setOpenExamTestsModal(false)}
                ></ViewExamTestsModal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyStudentDashboard;
