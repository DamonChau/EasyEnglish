/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../../helpers/contants";
import { useTypedSelector } from "../../services";
import {
  useGetExamTestQuery,
  useAddExamTestMutation,
  useUpdateExamTestMutation,
} from "./examTestsApi";
import { useUploadFilesMutation } from "../users/userAnswersApi";
import { selectLoggedUser } from "../../services/slices/authSlice";
import {
  ExamTests,
  Status,
  ExamTestType,
  ExamTestSectionType,
} from "../../interfaces/interfaces";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  ContentState,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import isUUID from "validator/lib/isUUID";
import Snackbar from "@mui/material/Snackbar";
import { v4 as uuidv4 } from "uuid";
import { Alert } from "../common/Modals";
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from "../../services/helpers";

const ExamTestsDetail = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  //causing waring - no update yet
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const loggedUser = useTypedSelector(selectLoggedUser);
  const initialValue = {
    id: id,
    testName: "",
    title: "",
    content: "",
    description: "",
    testType: 1,
    sectionType: 1,
    status: 1,
    createdBy: loggedUser!.id,
  };
  const [examTest, setexamTest] = useState<Partial<ExamTests>>(initialValue);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [erroMsg, setErrorMsg] = useState("");

  //only load when isEditing=true
  const { data, isFetching, isLoading, isSuccess, isError, error } =
    useGetExamTestQuery(id!, { skip: !isEditing });
  const [updateExamTest] = useUpdateExamTestMutation();
  const [addExamTest] = useAddExamTestMutation();
  const [uploadFile] = useUploadFilesMutation();

  //#region UseEffect
  //check id is valid to enable editing mode
  useEffect(() => {
    if (id && isUUID(id)) {
      setIsEditing(true);
    }
  }, [id]);

  //set data from rtk query to examTest and editor
  useEffect(() => {
    if (data) {
      setexamTest(data as ExamTests);
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(data.content!)))
      );
    }
  }, [data]);

  //update examTests content with editor json raw value
  useEffect(() => {
    const rawstring = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );

    //save content to examTest
    setexamTest((prev) => ({
      ...prev,
      content: rawstring,
    }));
  }, [editorState]);

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
  //#endregion

  //#region Event
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    navigate(config.url.API_URL_FOLDER + "/examTestsManager");
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      //upload file
      if (examTest.audioFileUpload && examTest.audioFileUpload != undefined) {
        const newFile = new FormData();
        const fileExt = examTest.audioFile!.split(".").pop();
        const fileName = uuidv4() + "." + fileExt;
        if (examTest.audioFileUpload) {
          newFile.append("file", examTest.audioFileUpload, fileName);
        }
        examTest.audioFile = fileName;
        await uploadFile(newFile).unwrap();
      }

      isEditing
        ? await updateExamTest(examTest).unwrap()
        : await addExamTest(examTest).unwrap();

      setOpen(true); //open notification
      setIsEditing(false); //turn to add mode
      setexamTest(initialValue); //reset value
      clearFields(e); // clear input box
    } catch (err) {
      setOpen(false);
      if (isFetchBaseQueryError(err)) {
        const msg =
          "error" in err
            ? err.error
            : JSON.parse(JSON.stringify(err.data)).error;
        setErrorMsg(msg);
      } else if (isErrorWithMessage(err)) console.log(err.message);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    if (
      e.target.name == "audioFileUpload" &&
      e.target instanceof HTMLInputElement &&
      e.target.files &&
      e.target.files[0]
    ) {
      const file = e.target.files[0];
      setexamTest((prev) => ({
        ...prev,
        [e.target.name]: file,
        audioFile: file.name,
      }));
    } else {
      setexamTest((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  function clearFields(e: any) {
    setEditorState(
      EditorState.createWithContent(ContentState.createFromText(""))
    );
    Array.from(e.target).forEach((e: any) => (e.value = ""));
  }
  //#endregion

  //#region uploadImage Handler
  const getFileBase64 = (file: File, callback: (data: string) => void) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // Since FileReader is asynchronous,
    // we need to pass data back.
    reader.onload = () => callback(reader.result as string);
    // TODO: catch an error
    reader.onerror = (error) => {};
  };

  const imageUploadCallback = (file: File) =>
    new Promise((resolve, reject) =>
      getFileBase64(file, (data: string) => resolve({ data: { link: data } }))
    );
  const embedVideoCallBack = (link: any) => {
    if (link.indexOf("youtu.be") >= 0) {
      link = link.replace("watch?v=", "embed/");
      link = link.replace("/watch/", "/embed/");
      link = link.replace("youtu.be/", "youtube.com/embed/");
    }
    return link;
  };
  //#endregion

  //#region form render
  const renderEditForm = () => {
    return (
      <form onSubmit={handleSave} className="was-validated">
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
        
        <div className="form-group">
          <label htmlFor="testType">Test Type</label>
          <select
            className="form-control"
            name="testType"
            value={examTest.testType}
            onChange={handleChange}
          >
            {ExamTestType &&
              ExamTestType.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="sectionType">Test Type</label>
          <select
            className="form-control"
            name="sectionType"
            value={examTest.sectionType}
            onChange={handleChange}
          >
            {ExamTestSectionType &&
              ExamTestSectionType.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <div className="form-group">
            <label htmlFor="testName">Test name</label>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="testName"
                defaultValue={examTest.testname}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="title"
                defaultValue={examTest.title}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="description"
                defaultValue={examTest.description}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="form-group">
            <label htmlFor="UploadFile">UploadFile : </label>
            {examTest.audioFile ? <span>{examTest.audioFile}</span> : null}
            <div className="form-group">
              <input
                className="form-control"
                type="file"
                name="audioFileUpload"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <div className="form-group">
            <Editor
              editorState={editorState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
              onEditorStateChange={setEditorState}
              toolbar={{
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
                embedded: {
                  embedCallback: embedVideoCallBack,
                },
                image: {
                  uploadCallback: imageUploadCallback,
                  alt: { present: false, mandatory: false },
                  previewImage: true,
                  inputAccept:
                    "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                },
              }}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="testType">Status</label>
          <select
            className="form-control"
            name="status"
            value={examTest.status}
            onChange={handleChange}
          >
            {Status &&
              Status.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
          </select>
        </div>
        <button className="btn btn-primary py-2 px-3 py-3 mr-2" type="submit">
          Save
        </button>
        <button
          className="btn btn-primary py-2 px-3 py-3"
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
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
              <h1 className="mb-2 bread">Exam Test Edit</h1>
              <p className="breadcrumbs">
                <span className="mr-2">
                  <a href="/">
                    Home <i className="ion-ios-arrow-forward" />
                  </a>
                </span>{" "}
                <span>
                  Exam Test Edit <i className="ion-ios-arrow-forward" />
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="ftco-section">
        <div className="container">
          <div className="row">
            {erroMsg ? (
              <div className="p-2 m-2 text-danger">{erroMsg}</div>
            ) : null}
            <div className="col-lg-8">
              <h2 className="mb-3">Exam Test Edit Form</h2>
              <div>
                {isLoading ? (
                  <p>
                    <em>Loading...</em>
                  </p>
                ) : (
                  renderEditForm()
                )}
              </div>
            </div>
            <div className="col-lg-4 sidebar ftco-animate"></div>
          </div>
        </div>
      </section>
    </div>
  );
  //#endregion
};

export default ExamTestsDetail;
