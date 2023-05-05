﻿/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../users/usersApi";
import { useSelector } from "react-redux";
import { selectIsAuthenticated, logout } from "../../services/slices/authSlice";
import { Users } from "../../interfaces/interfaces";
import { config } from "../../helpers/contants";
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from "../../services/helpers";

const Login = () => {
  const [login, { isError, error }] = useLoginMutation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(config.url.API_URL_FOLDER + "/");
    }
  }, [isAuthenticated]);

  const postLogin = async (event: any) => {
    event.preventDefault();
    try {
      const u = {} as Users;
      u.userName = userName;
      u.password = password;
      await login(u).unwrap();
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const msg = "error" in err ? err.error : JSON.parse(JSON.stringify(err.data)).error;
        setErrMsg(msg);
      } else if (isErrorWithMessage(err)) console.log(err.message);
    }
  };

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
              <h1 className="mb-2 bread">Login</h1>
              <p className="breadcrumbs">
                <span className="mr-2">
                  <a href="/">
                    Home <i className="ion-ios-arrow-forward" />
                  </a>
                </span>{" "}
                <span>
                  Login <i className="ion-ios-arrow-forward" />
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="ftco-section ftco-no-pt ftco-no-pb contact-section">
        <div className="container">
          <div className="h-100 d-flex align-items-center justify-content-center flex-column">
          {errMsg ? (
                <div className="p-2 m-2 text-danger">{errMsg}</div>
              ) : null}
            <div className="col-md-4 p-4 p-md-4 order-md-last bg-light">
              <form onSubmit={postLogin} className="was-validated">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="User Name"
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    defaultValue="Login"
                    className="btn btn-primary py-3 px-5"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
