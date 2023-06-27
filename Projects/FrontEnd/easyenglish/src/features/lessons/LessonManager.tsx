/* eslint-disable @typescript-eslint/no-empty-interface */
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
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import Checkbox from "@mui/material/Checkbox";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import { visuallyHidden } from "@mui/utils";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Lessons, LessonType } from "../../models/types";
import { parseISO } from "date-fns";
import { config } from "../../helpers/contants";
import { useNavigate } from "react-router-dom";
import { useGetAllLessonsQuery, useDeleteLessonMutation } from "./lessonApi";
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from "../../services/helpers";
import { Order, getComparator, stableSort } from "../../helpers/muiTable";

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

//#region sort table

interface HeadCell {
  disablePadding: boolean;
  id: keyof Lessons;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "lessonName",
    numeric: false,
    disablePadding: true,
    label: "Lesson Name",
  },
  {
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "Title",
  },
  {
    id: "lessonType",
    numeric: true,
    disablePadding: false,
    label: "Lesson Type",
  },
  {
    id: "hashTag",
    numeric: false,
    disablePadding: false,
    label: "HashTag",
  },
  {
    id: "createdDate",
    numeric: false,
    disablePadding: false,
    label: "Created Date",
  },
];

const DEFAULT_ORDER = "asc";
const DEFAULT_ORDER_BY = "lessonName";
const DEFAULT_ROWS_PER_PAGE = 10;

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    newOrderBy: keyof Lessons
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (newOrderBy: keyof Lessons) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, newOrderBy);
    };
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all lessons",
            }}
          />
        </TableCell>
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

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Exam Tests
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

//#endregion

const LessonManager = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
  const [order, setOrder] = React.useState<Order>(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState<keyof Lessons>(DEFAULT_ORDER_BY);
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [dense, setDense] = React.useState(true);
  const [visibleRows, setVisibleRows] = React.useState<Lessons[] | null>(null);
  const [paddingHeight, setPaddingHeight] = React.useState(0);

  const navigate = useNavigate();
  const { data, isFetching, isLoading, isSuccess, isError, error } =
    useGetAllLessonsQuery();
  const [deleteLesson] = useDeleteLessonMutation();
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

  useEffect(() => {
    if (data) {
      let rowsOnMount = stableSort<Lessons>(
        data,
        getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY)
      );
      rowsOnMount = rowsOnMount.slice(
        0 * DEFAULT_ROWS_PER_PAGE,
        0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE
      );
      setVisibleRows(rowsOnMount);
    }
  }, [data]);

  const handleEdit = (id: string) => {
    navigate(config.url.API_URL_FOLDER + "/lessonDetail/" + id);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Do you want to delete info with Id: " + id)) return;
    else {
      try {
        await deleteLesson(id).unwrap();
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

  const handleChangePage = React.useCallback(
    (event: unknown, newPage: number) => {
      setPage(newPage);

      if (data) {
        const sortedRows = stableSort<Lessons>(
          data,
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
            ? Math.max(0, (1 + newPage) * rowsPerPage - data.length)
            : 0;

        const newPaddingHeight = (dense ? 33 : 53) * numEmptyRows;
        setPaddingHeight(newPaddingHeight);
      }
    },
    [order, orderBy, dense, rowsPerPage, isLoading]
  );

  const handleChangeRowsPerPage = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(updatedRowsPerPage);
      setPage(0);
      if (data) {
        const sortedRows = stableSort<Lessons>(
          data,
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
    [order, orderBy, isLoading]
  );

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const handleRequestSort = React.useCallback(
    (event: React.MouseEvent<unknown>, newOrderBy: keyof Lessons) => {
      const isAsc = orderBy === newOrderBy && order === "asc";
      const toggledOrder = isAsc ? "desc" : "asc";
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);

      if (data) {
        const sortedRows = stableSort<Lessons>(
          data,
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

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      if (data) {
        const newSelected = data.map((n) => n.id);
        setSelected(newSelected);
        return;
      }
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  function renderListwithSort() {
    return (
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={data?.length as number}
              />
              <TableBody>
                {visibleRows
                  ? visibleRows.map((row, index) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                          selected={isItemSelected}
                          sx={{ cursor: "pointer" }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            align="left"
                          >
                            {row.lessonName}
                          </TableCell>
                          <TableCell align="left">{row.title}</TableCell>
                          <TableCell align="right">
                            {LessonType[row.lessonType]}
                          </TableCell>
                          <TableCell align="left">{row.hashTag}</TableCell>
                          <TableCell align="left">
                            {parseISO(row.createdDate).toDateString()}
                          </TableCell>
                          <StyledTableCell align="left">
                            <IconButton
                              aria-label="View"
                              placeholder="View Test"
                              size="small"
                              onClick={() => {
                                navigate(
                                  config.url.API_URL_FOLDER +
                                    "/lessonView/" +
                                    row.id
                                );
                              }}
                            >
                              <PreviewIcon />
                            </IconButton>
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            <IconButton
                              aria-label="Edit"
                              size="small"
                              placeholder="Edit Lesson"
                              onClick={() => handleEdit(row.id)}
                            >
                              <EditIcon />
                            </IconButton>
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <IconButton
                              aria-label="Delete"
                              size="small"
                              placeholder="Delete Test"
                              onClick={() => handleDelete(row.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </StyledTableCell>
                        </TableRow>
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
            count={data?.length as number}
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
              <h1 className="mb-2 bread">Lesson Manager</h1>
              <p className="breadcrumbs">
                <span className="mr-2">
                  <a href="/">
                    Home <i className="ion-ios-arrow-forward" />
                  </a>
                </span>{" "}
                <span>
                  Lesson Manager
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
              <h2 className="mb-3">Lesson Manager</h2>
              {erroMsg ? (
                <div className="p-2 m-2 text-danger">{erroMsg}</div>
              ) : null}
              <div>
                {isLoading ? (
                  <p>
                    <em>Loading...</em>
                  </p>
                ) : (
                  renderListwithSort()
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LessonManager;
