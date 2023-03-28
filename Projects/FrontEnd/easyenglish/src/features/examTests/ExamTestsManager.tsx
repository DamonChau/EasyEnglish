/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuthenticated, selectLoggedUser } from '../services/slices/authSlice'

const ExamTestsManager = () => {

    useEffect(() => {

    }, []);

    return (

        <div>
            ExamTests Manager
        </div>
    );

}

export default ExamTestsManager;