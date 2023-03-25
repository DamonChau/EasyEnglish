import React, { Fragment, useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { persistor, store } from '../src/Redux/Stores'
import Header from '../src/components/Common/Header'
import Footer from '../src/components/Common/Footer'
import Home from '../src/components/Common/Home'
import PrivateRoute from '../src/components/Common/PrivateRoute'
import Login from '../src/components/Common/Login'
import ExamTestsManager from '../src/components/ExamTests/ExamTestsManager'
import ExamTestsDetail from '../src/components/ExamTests/ExamTestsDetail'
import { PersistGate } from 'redux-persist/integration/react'

const App = (props) => {


    const onBeforeLift = () => {

    }

    useEffect(() => {
    }, []);

    return (

        <Provider store={store}>
            <PersistGate
                loading={null}
                onBeforeLift={onBeforeLift}
                persistor={persistor}>
                <BrowserRouter>
                    <Header />
                    <Routes >
                        <Route path='/admin' element={<PrivateRoute />}>
                            <Route path='/admin/examTestsManager' element={<ExamTestsManager />} />
                            <Route path='/admin/examTestsDetail/:id/' element={<ExamTestsDetail />} />
                            <Route path='/admin/examTestsDetail/add/' element={<ExamTestsDetail />} />
                        </Route>

                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/login" element={<Login />} />
                    </Routes >
                    <Footer />
                </BrowserRouter>
            </PersistGate>
        </Provider>

    );
}

export default App