/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
import { useEffect } from 'react';
import { config } from '../../features/helpers/contants'
import { Link, useNavigate } from 'react-router-dom';
import { useTypedSelector, useAppDispatch } from '../../features/services';
import { selectIsAuthenticated, logout } from '../../features/services/slices/authSlice'

const Header = () => {
    const isAuthenticated = useTypedSelector(selectIsAuthenticated)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const clickLogout = () => {
        dispatch(logout())
        
        navigate(config.url.API_URL_FOLDER + "/")
    }

    useEffect(() => {

    }, []);

    return (

        <div>
            <nav className="navbar py-4 navbar-expand-lg ftco_navbar navbar-light bg-light flex-row">
                <div className="container">
                    <div className="row no-gutters d-flex align-items-start align-items-center px-3 px-md-0">
                        <div className="col-lg-2 pr-4 align-items-center">
                            <a className="navbar-brand" href="index.html">Easy<span>English</span></a>
                        </div>
                        <div className="col-lg-10 d-none d-md-block">
                            <div className="row d-flex">
                                <div className="col-md-4 pr-4 d-flex topper align-items-center">
                                    <div className="icon bg-white mr-2 d-flex justify-content-center align-items-center"><span className="icon-map" /></div>
                                    <span className="text">Address:</span>
                                </div>
                                <div className="col-md pr-4 d-flex topper align-items-center">
                                    <div className="icon bg-white mr-2 d-flex justify-content-center align-items-center"><span className="icon-paper-plane" /></div>
                                    <span className="text">Email: ee@email.com</span>
                                </div>
                                <div className="col-md pr-4 d-flex topper align-items-center">
                                    <div className="icon bg-white mr-2 d-flex justify-content-center align-items-center"><span className="icon-phone2" /></div>
                                    <span className="text">Phone: + 1235 2355 98</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <nav className="navbar navbar-expand-lg ftco-navbar-light" id="ftco-navbar">
                <div className="container d-flex align-items-center">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="oi oi-menu" /> Menu
                    </button>
                    <p className="button-custom order-lg-last mb-0"><a href="appointment.html" className="btn btn-secondary py-2 px-3">Make An Appointment</a></p>
                    <div className="collapse navbar-collapse" id="ftco-nav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to={config.url.API_URL_FOLDER + "/"}>Home</Link>
                            </li>
                            <li className="nav-item"><Link className="nav-link" to={config.url.API_URL_FOLDER + "/teachers"}>Teachers</Link></li>
                            <li className="nav-item"><Link className="nav-link" to={config.url.API_URL_FOLDER + "/pricing"}>Pricing</Link></li>
                            <li className="nav-item"><Link className="nav-link" to={config.url.API_URL_FOLDER + "/tests"}>Tests</Link></li>
                            <li className="nav-item"><Link className="nav-link" to={config.url.API_URL_FOLDER + "/contact"}>Contact</Link></li>
                            {!isAuthenticated && <li className="nav-item"><Link className="nav-link" to={config.url.API_URL_FOLDER + "/login"}>Login</Link></li>}
                            {
                                isAuthenticated &&
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="/admin" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Admin
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li className="nav-item"><Link className="nav-link" to={config.url.API_URL_FOLDER + "/admin/examTestsManager"}>Exam Tests Manager</Link></li>
                                        <li className="nav-item"><Link className="nav-link" to={config.url.API_URL_FOLDER + "/admin/examTestsDetail/add"}>Exam Tests Detail</Link></li>
                                        <li role="separator" className="divider"></li>
                                        <li className="nav-item"><a role="button" className="nav-link" onClick={() => clickLogout()}>Logout</a></li>
                                    </ul>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );

}

export default Header;