/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../users/usersApi";
import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  setLoggedSession,
} from "../../services/slices/authSlice";
import { Users } from "../../interfaces/interfaces";
import { config } from "../../helpers/contants";
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from "../../services/helpers";
import { useAppDispatch } from "../../services";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { LoginType } from "../../interfaces/interfaces";

const Login = () => {
  const [login] = useLoginMutation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
      u.loginType = LoginType.SYSTEM;
      const response = await login(u).unwrap();
      dispatch(setLoggedSession(response));
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const msg =
          "error" in err
            ? err.error
            : JSON.parse(JSON.stringify(err.data)).error;
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
            <div className="col-md-4 pt-4 order-md-last bg-light">
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
                <div className="form-group text-right">
                  <input
                    type="submit"
                    value="Login"
                    className="btn btn-primary py-2 px-3"
                  />
                </div>
              </form>
            </div>
            <div className="col-md-4 order-md-last bg-light d-flex align-items-center justify-content-center">
              <span>Not having an account?</span>
              <Link
                className="nav-link"
                to={config.url.API_URL_FOLDER + "/register"}
              >
                Sign Up
              </Link>
            </div>
            <div className="col-md-4 pt-4 pb-4 order-md-last bg-light border-top d-flex align-items-center justify-content-center">
              <div>
                <FacebookLogin
                  appId="1324441445089018"
                  className="btn btn-primary py-2 px-3"
                  children="Facebook Sign in"
                  onSuccess={(response) => {
                    //console.log("Login Success!", response);
                  }}
                  onFail={(error) => {
                    //console.log("Login Failed!", error);
                  }}
                  onProfileSuccess={async (response) => {
                    try {
                      const u = {} as Users;
                      u.userName = response.id as string;
                      u.password = response.id as string;
                      u.aliasName = response.name as string;
                      u.email = response.email as string;
                      u.loginType = LoginType.FACEBOOK;
                      const r = await login(u).unwrap();
                      dispatch(setLoggedSession(r));
                    } catch (err) {
                      if (isFetchBaseQueryError(err)) {
                        const msg =
                          "error" in err
                            ? err.error
                            : JSON.parse(JSON.stringify(err.data)).error;
                        setErrMsg(msg);
                      } else if (isErrorWithMessage(err))
                        console.log(err.message);
                    }
                  }}
                />
              </div>
              <div className="pl-4">
                <GoogleLogin
                  onSuccess={async (credentialResponse: any) => {
                    try {
                      const decoded = jwt_decode(credentialResponse.credential);
                      const u = {} as Users;
                      u.userName = (decoded as any).sub as string;
                      u.password = (decoded as any).sub as string;
                      u.aliasName = (decoded as any).name as string;
                      u.email = (decoded as any).email as string;
                      u.loginType = LoginType.GOOGLE;
                      const r = await login(u).unwrap();
                      dispatch(setLoggedSession(r));
                    } catch (err) {
                      if (isFetchBaseQueryError(err)) {
                        const msg =
                          "error" in err
                            ? err.error
                            : JSON.parse(JSON.stringify(err.data)).error;
                        setErrMsg(msg);
                      } else if (isErrorWithMessage(err))
                        console.log(err.message);
                    }
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
