import * as React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuthenticated, selectLoggedUser } from '../../Redux/Slices/authSlice'

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