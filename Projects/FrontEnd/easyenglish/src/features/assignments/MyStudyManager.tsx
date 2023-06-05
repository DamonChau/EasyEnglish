/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from "react";
import { config } from "../../helpers/contants";
import { useNavigate } from "react-router-dom";
import { selectLoggedUser } from "../../services/slices/authSlice";
import { useTypedSelector } from "../../services";
import {
  AssignmentExamsDetailResponse,
  useGetAllByStatusWithDetailQuery,
} from "../assignments/assignmentExamsApi";
import { styled } from "@mui/material/styles";
import { parseISO } from "date-fns";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import TableSortLabel from "@mui/material/TableSortLabel";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Box from "@mui/material/Box";
import { visuallyHidden } from "@mui/utils";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Order, getComparator, stableSort } from "../../helpers/muiTable";
import {
  ExamTestSectionType,
  ExamTestType,
  ExamTests,
  AssignmentStatus,
} from "../../interfaces/interfaces";
import { ViewExamScoreModal } from "../../features/common/Modals";

//#region sort table
interface ExamTestsDisplay
  extends Omit<ExamTests, "audioFile" | "audioFileUpload"> {}

function convertToExamTestsDisplay(
  data: AssignmentExamsDetailResponse
): ExamTestsDisplay[] {
  const convertedData: ExamTestsDisplay[] = [];

  for (const assignmentDetail of data) {
    const { examTest, ...rest } = assignmentDetail;
    const convertedTest: ExamTestsDisplay = { ...examTest };
    convertedData.push(convertedTest);
  }
  return convertedData;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

interface HeadCell {
  disablePadding: boolean;
  id: keyof ExamTestsDisplay;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "testname",
    numeric: false,
    disablePadding: true,
    label: "Test Name",
  },
  {
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "Title",
  },
  {
    id: "sectionType",
    numeric: true,
    disablePadding: false,
    label: "Section Type",
  },
  {
    id: "testType",
    numeric: true,
    disablePadding: false,
    label: "Test Type",
  },
  {
    id: "createdDate",
    numeric: false,
    disablePadding: false,
    label: "Created Date",
  },
];

const DEFAULT_ORDER = "asc";
const DEFAULT_ORDER_BY = "testname";
const DEFAULT_ROWS_PER_PAGE = 10;

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    newOrderBy: keyof ExamTestsDisplay
  ) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (newOrderBy: keyof ExamTestsDisplay) =>
    (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, newOrderBy);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar() {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Exam Tests
      </Typography>
    </Toolbar>
  );
}

//#endregion

const ExamTestList = ({ status }: any) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [order, setOrder] = useState<Order>(DEFAULT_ORDER);
  const [orderBy, setOrderBy] =
    React.useState<keyof ExamTestsDisplay>(DEFAULT_ORDER_BY);
  const [dense, setDense] = useState(true);
  const [visibleRows, setVisibleRows] = useState<ExamTestsDisplay[] | null>(
    null
  );
  const [dataRows, setDataRows] = useState<ExamTestsDisplay[] | null>(null);
  const [currRow, setCurrRow] = useState<ExamTestsDisplay | null>(null);
  const [paddingHeight, setPaddingHeight] = useState(0);
  const loggedUser = useTypedSelector(selectLoggedUser);
  const navigate = useNavigate();
  const [isView, setView] = useState(false);
  const [openViewScore, setOpenViewScore] = useState(false);
  const { data, isFetching, isLoading, isSuccess, isError, error } =
    useGetAllByStatusWithDetailQuery({
      userId: loggedUser?.id,
      status,
    });

  useEffect(() => {
    if (data) {
      setDataRows(convertToExamTestsDisplay(data));
      setView(false);
    }
  }, [data]);

  useEffect(() => {
    if (dataRows) {
      let rowsOnMount = stableSort<ExamTestsDisplay>(
        dataRows,
        getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY)
      );
      rowsOnMount = rowsOnMount.slice(
        0 * DEFAULT_ROWS_PER_PAGE,
        0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE
      );
      setVisibleRows(rowsOnMount);
      setView(true);
    }
  }, [dataRows]);

  const handleChangePage = React.useCallback(
    (event: unknown, newPage: number) => {
      setPage(newPage);

      if (dataRows) {
        const sortedRows = stableSort<ExamTestsDisplay>(
          dataRows,
          getComparator(order, orderBy)
        );
        const updatedRows = sortedRows.slice(
          newPage * rowsPerPage,
          newPage * rowsPerPage + rowsPerPage
        );
        setVisibleRows(updatedRows);

        // Avoid a layout jump when reaching the last page with empty rows.
        const numEmptyRows =
          newPage > 0
            ? Math.max(0, (1 + newPage) * rowsPerPage - dataRows.length)
            : 0;

        const newPaddingHeight = (dense ? 33 : 53) * numEmptyRows;
        setPaddingHeight(newPaddingHeight);
      }
    },
    [order, orderBy, dense, rowsPerPage]
  );

  const handleChangeRowsPerPage = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(updatedRowsPerPage);

      setPage(0);
      if (dataRows) {
        const sortedRows = stableSort<ExamTestsDisplay>(
          dataRows,
          getComparator(order, orderBy)
        );
        const updatedRows = sortedRows.slice(
          0 * updatedRowsPerPage,
          0 * updatedRowsPerPage + updatedRowsPerPage
        );
        setVisibleRows(updatedRows);

        // There is no layout jump to handle on the first page.
        setPaddingHeight(0);
      }
    },
    [order, orderBy]
  );

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const handleRequestSort = React.useCallback(
    (event: React.MouseEvent<unknown>, newOrderBy: keyof ExamTestsDisplay) => {
      const isAsc = orderBy === newOrderBy && order === "asc";
      const toggledOrder = isAsc ? "desc" : "asc";
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);

      if (dataRows) {
        const sortedRows = stableSort<ExamTestsDisplay>(
          dataRows,
          getComparator(toggledOrder, newOrderBy)
        );
        const updatedRows = sortedRows.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        );
        setVisibleRows(updatedRows);
      }
    },
    [order, orderBy, page, rowsPerPage]
  );

  const showScore = (examTest: ExamTestsDisplay) => {
    setCurrRow(examTest);
    setOpenViewScore(true);
  };

  return (
    <React.Fragment>
      {isView ? (
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2, p: 2 }}>
            <EnhancedTableToolbar />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {visibleRows
                    ? visibleRows.map((row, index) => {
                        return (
                          <React.Fragment key={row.id}>
                            <TableRow>
                              <TableCell
                                component="th"
                                scope="row"
                                padding="none"
                                align="left"
                              >
                                {row.testname}
                              </TableCell>
                              <TableCell align="left">{row.title}</TableCell>
                              <TableCell align="right">
                                {ExamTestSectionType[row.sectionType]}
                              </TableCell>
                              <TableCell align="right">
                                {ExamTestType[row.testType]}
                              </TableCell>
                              <TableCell align="left">
                                {parseISO(row.createdDate).toDateString()}
                              </TableCell>
                              <StyledTableCell
                                align="left"
                                placeholder="Start Test"
                              >
                                <IconButton
                                  aria-label="Start"
                                  placeholder="Start Test"
                                  size="small"
                                  onClick={() => {
                                    navigate(
                                      config.url.API_URL_FOLDER +
                                        "/examTestsView/" +
                                        row.id
                                    );
                                  }}
                                >
                                  <PlayArrowIcon />
                                </IconButton>
                              </StyledTableCell>
                              {status == AssignmentStatus.Done ? (
                                <StyledTableCell
                                  align="left"
                                  placeholder="View Score"
                                >
                                  <IconButton
                                    aria-label="View Score"
                                    placeholder="View Score"
                                    size="small"
                                    onClick={() => showScore(row)}
                                  >
                                    <AssessmentIcon />
                                  </IconButton>
                                </StyledTableCell>
                              ) : null}
                            </TableRow>
                          </React.Fragment>
                        );
                      })
                    : null}
                  {paddingHeight > 0 && (
                    <TableRow
                      style={{
                        height: paddingHeight,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataRows?.length as number}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          />
        </Box>
      ) : (
        <p>
          <em>Loading...</em>
        </p>
      )}
      <ViewExamScoreModal
        examTest={currRow}
        loggedUser={loggedUser}
        open={openViewScore}
        onClose={() => setOpenViewScore(false)}
      ></ViewExamScoreModal>
    </React.Fragment>
  );
};

const MyStudyManager = () => {
  const [status, setStatus] = useState<AssignmentStatus>(
    AssignmentStatus.Favourite
  );

  return (
    <React.Fragment>
      <section
        className="hero-wrap hero-wrap-2"
        style={{ backgroundImage: 'url("images/bg_1.jpg")' }}
        data-stellar-background-ratio="0.5"
      >
        <div className="overlay" />
        <div className="container">
          <div className="row no-gutters slider-text align-items-center justify-content-center">
            <div className="col-md-9 text-center">
              <h1 className="mb-2 bread">My Study Manager</h1>
              <p className="breadcrumbs">
                <span className="mr-2">
                  <a href="/">
                    Home <i className="ion-ios-arrow-forward" />
                  </a>
                </span>
                <span className="mr-2">
                  <a href="/">
                    My Study Manager <i className="ion-ios-arrow-forward" />
                  </a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center mb-5 pb-2">
            <div className="col-md-8 text-center heading-section ftco-animate fadeInUp ftco-animated">
              <span className="subheading">Manage Your Study & Progress</span>
              <h2 className="mb-4">My Study Manager</h2>
              <p>
                Separated they live in. A small river named Duden flows by their
                place and supplies it with the necessary regelialia. It is a
                paradisematic country
              </p>
            </div>
          </div>
          <div className="ftco-departments">
            <div className="row">
              <div className="col-md-12 nav-link-wrap">
                <div
                  className="nav nav-pills d-flex justify-content-center"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <a
                    className="nav-link ftco-animate fadeInUp ftco-animated show"
                    id="v-pills-1-tab"
                    data-toggle="pill"
                    href="#v-pills-1"
                    role="tab"
                    aria-controls="v-pills-1"
                    aria-selected="false"
                    onClick={() => {
                      setStatus(AssignmentStatus.Favourite);
                    }}
                  >
                    Favourite
                  </a>
                  <a
                    className="nav-link ftco-animate fadeInUp ftco-animated show"
                    id="v-pills-2-tab"
                    data-toggle="pill"
                    href="#v-pills-2"
                    role="tab"
                    aria-controls="v-pills-2"
                    aria-selected="false"
                    onClick={() => {
                      setStatus(AssignmentStatus.Bookmarked);
                    }}
                  >
                    Bookmarked
                  </a>
                  <a
                    className="nav-link ftco-animate fadeInUp ftco-animated show"
                    id="v-pills-3-tab"
                    data-toggle="pill"
                    href="#v-pills-3"
                    role="tab"
                    aria-controls="v-pills-3"
                    aria-selected="false"
                    onClick={() => {
                      setStatus(AssignmentStatus.Assigned);
                    }}
                  >
                    Assigned
                  </a>
                  <a
                    className="nav-link ftco-animate fadeInUp ftco-animated show"
                    id="v-pills-4-tab"
                    data-toggle="pill"
                    href="#v-pills-4"
                    role="tab"
                    aria-controls="v-pills-4"
                    aria-selected="false"
                    onClick={() => {
                      setStatus(AssignmentStatus.Done);
                    }}
                  >
                    Done
                  </a>
                </div>
              </div>
              <div className="col-md-12 tab-wrap">
                <div
                  className="tab-content bg-light p-4 p-md-5 ftco-animate fadeInUp ftco-animated"
                  id="v-pills-tabContent"
                >
                  <ExamTestList status={status} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default MyStudyManager;
