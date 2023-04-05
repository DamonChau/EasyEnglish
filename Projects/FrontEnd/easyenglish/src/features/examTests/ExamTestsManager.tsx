/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react'
import { useEffect } from 'react'
import { selectIsAuthenticated, selectLoggedUser } from '../../services/slices/authSlice'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import Paper from '@mui/material/Paper';
import { ExamTests } from '../../interfaces/interfaces'
import { parseISO } from 'date-fns';
import TablePagination from '@mui/material/TablePagination';
import { config } from '../../helpers/contants'
import { Link, useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../services'
import { useGetExamTestsQuery, ExamTestsResponse, useDeleteExamTestMutation} from './examTestsApi'

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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const ExamTestsManager = () => {

    useEffect(() => {

    }, []);

    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const navigate = useNavigate()
    const { data, isFetching, isLoading, isSuccess, isError, error } = useGetExamTestsQuery()
    const [ deleteExamTest ]= useDeleteExamTestMutation()

    const handleEdit = (id: string ) => {
        navigate(config.url.API_URL_FOLDER + "/admin/examTestsDetail/" + id)
    };

    const handleDelete = (id: string) => {
        if (!window.confirm("Do you want to delete info with Id: " + id))
            return
        else {
            deleteExamTest(id)
        }
    }

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(+event.target.value)
        setPage(0);
    }

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
                            <StyledTableCell align="left">Description</StyledTableCell>
                            <StyledTableCell align="left">Test Type</StyledTableCell>
                            <StyledTableCell align="left">CreatedDate</StyledTableCell>
                            <StyledTableCell align="left">View</StyledTableCell>
                            <StyledTableCell align="left">Edit</StyledTableCell>
                            <StyledTableCell align="left">Delete</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {list && list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell align="left">{row.testname}</StyledTableCell>
                                    <StyledTableCell align="left">{row.title}</StyledTableCell>
                                    <StyledTableCell align="left">{row.description}</StyledTableCell>
                                    <StyledTableCell align="left">{row.testType}</StyledTableCell>
                                    <StyledTableCell align="left">{parseISO(row.createdDate).toDateString()}</StyledTableCell>
                                    <StyledTableCell align="left">
                                        <Link to={config.url.API_URL_FOLDER + "/examTestsView/" + row.id}>View</Link>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <a role="button" className="btn btn-secondary px-1 py-1" onClick={() => handleEdit(row.id)}>Edit</a>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <a role="button" className="btn btn-secondary px-1 py-1" onClick={() => handleDelete(row.id)}>Delete</a>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={3}
                                    count={list?.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: {
                                        'aria-label': 'rows per page',
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
            <section className="hero-wrap hero-wrap-2" style={{ backgroundImage: 'url("images/bg_1.jpg")'  }} data-stellar-background-ratio="0.5">
                <div className="overlay" />
                <div className="container">
                    <div className="row no-gutters slider-text align-items-center justify-content-center">
                        <div className="col-md-9 text-center">
                            <h1 className="mb-2 bread">Exam Test Edit</h1>
                            <p className="breadcrumbs"><span className="mr-2"><a href="/">Home <i className="ion-ios-arrow-forward" /></a></span> <span>Exam Test Manager<i className="ion-ios-arrow-forward" /></span></p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="ftco-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <h2 className="mb-3">Exam Test Manager</h2>
                            <div>
                                {isLoading ? <p><em>Loading...</em></p> :renderExamTestsList(data as ExamTestsResponse)}
                            </div>
                        </div>
                        <div className="col-lg-4 sidebar ftco-animate">

                        </div>
                    </div>
                </div>
            </section>

        </div>
    );

}

export default ExamTestsManager;