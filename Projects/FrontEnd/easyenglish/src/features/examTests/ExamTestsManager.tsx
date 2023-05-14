/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReviewsIcon from "@mui/icons-material/Reviews";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { ExamTestSectionType, ExamTestType } from "../../interfaces/interfaces";
import { parseISO } from "date-fns";
import { config, findArrayElementById } from "../../helpers/contants";
import { useNavigate } from "react-router-dom";
import {
  useGetExamTestsQuery,
  ExamTestsResponse,
  useDeleteExamTestMutation,
} from "./examTestsApi";
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from "../../services/helpers";

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

const ExamTestsManager = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();
  const { data, isFetching, isLoading, isSuccess, isError, error } =
    useGetExamTestsQuery();
  const [deleteExamTest] = useDeleteExamTestMutation();
  const [erroMsg, setErrorMsg] = useState("");

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

  const handleEdit = (id: string) => {
    navigate(config.url.API_URL_FOLDER + "/examTestsDetail/" + id);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Do you want to delete info with Id: " + id)) return;
    else {
      try {
        await deleteExamTest(id).unwrap();
      } catch (err) {
        if (isFetchBaseQueryError(err)) {
          const msg = "error" in err ? err.error : JSON.parse(JSON.stringify(err.data)).error;
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

  function renderExamTestsList(list: ExamTestsResponse) {
    return (
      <div>
        <div className="clearfix">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Test Name</StyledTableCell>
                  <StyledTableCell align="left">Title</StyledTableCell>
                  <StyledTableCell align="left">Section</StyledTableCell>
                  <StyledTableCell align="left">Test Type</StyledTableCell>
                  <StyledTableCell align="left">CreatedDate</StyledTableCell>
                  <StyledTableCell align="left">View</StyledTableCell>
                  <StyledTableCell align="left">Questions</StyledTableCell>
                  <StyledTableCell align="left">Edit</StyledTableCell>
                  <StyledTableCell align="left">Delete</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list &&
                  list
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <StyledTableRow key={row.id}>
                        <StyledTableCell align="left">
                          {row.testname}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.title}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {
                           ExamTestSectionType[row.sectionType]
                          }
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {
                            ExamTestType[row.testType]
                          }
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {parseISO(row.createdDate).toDateString()}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <IconButton
                            aria-label="View"
                            size="small"
                            onClick={() => {
                              navigate(
                                config.url.API_URL_FOLDER +
                                  "/examTestsView/" +
                                  row.id
                              );
                            }}
                          >
                            <ReviewsIcon />
                          </IconButton>
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <IconButton
                            aria-label="Questions"
                            size="small"
                            onClick={() => {
                              navigate(
                                config.url.API_URL_FOLDER +
                                  "/questionManager/" +
                                  row.id
                              );
                            }}
                          >
                            <QuestionAnswerIcon />
                          </IconButton>
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <IconButton
                            aria-label="Edit"
                            size="small"
                            onClick={() => handleEdit(row.id)}
                          >
                            <EditIcon />
                          </IconButton>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <IconButton
                            aria-label="Delete"
                            size="small"
                            onClick={() => handleDelete(row.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      10,
                      25,
                      50,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={9}
                    count={list?.length}
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
              <h1 className="mb-2 bread">Exam Test Edit</h1>
              <p className="breadcrumbs">
                <span className="mr-2">
                  <a href="/">
                    Home <i className="ion-ios-arrow-forward" />
                  </a>
                </span>{" "}
                <span>
                  Exam Test Manager
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
            <div className="col-lg-8">
              <h2 className="mb-3">Exam Test Manager</h2>
              {erroMsg ? (
                <div className="p-2 m-2 text-danger">{erroMsg}</div>
              ) : null}
              <div>
                {isLoading ? (
                  <p>
                    <em>Loading...</em>
                  </p>
                ) : (
                  renderExamTestsList(data as ExamTestsResponse)
                )}
              </div>
            </div>
            <div className="col-lg-4 sidebar ftco-animate"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExamTestsManager;
