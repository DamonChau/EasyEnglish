/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import { Comments } from "../../interfaces/interfaces";
import { v4 as uuidv4 } from "uuid";
import {
  selectLoggedUser,
  selectIsAuthenticated,
} from "../../services/slices/authSlice";
import { useTypedSelector } from "../../services";
import {
  useAddCommentMutation,
  useGetAllCommentsByExamQuery,
} from "../comments/commentApi";
import { parseISO } from "date-fns";
import isUUID from "validator/es/lib/isUUID";

const PostCommentForm = ({ loggedUser, examTestId, onSave, parentId }: any) => {
  const initial = {
    id: uuidv4(),
    content: "",
    createdBy: loggedUser ? loggedUser!.id : uuidv4(),
    examTestId: examTestId,
    parentId: parentId,
  };

  const [comment, setComment] = React.useState<Partial<Comments>>(initial);
  const onSubmit = () => {
    onSave(comment);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment((prev) => ({
      ...comment,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="w-50">
      <div className="form-group row">
        <input type="hidden" name="id" value={comment.id} />
      </div>
      <div className="d-flex">
        <input
          type="text"
          className="form-control rounded"
          name="content"
          placeholder="message"
          onChange={handleChange}
          value={comment.content}
        />
        <IconButton
          aria-label="Post"
          size="small"
          onClick={onSubmit}
          disabled={!loggedUser ? true : false}
        >
          <SendIcon color="primary" />
        </IconButton>
      </div>
    </div>
  );
};

const PostList = ({ loggedUser, examTestId, data, onSave }: any) => {
  return (
    data &&
    data?.map((c: Comments) => (
      <li className="comment" key={c.id}>
        <div className="vcard bio">
          <img src="images/person_1.jpg" alt="Image placeholder"></img>
        </div>
        <div className="comment-body">
          <h3>{c.createdByNavigation.userName}</h3>
          <div className="meta mb-2">
            {parseISO(c.createdDate).toDateString()}
          </div>
          <p>{c.content}</p>
          <p>
            <a
              className="reply"
              data-toggle="collapse"
              href={loggedUser ? "#_" + c.id : "#"}
              role="button"
              aria-expanded="false"
              aria-controls={c.id}
            >
              reply
            </a>
          </p>
          <div className="collapse" id={"_" + c.id}>
            <PostCommentForm
              loggedUser={loggedUser}
              examTestId={examTestId}
              onSave={onSave}
              parentId={c.id}
            />
          </div>
        </div>
        <ul className="children">
          {c.inverseParent && (
            <PostList
              loggedUser={loggedUser}
              examTestId={examTestId}
              data={c.inverseParent}
              onSave={onSave}
            />
          )}
        </ul>
      </li>
    ))
  );
};

export const PostComment = ({ examTestId }: any) => {
  const [isView, setView] = useState(false);
  const loggedUser = useTypedSelector(selectLoggedUser);
  const isAuthenticated = useTypedSelector(selectIsAuthenticated);
  const { data, isFetching, isLoading, isSuccess, isError, error } =
    useGetAllCommentsByExamQuery(examTestId, { skip: !isView });
  const [erroMsg, setErrorMsg] = useState("");

  const [
    addComment,
    { isLoading: isAddLoading, isError: isAddError, error: errorAdd },
  ] = useAddCommentMutation();

  useEffect(() => {
    if (examTestId && isUUID(examTestId)) {
      setView(true);
    }
  }, [examTestId]);

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

  const onSave = async (comment: Comments) => {
    try {
      if (comment.content?.length! > 0) {
        await addComment(comment).unwrap();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <p>
          <em>Loading...</em>
        </p>
      ) : (
        <div>
          {isError ? (
            <div className="p-2 m-2 text-danger">{erroMsg}</div>
          ) : null}
          <div className="comment-form-wrap pt-5">
            <h3 className="mb-5 h4 font-weight-bold">Leave a comment</h3>
            <PostCommentForm
              loggedUser={loggedUser}
              examTestId={examTestId}
              onSave={onSave}
            />
          </div>
          <div className="pt-3 mt-2">
            <h3 className="mb-5 h4 font-weight-bold">
              {data?.length} Comments
            </h3>
            <ul className="comment-list">
              {isLoading ? (
                <p>
                  <em>Loading...</em>
                </p>
              ) : (
                <PostList
                  loggedUser={loggedUser}
                  examTestId={examTestId}
                  data={data}
                  onSave={onSave}
                />
              )}
            </ul>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
