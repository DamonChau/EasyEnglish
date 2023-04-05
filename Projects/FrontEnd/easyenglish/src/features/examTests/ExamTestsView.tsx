/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'
import { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useGetExamTestQuery } from './examTestsApi'
import validator from 'validator'
import draftToHtml from 'draftjs-to-html';

const ExamTestsView = () => {
    
    const { id } = useParams()
    const [isView, setView] = useState(false)
    const [convertedContent, setConvertedContent] = useState("");
    const {data, isFetching, isLoading, isSuccess, isError, error} = useGetExamTestQuery(id!, { skip: !isView })

   
    useEffect(() => {
        if (id && validator.isUUID(id)) {
            setView(true)
        }
    }, [id]);

    useEffect(() => {
        if (data) {
            setConvertedContent(draftToHtml(JSON.parse(data?.content as string)))
        }

    }, [data]);

    return (

        <div>
            <section className="hero-wrap hero-wrap-2" style={{ backgroundImage: 'url("images/bg_1.jpg")'  }} data-stellar-background-ratio="0.5">
                <div className="overlay" />
                <div className="container">
                    <div className="row no-gutters slider-text align-items-center justify-content-center">
                        <div className="col-md-9 text-center">
                            <h1 className="mb-2 bread">Exam Test</h1>
                            <p className="breadcrumbs"><span className="mr-2"><a href="/">Home <i className="ion-ios-arrow-forward" /></a></span> <span>{data?.testname}<i className="ion-ios-arrow-forward" /></span></p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="ftco-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10">
                            <h2 className="mb-3">{data?.title}</h2>
                            
                            <div dangerouslySetInnerHTML={{ __html:convertedContent }}>
                            </div>
                        </div>
                        <div className="col-lg-2 sidebar ftco-animate">
                            
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );

}

export default ExamTestsView;