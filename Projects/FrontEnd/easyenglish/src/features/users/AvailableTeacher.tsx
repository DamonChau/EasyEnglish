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
import Chip from "@mui/material/Chip";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import { visuallyHidden } from "@mui/utils";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useTypedSelector } from "../../services";
import { selectLoggedUser } from "../../services/slices/authSlice";
import {
  Users,
  UserType,
  Status,
  RelationShipType,
  UserRelationship,
} from "../../interfaces/interfaces";
import { UsersResponse, useGetAllTeachersQuery, usersApi } from "./usersApi";
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from "../../services/helpers";
import { Order, getComparator, stableSort } from "../../helpers/muiTable";
import { ConfirmationModal } from "../common/Modals";
import { useAddRelationshipMutation } from "./userRelationshipApi";
import { useDispatch } from "react-redux";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const DEFAULT_ORDER = "asc";
const DEFAULT_ORDER_BY = "userName";
const DEFAULT_ROWS_PER_PAGE = 10;

//#region AvailableTeacher
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

function EnhancedTableToolbar(props: any) {
  const { header } = props;
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
        {header}
      </Typography>
    </Toolbar>
  );
}

const AvailableTeacher = () => {
  const loggedUser = useTypedSelector(selectLoggedUser);
  const [erroMsg, setErrorMsg] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [order, setOrder] = useState<Order>(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState<keyof Users>(DEFAULT_ORDER_BY);
  const [dense, setDense] = useState(true);
  const [visibleRows, setVisibleRows] = useState<UsersResponse | null>(null);
  const [paddingHeight, setPaddingHeight] = useState(0);
  const [isView, setView] = useState(false);
  const { data, isFetching, isLoading, isSuccess, isError, error, refetch } =
    useGetAllTeachersQuery(loggedUser?.id as string);
  const [currUser, setCurrUser] = useState<Users | null>(null);
  const [openConfirmationModal, setConfirmationModal] = useState(false);
  const [addNewRelationship] = useAddRelationshipMutation();
  const dispatch = useDispatch();
  const queryStarted = isSuccess || isFetching;

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

  const addTeacher = (user: Users) => {
    setCurrUser(user);
    setConfirmationModal(true);
  };

  const handleRefreshData = () => {
    console.log("queryStarted", isSuccess, isFetching);
    if (queryStarted) {
      refetch();
    }
  };

  const saveRelationship = async () => {
    try {
      const rel: Partial<UserRelationship> = {
        userId: loggedUser?.id,
        relatedUserId: currUser?.id,
        relationShipType: RelationShipType.LeanerTeacher,
        status: Status.Active,
      };
      await addNewRelationship(rel).unwrap();
      //dispatch(usersApi.util.invalidateTags([{ type: 'users', id: "LIST" }]));
      handleRefreshData();
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

  return (
    <React.Fragment>
      {erroMsg ? <div className="p-2 m-2 text-danger">{erroMsg}</div> : null}
      {isView ? (
        <Box sx={{ width: "100%", p: 3 }}>
          <Paper sx={{ width: "100%", mb: 2, p: 2 }}>
            <EnhancedTableToolbar header="Available Teacher" />
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
                                  onClick={() => addTeacher(row)}
                                >
                                  <PersonAddAltIcon />
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
      <ConfirmationModal
        headerText="Add New Teacher"
        confirmationText={`Are you sure to add ${currUser?.aliasName} as your teacher ?`}
        onSubmit={saveRelationship}
        open={openConfirmationModal}
        onClose={() => setConfirmationModal(false)}
      ></ConfirmationModal>
    </React.Fragment>
  );
};
//#endregion

export default AvailableTeacher;
