/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { QuestionDetails } from "../../interfaces/interfaces";
import { useTypedSelector } from "../../services";
import {
  selectLoggedUser,
  selectIsAuthenticated,
} from "../../services/slices/authSlice";

const QuestionAnswerReadingDetails = ({
  question,
  questionDetails,
  handleFieldChange,
}: any) => {
  const loggedUser = useTypedSelector(selectLoggedUser);
  const isAuthenticated = useTypedSelector(selectIsAuthenticated);
  //UserAnswersDisplay
  const initialValue = {
    id: undefined,
    answer: "",
    result: -1,
    userId: isAuthenticated ? loggedUser!.id : undefined,
    questionDetailId: undefined,
    status: 1,
    order: 0,
    answerOrg: "",
  };

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const updatedValue = {
        ...initialValue,
        questionDetailId: e.target.name,
        answer: e.target.value,
      };
      handleFieldChange(updatedValue);
    },
    []
  );

  function replaceWithBr(qd: QuestionDetails) {
    return qd?.content.replace(/\n/g, "<br />");
  }

  const renderDetails = (questionDetails: any, questionType: any) => {
    //single
    if (questionType === 1) {
      return (
        questionDetails &&
        questionDetails.map((qd: QuestionDetails) => (
          <div key={qd.id}>
            <p dangerouslySetInnerHTML={{ __html: replaceWithBr(qd) }} />
            <input
              className="form-control"
              type="text"
              id={qd.id}
              name={qd.id}
              onChange={handleChange}
              required
            />
          </div>
        ))
      );
      //multiple-singleanwser
    } else if (questionType === 2) {
      return (
        questionDetails &&
        questionDetails.map((qd: QuestionDetails) => (
          <div className="form-check" key={qd.id}>
            <input
              className="form-check-input"
              type="radio"
              id={qd.id}
              name={questionType}
              onChange={handleChange}
              required
            />
            <label
              className="form-check-label"
              htmlFor={qd.id}
              dangerouslySetInnerHTML={{ __html: replaceWithBr(qd) }}
            ></label>
          </div>
        ))
      );
      //multiple-multipleanwser
    } else {
      return (
        questionDetails &&
        questionDetails.map((qd: QuestionDetails) => (
          <div className="form-check" key={qd.id}>
            <input
              className="form-check-input"
              type="checkbox"
              id={qd.id}
              name={questionType}
              onChange={handleChange}
              required
            />
            <label
              className="form-check-label"
              htmlFor={qd.id}
              dangerouslySetInnerHTML={{ __html: replaceWithBr(qd) }}
            ></label>
          </div>
        ))
      );
    }
  };

  return <div>{renderDetails(questionDetails, question.questionType)}</div>;
};

export default QuestionAnswerReadingDetails;
