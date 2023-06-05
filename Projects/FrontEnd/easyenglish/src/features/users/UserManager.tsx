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
import Chip from "@mui/material/Chip";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import { visuallyHidden } from "@mui/utils";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import {
  Users,
  UserType,
  Status,
  LoginType,
} from "../../interfaces/interfaces";
import {
  UsersResponse,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "./usersApi";
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from "../../services/helpers";
import { Order, getComparator, stableSort } from "../../helpers/muiTable";
import { EditUserStatusModal } from "../common/Modals";

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
  id: keyof Users;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "userName",
    numeric: false,
    disablePadding: true,
    label: "User Name",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "loginType",
    numeric: true,
    disablePadding: false,
    label: "Login Type",
  },
  {
    id: "userType",
    numeric: true,
    disablePadding: false,
    label: "User Type",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
];

const DEFAULT_ORDER = "asc";
const DEFAULT_ORDER_BY = "userName";
const DEFAULT_ROWS_PER_PAGE = 10;

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    newOrderBy: keyof Users
  ) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (newOrderBy: keyof Users) => (event: React.MouseEvent<unknown>) => {
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
const UserManager = () => {
  const [erroMsg, setErrorMsg] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [order, setOrder] = useState<Order>(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState<keyof Users>(DEFAULT_ORDER_BY);
  const [dense, setDense] = useState(true);
  const [visibleRows, setVisibleRows] = useState<UsersResponse | null>(null);
  const [paddingHeight, setPaddingHeight] = useState(0);
  const [isView, setView] = useState(false);
  const { data, isFetching, isLoading, isSuccess, isError, error } =
    useGetUsersQuery();
  const [currUser, setCurrUser] = useState<Users | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [updateUser] = useUpdateUserMutation();

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
      let rowsOnMount = stableSort<Users>(
        data,
        getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY)
      );
      rowsOnMount = rowsOnMount.slice(
        0 * DEFAULT_ROWS_PER_PAGE,
        0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE
      );
      setVisibleRows(rowsOnMount);
      setView(true);
    }
  }, [data]);

  const handleChangePage = React.useCallback(
    (event: unknown, newPage: number) => {
      setPage(newPage);

      if (data) {
        const sortedRows = stableSort<Users>(
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
    [order, orderBy, dense, rowsPerPage]
  );

  const handleChangeRowsPerPage = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(updatedRowsPerPage);

      setPage(0);
      if (data) {
        const sortedRows = stableSort<Users>(
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
    [order, orderBy]
  );

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const handleRequestSort = React.useCallback(
    (event: React.MouseEvent<unknown>, newOrderBy: keyof Users) => {
      const isAsc = orderBy === newOrderBy && order === "asc";
      const toggledOrder = isAsc ? "desc" : "asc";
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);

      if (data) {
        const sortedRows = stableSort<Users>(
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

  const editUSer = (user: Users) => {
    setCurrUser(user);
    setOpenEditModal(true);
  };

  const saveUser = async (user: Users) => {
    try {
      await updateUser(user).unwrap();
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

  function renderSortTable() {
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
                                  {row.userName}
                                </TableCell>
                                <TableCell align="left">{row.email}</TableCell>
                                <TableCell align="right">
                                  {LoginType[row.loginType]}
                                </TableCell>
                                <TableCell align="right">
                                  <Chip
                                    label={UserType[row.userType]}
                                    color={
                                      row.userType == UserType.Admin
                                        ? "default"
                                        : row.userType == UserType.Teacher
                                        ? "primary"
                                        : "secondary"
                                    }
                                  />
                                </TableCell>
                                <TableCell align="right">
                                  <Chip
                                    label={Status[row.status]}
                                    color={
                                      row.status == Status.Active
                                        ? "success"
                                        : "error"
                                    }
                                  />
                                </TableCell>
                                <StyledTableCell
                                  align="left"
                                  placeholder="Edit Status"
                                >
                                  <IconButton
                                    aria-label="Edit"
                                    placeholder="Edit"
                                    size="small"
                                    onClick={() => editUSer(row)}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                </StyledTableCell>
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
                        <TableCell colSpan={5} />
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
        ) : (
          <p>
            <em>Loading...</em>
          </p>
        )}
        <EditUserStatusModal
          user={currUser}
          onSubmit={saveUser}
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
        ></EditUserStatusModal>
      </React.Fragment>
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
              <h1 className="mb-2 bread">User Manager</h1>
              <p className="breadcrumbs">
                <span className="mr-2">
                  <a href="/">
                    Home <i className="ion-ios-arrow-forward" />
                  </a>
                </span>{" "}
                <span>
                  User Manager
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
              {erroMsg ? (
                <div className="p-2 m-2 text-danger">{erroMsg}</div>
              ) : null}
              <div>{renderSortTable()}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserManager;
