import * as React from 'react'
import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { config } from '../../Helpers/contants'
import { useTypedSelector } from '../../Redux/Stores'
import { useGetExamTestQuery, useAddExamTestMutation, useUpdateExamTestMutation } from '../../Redux/Services/examTests'
import { selectLoggedUser } from '../../Redux/Slices/authSlice'
import { ExamTests } from '../../Redux/Interfaces/interfaces'
import { Editor } from "react-draft-wysiwyg"
import { EditorState, ContentState, convertFromHTML, convertFromRaw, convertToRaw } from 'draft-js'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { convertToHTML } from 'draft-convert'
import validator from 'validator'
import '../../../src/App.css'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const ExamTestsDetail = () => {

    const { id } = useParams()


    const [isEditing, setIsEditing] = useState(false)


    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );


    const loggedUser = useTypedSelector(selectLoggedUser)
    const initialValue = { testName: '', title: '', content: '', description: '', testType: 1, status: 1, createdBy: loggedUser!.id }
    const [examTest, setexamTest] = useState<Partial<ExamTests>>(initialValue)

    const [data, isFetching, isLoading, isSuccess, isError, error] = [null, false, false, false, false, '']

    const [updateExamTest, { isLoading: isUpdateLoading, isError: isUpdateError, error: errorUpdate }] = useUpdateExamTestMutation()
    const [addExamTest, { isLoading: isAddLoading, isError: isAddError, error: errorAdd }] = useAddExamTestMutation()

    const navigate = useNavigate();

    const [open, setOpen] = useState(false)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {

        id && validator.isUUID(id) ? setIsEditing(true) : setIsEditing(false)

        if (isEditing) {
            let { data, isFetching, isLoading, isSuccess, isError, error } = useGetExamTestQuery(id!)
            setexamTest(useRef(data) as any)
        }

    }, []);

    useEffect(() => {
        let r = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        let s = convertFromRaw(JSON.parse(r))

        //save content to examTest
        //setexamTest((prev) => ({
        //    ...prev,
        //    content: html,
        //}))
        console.log("4")
    }, [])

    const handleCancel = (e: any) => {
        navigate(config.url.API_URL_FOLDER + "/admin/examTestsManager")
    }

    const handleSave = async (e: any) => {
        e.preventDefault()

        try {
            isEditing ? await updateExamTest(data as any).unwrap() : await addExamTest(examTest).unwrap()
            setOpen(true)
            setexamTest(initialValue)
            clearFields(e)
        } catch (e) {
            setOpen(false)
            console.debug(e)
        }

    }

    function clearFields(e: any) {
        Array.from(e.target).forEach((e: any) => (e.value = ""));
        setEditorState(EditorState.createWithContent(ContentState.createFromText('')))
    }

    const handleChange = (e: any) => {
        setexamTest((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

   
    const uploadImageCallBack = async (file: any) => {
          
        //return new Promise(
        //    (resolve, reject) => {
        //        const xhr = new XMLHttpRequest();
        //        xhr.open('POST', config.url.API_URL + '/api/FilesUpload/upload')
        //        xhr.setRequestHeader('Authorization', 'Client-ID ##clientid##')
        //        const data = new FormData()
        //        data.append('image', file)
        //        xhr.send(data)
        //        xhr.addEventListener('load', () => {
        //            resolve(JSON.parse(xhr.responseText))
        //        })
        //    }
        //)
    }

    const renderEditForm = () => {
        return (

            <form onSubmit={handleSave} >
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Save successfully!
                    </Alert>
                </Snackbar>
                <div className="form-group row" >
                    <input type="hidden" name="id" value={examTest.id} />
                </div>
                < div className="form-group" >
                    <label htmlFor="testType">Test Type</label>
                    <select className="form-control" name="testType" value={examTest.testType} onChange={handleChange}>
                        <option value="1">IELTS</option>
                        <option value="2">PTE</option>
                        <option value="3">GE</option>
                    </select>
                </div >
                <div className="form-group" >
                    < div className="form-group" >
                        <label htmlFor="testName">Test name</label>
                        <div className="form-group">
                            <input className="form-control" type="text" name="testName" defaultValue={examTest.testName} onChange={handleChange} />
                        </div>
                    </div >
                </div >
                <div className="form-group" >
                    < div className="form-group" >
                        <label htmlFor="title">Title</label>
                        <div className="form-group">
                            <input className="form-control" type="text" name="title" defaultValue={examTest.title} onChange={handleChange} />
                        </div>
                    </div >
                </div >
                <div className="form-group" >
                    <div className="form-group" >
                        <label htmlFor="description">Description</label>
                        <div className="form-group">
                            <input className="form-control" type="text" name="description" defaultValue={examTest.description} onChange={handleChange} />
                        </div>
                    </div >
                </div >
                < div className="form-group" >
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
                                image: { uploadCallback: uploadImageCallBack, alt: { present: false, mandatory: false }, previewImage: true, inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg', },
                            }}
                        />
                    </div>
                </div >

                <div className="form-group" >
                    <label htmlFor="testType">Status</label>
                    <select className="form-control" name="status" value={examTest.status} onChange={handleChange}>
                        <option value="1">Active</option>
                        <option value="2">Inactive</option>
                    </select>
                </div >
                <button className="btn btn-primary py-2 px-3 py-3 mr-2" type="submit">Save</button>
                <button className="btn btn-primary py-2 px-3 py-3" type="button" onClick={handleCancel}>Cancel</button>
            </form >

        )
    }

    return (

        <div>
            <section className="hero-wrap hero-wrap-2" style={{ backgroundImage: 'url("images/bg_1.jpg")' }} data-stellar-background-ratio="0.5">
                <div className="overlay" />
                <div className="container">
                    <div className="row no-gutters slider-text align-items-center justify-content-center">
                        <div className="col-md-9 text-center">
                            <h1 className="mb-2 bread">Exam Test Edit</h1>
                            <p className="breadcrumbs"><span className="mr-2"><a href="/">Home <i className="ion-ios-arrow-forward" /></a></span> <span>Exam Test Edit <i className="ion-ios-arrow-forward" /></span></p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="ftco-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <h2 className="mb-3">Exam Test Edit Form</h2>
                            <div>
                                {renderEditForm()}
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

export default ExamTestsDetail;