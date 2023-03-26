/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { persistor, store } from './features/services'
import Header from './features/common/Header'
import Footer from './features/common/Footer'
import Home from './features/common/Home'
import PrivateRoute from './features/common/PrivateRoute'
import { PersistGate } from 'redux-persist/integration/react'

const App = (props: any) => {


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
                        
                        </Route>

                        <Route path="/" element={<Home />} />
                        
                    </Routes >
                    <Footer />
                </BrowserRouter>
            </PersistGate>
        </Provider>

    );
}

export default App