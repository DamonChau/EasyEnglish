/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { QuestionDetails, QuestionType } from "../../interfaces/interfaces";

const QuestionAnswerReadingDetails = ({
  question,
  questionDetails,
  handleFieldChange,
}: any) => {
  const handleChange = React.useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      qd: QuestionDetails
    ) => {
      const updatedValue = {
        ...qd,
        questionDetailId: e.target.id,
        answer: e.target.value.trim(),
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
    if (questionType === QuestionType.SingleAnswer) {
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
              onChange={(e) => handleChange(e, qd)}
            />
          </div>
        ))
      );
      //multiple-singleanwser
    } else if (questionType === QuestionType.MASingleChoice) {
      return (
        questionDetails &&
        questionDetails.map((qd: QuestionDetails) => (
          <div className="form-check" key={qd.id}>
            <input
              className="form-check-input"
              type="radio"
              id={qd.id}
              name={qd.questionId}
              onChange={(e) => handleChange(e, qd)}
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
              name={qd.questionId}
              onChange={(e) => handleChange(e, qd)}
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
