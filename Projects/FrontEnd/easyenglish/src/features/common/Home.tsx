/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from "react";
import ExamTestsHome from "../examTests/ExamTestsHome";
import LessonHome from "../lessons/LessonHome";

const Home = () => {
  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <ExamTestsHome />
      <LessonHome />
    </React.Fragment>
  );
};

export default Home;
