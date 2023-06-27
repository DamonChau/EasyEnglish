/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  useAddUserMutation,
  useUpdateUserProfileMutation,
  useLoginMutation,
  useIsUserNameExistsQuery,
  usersApi,
  useGetUserQuery,
} from "../users/usersApi";
import { useAppDispatch } from "../../services/index";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { LoginType, Users } from "../../models/types";
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from "../../services/helpers";
import { config } from "../../helpers/contants";
import { Alert } from "../common/Modals";
import Snackbar from "@mui/material/Snackbar";
import requestsApi from "../../helpers/request";
import isUUID from "validator/lib/isUUID";
import {
  selectLoggedUser,
  setLoggedUser,
  setLoggedSession
} from "../../services/slices/authSlice";
import { useTypedSelector } from "../../services";

const NewUserAccount = () => {
  const { id } = useParams();
  const [addUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserProfileMutation();
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const initialAccountValue = {
    username: "",
    email: "",
    phoneno: "",
    password: "",
    retypePassword: "",
    address: "",
    billingAddress: "",
    aliasName: "",
  };
  const loggedUser = useTypedSelector(selectLoggedUser);
  const { data, isFetching, isLoading, isSuccess, isError, error } =
    useGetUserQuery(id as string, { skip: !isEditing });

  useEffect(() => {
    if (id && isUUID(id)) {
      setIsEditing(true);
    }
  }, [id]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    if (reason === "timeout") {
      navigate(config.url.API_URL_FOLDER + "/");
    }
    setOpen(false);
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    navigate(config.url.API_URL_FOLDER + "/examTestsManager");
  };

  const saveAccount = async (user: Partial<Users>) => {
    try {
      //default value
      if (user.aliasName == "") user.aliasName = user.userName;
      let response = {};
      if (isEditing) {
        user.id = id;
        response = await updateUser(user).unwrap();
        dispatch(setLoggedUser(response));
      } else {
        user.loginType = LoginType.SYSTEM;
        await addUser(user).unwrap();
        response = await login(user).unwrap();
        dispatch(setLoggedSession(response));
      }
      
      setOpen(true);
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

  // direct api call without hooks
  const checkUserNameExists = (username: string): Promise<boolean> => {
    const endpoint = `api/Users/IsUserNameExists/${username}`;
    const options = {
      url: endpoint,
      method: "GET",
    };
    return requestsApi(options, "", "").then((response: any) => {
      return response;
    });
  };

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .required("Required")
      .test(
        "useIsUserNameExistsQuery",
        "User name exists",
        async function (value) {
          // we can use axio for api call
          //const exists = await checkUserNameExists(value);
          // OR rtk query without hooks like below
          const result = dispatch(
            usersApi.endpoints.isUserNameExists.initiate(value)
          );
          try {
            const data = await result.unwrap();
            return !(data as boolean);
          } catch (error) {
            return false;
          } finally {
            result.unsubscribe();
          }
        }
      ),
    password: Yup.string()
      .required("Please enter your password.")
      .min(6, "Your password is too short."),
    retypePassword: Yup.string()
      .required("Please retype your password.")
      .oneOf([Yup.ref("password")], "Your passwords do not match."),
    email: Yup.string().email("Invalid email").required("Required"),
    aliasName: Yup.string().required("Required"),
  });

  const EditFormSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    aliasName: Yup.string().required("Required"),
  });

  const EditFormSchemaWithPassword = Yup.object().shape({
    password: Yup.string()
      .concat(Yup.string())
      .min(6, "Your password is too short."),
    retypePassword: Yup.string()
      .when("password", {
        is: (password: any, schema: any) => password || !isEditing,
        then: (schema) => schema.required("Confirm Password is required"),
        otherwise: (schema) => schema,
      })
      .oneOf([Yup.ref("password")], "Your passwords do not match."),
    email: Yup.string().email("Invalid email").required("Required"),
    aliasName: Yup.string().required("Required"),
  });

  const newAccountForm = () => {
    return (
      <React.Fragment>
        <div className="form-group row">
          <label htmlFor="username" className="col-sm-4 col-form-label">
            User Name (*)
          </label>
          <div className="col-sm-8">
            <Field name="username" className="form-control" />
            <ErrorMessage name="username" component="div" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="email" className="col-sm-4 col-form-label">
            Email (*)
          </label>
          <div className="col-sm-8">
            <Field name="email" type="email" className="form-control" />
            <ErrorMessage name="email" component="div" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="password" className="col-sm-4 col-form-label">
            Password (*)
          </label>
          <div className="col-sm-8">
            <Field name="password" type="password" className="form-control" />
            <ErrorMessage name="password" component="div" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="retypePassword" className="col-sm-4 col-form-label">
            Retype Password (*)
          </label>
          <div className="col-sm-8">
            <Field
              name="retypePassword"
              type="password"
              className="form-control"
            />
            <ErrorMessage name="retypePassword" component="div" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="aliasName" className="col-sm-4 col-form-label">
            Alias Name (*)
          </label>
          <div className="col-sm-8">
            <Field name="aliasName" className="form-control" />
            <ErrorMessage name="aliasName" component="div" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="phoneno" className="col-sm-4 col-form-label">
            Phone No
          </label>
          <div className="col-sm-8">
            <Field name="phoneno" className="form-control" />
            <ErrorMessage name="phoneno" component="div" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="address" className="col-sm-4 col-form-label">
            Address
          </label>
          <div className="col-sm-8">
            <Field name="address" className="form-control" />
            <ErrorMessage name="address" component="div" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="billingAddress" className="col-sm-4 col-form-label">
            Billing Address
          </label>
          <div className="col-sm-8">
            <Field name="billingAddress" className="form-control" />
            <ErrorMessage name="billingAddress" component="div" />
          </div>
        </div>
      </React.Fragment>
    );
  };


  const editAccountForm = (loginType: number) => {
    return (
      <React.Fragment>
        <input type="hidden" name="id" />
        <div className="form-group row">
          <label htmlFor="username" className="col-sm-4 col-form-label">
            User Name
          </label>
          <div className="col-sm-8">
            <Field
              name="username"
              className={
                "form-control" +
                (loginType == LoginType.SYSTEM ? "" : " bg-secondary")
              }
              disabled={true}
            />
            <ErrorMessage name="username" component="div" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="email" className="col-sm-4 col-form-label">
            Email (*)
          </label>
          <div className="col-sm-8">
            <Field name="email" type="email" className="form-control" />
            <ErrorMessage name="email" component="div" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="password" className="col-sm-4 col-form-label">
            Password (*)
          </label>
          <div className="col-sm-8">
            <Field
              name="password"
              type="password"
              className={
                "form-control" +
                (loginType == LoginType.SYSTEM ? "" : " bg-secondary")
              }
              disabled={loginType == LoginType.SYSTEM ? false : true}
            />
            <ErrorMessage name="password" component="div" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="retypePassword" className="col-sm-4 col-form-label">
            Retype Password (*)
          </label>
          <div className="col-sm-8">
            <Field
              name="retypePassword"
              type="password"
              className={
                "form-control" +
                (loginType == LoginType.SYSTEM ? "" : " bg-secondary")
              }
              disabled={loginType == LoginType.SYSTEM ? false : true}
            />
            <ErrorMessage name="retypePassword" component="div" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="aliasName" className="col-sm-4 col-form-label">
            Alias Name (*)
          </label>
          <div className="col-sm-8">
            <Field name="aliasName" className="form-control" />
            <ErrorMessage name="aliasName" component="div" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="phoneno" className="col-sm-4 col-form-label">
            Phone No
          </label>
          <div className="col-sm-8">
            <Field name="phoneno" className="form-control" />
            <ErrorMessage name="phoneno" component="div" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="address" className="col-sm-4 col-form-label">
            Address
          </label>
          <div className="col-sm-8">
            <Field name="address" className="form-control" />
            <ErrorMessage name="address" component="div" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="billingAddress" className="col-sm-4 col-form-label">
            Billing Address
          </label>
          <div className="col-sm-8">
            <Field name="billingAddress" className="form-control" />
            <ErrorMessage name="billingAddress" component="div" />
          </div>
        </div>
      </React.Fragment>
    );
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
                  New User Account <i className="ion-ios-arrow-forward" />
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
            <div className="col-md-6 p-4 p-md-6 order-md-last bg-light">
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Save successfully!
                </Alert>
              </Snackbar>
              <Formik
                initialValues={initialAccountValue}
                validationSchema={
                  isEditing
                    ? loggedUser?.loginType == LoginType.SYSTEM
                      ? EditFormSchemaWithPassword
                      : EditFormSchema
                    : SignupSchema
                }
                onSubmit={(values) => {
                  saveAccount(values);
                }}
              >
                {({ errors, touched, isSubmitting, setFieldValue }) => {
                  useEffect(() => {
                    if (data) {
                      setFieldValue("username", data.userName);
                      setFieldValue("email", data.email);
                      setFieldValue("phoneno", data.phoneNo);
                      setFieldValue("address", data.address);
                      setFieldValue("billingAddress", data.billingAddress);
                      setFieldValue("aliasName", data.aliasName);
                    }
                  }, [data]);
                  return (
                    <Form>
                      {isEditing ? (
                        isLoading ? (
                          <a>Loading</a>
                        ) : (
                          editAccountForm(loggedUser?.loginType as number)
                        )
                      ) : (
                        newAccountForm()
                      )}
                      <div className="d-flex flex-row-reverse">
                        <button
                          type="submit"
                          className="btn btn-primary py-2 px-3"
                        >
                          Submit
                        </button>
                        <button
                          className="btn btn-primary py-2 px-3 mr-2"
                          type="button"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewUserAccount;
