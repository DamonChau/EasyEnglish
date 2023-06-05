/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { selectLoggedUser } from "../../services/slices/authSlice";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  Questions,
  QuestionType,
  QuestionDetails,
  Status,
} from "../../interfaces/interfaces";
import { parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../services";
import {
  useGetQuestionsQuery,
  QuestionsResponse,
  useDeleteQuestionMutation,
  useAddQuestionMutation,
  useUpdateQuestionMutation,
} from "./questionsApi";
import {
  useGetQuestionDetailsQuery,
  useDeleteQuestionDetailMutation,
  useAddQuestionDetailMutation,
  useUpdateQuestionDetailMutation,
} from "./questionDetailsApi";
import isUUID from "validator/lib/isUUID";
import {
  CreateNewQuestionModal,
  CreateNewQuestionDetailModal,
} from "../common/Modals";
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from "../../services/helpers";

//#region Style
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
//#endregion

//#region QuestionDetails - Detail Table
const QuestionTableRow = ({
  question,
  onEditQuestion,
  onDeleteQuestion,
  loggedUser,
}: any) => {
  const [open, setOpen] = useState(false);
  const { data, isFetching, isLoading, isSuccess, isError, error } =
    useGetQuestionDetailsQuery(question.id as string);

  const [erroMsg, setErrorMsg] = useState("");
  const [isEditing, setEditing] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const initialValue = {
    id: undefined,
    order: 1,
    content: "",
    answer: "",
    createdBy: loggedUser!.id,
    questionId: question.id,
  };
  const [currentQD, setCurrentQD] =
    React.useState<Partial<QuestionDetails>>(initialValue);

  //#region questionDetails
  const [deleteQuestionDetail] = useDeleteQuestionDetailMutation();
  const [addQuestionDetail] = useAddQuestionDetailMutation();
  const [updateQuestionDetail] = useUpdateQuestionDetailMutation();
  //#endregion

  useEffect(() => {
    if (currentQD.id != undefined && isUUID(currentQD.id)) {
      setEditing(true);
    }
  }, [currentQD.id]);

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

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCreateNewQuesionDetail = async (q: QuestionDetails) => {
    try {
      isEditing
        ? await updateQuestionDetail(q).unwrap()
        : await addQuestionDetail(q).unwrap();
      setCurrentQD(initialValue);
      setEditing(false);
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

  const handleEditQuestionDetail = (q: QuestionDetails) => {
    setCurrentQD(q);
    setOpenAdd(true);
  };

  const handleDeleteQuestionDetail = async (q: QuestionDetails) => {
    if (!window.confirm("Do you want to delete info with Id: " + q.id)) return;
    else {
      try {
        await deleteQuestionDetail(q.id).unwrap();
      } catch (err) {
        if (isFetchBaseQueryError(err)) {
          const msg =
            "error" in err
              ? err.error
              : JSON.parse(JSON.stringify(err.data)).error;
          setErrorMsg(msg);
        } else if (isErrorWithMessage(err)) console.log(err.message);
      }
    }
  };

  const onViewDetail = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      {erroMsg ? <div className="p-2 m-2 text-danger">{erroMsg}</div> : null}
      <StyledTableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        key={question.id}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => onViewDetail()}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <StyledTableCell align="left">{question.order}</StyledTableCell>
        <StyledTableCell align="left">{question.title}</StyledTableCell>
        <StyledTableCell align="left">{question.content}</StyledTableCell>
        <StyledTableCell align="left">{question.description}</StyledTableCell>
        <StyledTableCell align="left">
          {QuestionType[question.questionType]}
        </StyledTableCell>
        <StyledTableCell align="left">
          {Status[question.status]}
        </StyledTableCell>
        <StyledTableCell align="left">
          {parseISO(question.createdDate).toDateString()}
        </StyledTableCell>
        <StyledTableCell align="left">
          <IconButton
            aria-label="Edit"
            size="small"
            onClick={() => onEditQuestion(question)}
          >
            <EditIcon />
          </IconButton>
        </StyledTableCell>
        <StyledTableCell align="left">
          <IconButton
            aria-label="Delete"
            size="small"
            onClick={() => onDeleteQuestion(question)}
          >
            <DeleteIcon />
          </IconButton>
        </StyledTableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {isLoading ? (
              <p>
                <em>Loading...</em>
              </p>
            ) : (
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Question Details
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Order</TableCell>
                      <TableCell>Content</TableCell>
                      <TableCell align="right">Answer</TableCell>
                      <TableCell align="right">CreatedDate</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data &&
                      data!.map((qd: QuestionDetails) => (
                        <TableRow key={qd.id}>
                          <TableCell component="th" scope="row">
                            {qd.order}
                          </TableCell>
                          <TableCell>{qd.content}</TableCell>
                          <TableCell align="right">{qd.answer}</TableCell>
                          <TableCell align="right">
                            {parseISO(qd.createdDate).toDateString()}
                          </TableCell>
                          <TableCell align="left">
                            <IconButton
                              aria-label="Edit"
                              size="small"
                              onClick={() => handleEditQuestionDetail(qd)}
                            >
                              <EditIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell align="left">
                            <IconButton
                              aria-label="Delete"
                              size="small"
                              onClick={() => handleDeleteQuestionDetail(qd)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                <IconButton
                  aria-label="Add"
                  size="small"
                  onClick={handleOpenAdd}
                >
                  <AddIcon />
                </IconButton>
                <CreateNewQuestionDetailModal
                  key={currentQD.id}
                  questionDetail={currentQD}
                  open={openAdd}
                  onClose={() => setOpenAdd(false)}
                  onSubmit={handleCreateNewQuesionDetail}
                ></CreateNewQuestionDetailModal>
              </Box>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

//#endregion

const QuestionManager = () => {
  const { examTestId } = useParams();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const loggedUser = useTypedSelector(selectLoggedUser);
  const navigate = useNavigate();
  const [erroMsg, setErrorMsg] = useState("");

  //#region questions
  const {
    data: questionList,
    isFetching,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetQuestionsQuery(examTestId as string);
  const [deleteQuestion] = useDeleteQuestionMutation();
  const [
    addQuestion,
    { isLoading: isAddLoading, isError: isAddError, error: errorAdd },
  ] = useAddQuestionMutation();
  const [
    updateQuestion,
    { isLoading: isUpdateLoading, isError: isUpdateError, error: errorUpdate },
  ] = useUpdateQuestionMutation();

  const initialValue = {
    id: undefined,
    order: 1,
    title: "",
    content: "",
    description: "",
    questionType: QuestionType.SingleAnswer,
    status: 1,
    createdBy: loggedUser!.id,
    examTestId: examTestId,
  };
  const [currentQuestion, setCurrentQuestion] =
    React.useState<Partial<Questions>>(initialValue);

  const [isEditing, setEditing] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  //#endregion

  //#region useEffect
  useEffect(() => {
    if (
      examTestId != undefined &&
      currentQuestion.id &&
      isUUID(currentQuestion.id)
    ) {
      setEditing(true);
    }
  }, [currentQuestion.id]);

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

  //#endregion

  //#region Event
  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCreateNewQuesion = async (q: Questions) => {
    try {
      isEditing
        ? await updateQuestion(q).unwrap()
        : await addQuestion(q).unwrap();
      setCurrentQuestion(initialValue);
      setEditing(false);
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

  const handleEditQuestion = (q: Questions) => {
    setCurrentQuestion(q);
    setOpenAdd(true);
  };

  const handleDeleteQuestion = async (q: Questions) => {
    if (!window.confirm("Do you want to delete info with Id: " + q.title))
      return;
    else {
      try {
        await deleteQuestion(q.id).unwrap();
      } catch (err) {
        if (isFetchBaseQueryError(err)) {
          const msg =
            "error" in err
              ? err.error
              : JSON.parse(JSON.stringify(err.data)).error;
          setErrorMsg(msg);
        } else if (isErrorWithMessage(err)) console.log(err.message);
      }
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  //#endregion

  //#region Render
  function renderQuestionList(questions: QuestionsResponse) {
    return (
      <div>
        <div className="clearfix">
          <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Detail</StyledTableCell>
                      <StyledTableCell>Order</StyledTableCell>
                      <StyledTableCell align="left">Title</StyledTableCell>
                      <StyledTableCell align="left">Content</StyledTableCell>
                      <StyledTableCell align="left">
                        Description
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        QuestionType
                      </StyledTableCell>
                      <StyledTableCell align="left">Status</StyledTableCell>
                      <StyledTableCell align="left">
                        CreatedDate
                      </StyledTableCell>
                      <StyledTableCell align="left">Edit</StyledTableCell>
                      <StyledTableCell align="left">Delete</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {questions &&
                      questions
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((q: any) => (
                          <QuestionTableRow
                            key={q.id}
                            question={q}
                            loggedUser={loggedUser}
                            onEditQuestion={handleEditQuestion}
                            onDeleteQuestion={handleDeleteQuestion}
                          ></QuestionTableRow>
                        ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[
                          5,
                          10,
                          25,
                          { label: "All", value: -1 },
                        ]}
                        colSpan={10}
                        count={questions?.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: {
                            "aria-label": "rows per page",
                          },
                          native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Paper>
            <button
              className="btn btn-primary py-2 px-2"
              type="button"
              onClick={handleOpenAdd}
            >
              Add
            </button>
            <CreateNewQuestionModal
              key={currentQuestion.id} // re-render child component
              question={currentQuestion}
              open={openAdd}
              onClose={() => setOpenAdd(false)}
              onSubmit={handleCreateNewQuesion}
            ></CreateNewQuestionModal>
          </Box>
        </div>
      </div>
    );
  }

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
              <h1 className="mb-2 bread">Question Manager</h1>
              <p className="breadcrumbs">
                <span className="mr-2">
                  <a href="/">
                    Home <i className="ion-ios-arrow-forward" />
                  </a>
                </span>{" "}
                <span>
                  Questions Manager
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
            <div className="col-lg-10">
              <h2 className="mb-3">Question Manager</h2>
              {erroMsg ? (
                <div className="p-2 m-2 text-danger">{erroMsg}</div>
              ) : null}
              <div>
                {isLoading ? (
                  <p>
                    <em>Loading...</em>
                  </p>
                ) : (
                  renderQuestionList(questionList as QuestionsResponse)
                )}
              </div>
            </div>
            <div className="col-lg-2 sidebar ftco-animate"></div>
          </div>
        </div>
      </section>
    </div>
  );
  //#endregion
};

export default QuestionManager;
