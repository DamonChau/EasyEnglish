/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./features/common/Header";
import Footer from "./features/common/Footer";
import Home from "./features/common/Home";
import Login from "./features/common/Login";
import ExamTestsDetail from "./features/examTests/ExamTestsDetail";
import ExamTestsManager from "./features/examTests/ExamTestsManager";
import ExamTestsView from "./features/examTests/ExamTestsView";
import ExamTestsList from "./features/examTests/ExamTestsList";
import QuestionManager from "./features/questions/QuestionManager";
import PrivateRoute from "./features/common/PrivateRoute";
import UnAuthorized from "./features/common/UnAuthorized";
import NewUserAccount from "./features/users/NewUserAccount";
import UserManager from "./features/users/UserManager";
import MyTeacherDashboard from "./features/users/MyTeacherDashboard";
import MyStudentDashboard from "./features/users/MyStudentDashboard";
import MyStudyManager from "./features/assignments/MyStudyManager";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./App.css";
import { UserType } from "./interfaces/interfaces";

function withRouter(Component: any) {
  function ComponentWithRouterProp(props: any) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

const App = (props: any) => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/examTestsView/:id/" element={<ExamTestsView />} />
          <Route
            path="/examTestsList/:testType/:sectionType"
            element={<ExamTestsList />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<UnAuthorized />} />
          <Route path="/register" element={<NewUserAccount />} />
          <Route element={<PrivateRoute allowRoles={[UserType.Admin]} />}>
            <Route path="/examTestsManager" element={<ExamTestsManager />} />
            <Route path="/examTestsDetail/:id/" element={<ExamTestsDetail />} />
            <Route path="/examTestsDetail/add/" element={<ExamTestsDetail />} />
            <Route
              path="/questionManager/:examTestId/"
              element={<QuestionManager />}
            />
            <Route path="/userManager" element={<UserManager />} />
          </Route>
          <Route
            element={
              <PrivateRoute
                allowRoles={[UserType.Admin, UserType.Leaner, UserType.Teacher]}
              />
            }
          >
            <Route path="/accountSetting/:id" element={<NewUserAccount />} />
            <Route path="/myStudy/" element={<MyStudyManager />} />
            <Route path="/myTeacher/" element={<MyTeacherDashboard />} />
            <Route path="/myStudent/" element={<MyStudentDashboard />} />
          </Route>
          <Route
            element={
              <PrivateRoute allowRoles={[UserType.Admin, UserType.Leaner]} />
            }
          >
            <Route path="/myStudy/" element={<MyStudyManager />} />
            <Route path="/myTeacher/" element={<MyTeacherDashboard />} />
          </Route>
          <Route element={<PrivateRoute allowRoles={[UserType.Teacher]} />}>
            <Route path="/myStudent/" element={<MyStudentDashboard />} />
          </Route>
        </Routes>
        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default App;
