/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetLessonQuery } from "./lessonApi";
import isUUID from "validator/lib/isUUID";
import draftToHtml from "draftjs-to-html";

const LessonView = () => {
  const { id } = useParams();
  const [isView, setView] = useState(false);
  const [convertedContent, setConvertedContent] = useState("");
  const { data, isFetching, isLoading, isSuccess, isError, error } =
    useGetLessonQuery(id!, { skip: !isView });
  const [erroMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (id && isUUID(id)) {
      setView(true);
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      setConvertedContent(draftToHtml(JSON.parse(data?.content as string)));
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      if ("status" in error) {
        // you can access all properties of `FetchBaseQueryError` here
        const msg = "error" in error ? error.error : JSON.stringify(error.data);
        setErrorMsg(msg);
      } else {
        // you can access all properties of `SerializedError` here
        setErrorMsg(error.message as string);
      }
    }
  }, [isError]);

  return (
    <React.Fragment>
      {isLoading ? (
        <p>
          <em>Loading...</em>
        </p>
      ) : (
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
                  <h1 className="mb-2 bread">Exam Test</h1>
                  <p className="breadcrumbs">
                    <span className="mr-2">
                      <a href="/">
                        Home <i className="ion-ios-arrow-forward" />
                      </a>
                    </span>{" "}
                    <span>
                      {data?.lessonName}
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
                {erroMsg ? (
                  <div className="p-2 m-2 text-danger">{erroMsg}</div>
                ) : null}
                <div className="col-lg-8">
                  <h2 className="mb-3">{data?.title}</h2>

                  <div
                    dangerouslySetInnerHTML={{ __html: convertedContent }}
                  ></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </React.Fragment>
  );
};

export default LessonView;
